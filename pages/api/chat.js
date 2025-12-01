import { Redis } from '@upstash/redis'

// Initialize Upstash Redis client
const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

const MAX_MESSAGES_PER_DAY = process.env.REPO_MAX_MESSAGES_PER_DAY
const ONE_DAY_SECONDS = 60 * 60 * 24 // 24 hours

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' })
    }

    // Identify user by session_id if provided, else fallback to IP
    const sessionId = req.body.session_id
    const ip =
        req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
        req.socket?.remoteAddress ||
        'unknown'

    const userKey = sessionId ? `chat-limit:${sessionId}` : `chat-limit:${ip}`

    try {
        const current = await redis.get(userKey)
        const count = current ? parseInt(current) : 0

        if (count >= MAX_MESSAGES_PER_DAY) {
            return res.status(429).json({ message: `Daily chat limit reached (${MAX_MESSAGES_PER_DAY}).` })
        }

        const newCount = await redis.incr(userKey)
        if (newCount === 1) {
            await redis.expire(userKey, ONE_DAY_SECONDS)
        }
        console.log(`[RateLimit] ${userKey} => ${newCount}/${MAX_MESSAGES_PER_DAY}`)

    } catch (err) {
        console.error('[Redis Error]', err)
        // Optional: let request continue if Redis fails
    }

    try {
        // Set up SSE headers for streaming
        res.setHeader('Content-Type', 'text/event-stream')
        res.setHeader('Cache-Control', 'no-cache')
        res.setHeader('Connection', 'keep-alive')
        res.setHeader('X-Accel-Buffering', 'no')

        const backendRes = await fetch(
            `${process.env.BACKEND_URL}/chat/stream`,
            {
                method: 'POST',
                headers: {
                    Cookie: req.headers.cookie || '',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(req.body),
            }
        )

        if (!backendRes.ok) {
            const errorData = await backendRes.json().catch(() => ({}))
            return res.status(backendRes.status).json({
                message: 'Error processing chat',
                detail: errorData.detail || 'Unknown error',
            })
        }

        // Forward Set-Cookie headers if present
        const setCookie = backendRes.headers.get('set-cookie')
        if (setCookie) {
            res.setHeader('Set-Cookie', setCookie)
        }

        // Stream the response
        const reader = backendRes.body.getReader()
        const decoder = new TextDecoder()

        while (true) {
            const { done, value } = await reader.read()
            if (done) break

            const chunk = decoder.decode(value, { stream: true })
            res.write(chunk)
            // Flush the response to ensure immediate delivery
            if (res.flush) res.flush()
        }

        res.end()
    } catch (error) {
        console.error('Error chatting with repo:', error)
        return res.status(error.response?.status || 500).json({
            message: 'Error processing chat',
            detail: error.response?.data?.detail || error.message,
        })
    }
}
