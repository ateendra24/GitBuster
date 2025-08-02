import axios from 'axios'
import { Redis } from '@upstash/redis'

// Initialize Upstash Redis client
const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

// Tiered rate limits
const AUTHENTICATED_MAX_MESSAGES = parseInt(process.env.AUTHENTICATED_MAX_MESSAGES_PER_DAY) || 100
const UNAUTHENTICATED_MAX_MESSAGES = parseInt(process.env.UNAUTHENTICATED_MAX_MESSAGES_PER_DAY) || 30
const ONE_DAY_SECONDS = 60 * 60 * 24 // 24 hours

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' })
    }

    // Check authentication status from client-provided info
    const { isAuthenticated, userId } = req.body
    const actuallyAuthenticated = !!(isAuthenticated && userId)

    // Set rate limits based on authentication
    const maxMessages = actuallyAuthenticated ? AUTHENTICATED_MAX_MESSAGES : UNAUTHENTICATED_MAX_MESSAGES

    // Identify user - use IP-based key for all users (authenticated and unauthenticated)
    const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
        req.socket?.remoteAddress ||
        'unknown'

    const userKey = `chat-limit:${ip}`

    try {
        const current = await redis.get(userKey)
        const count = current ? parseInt(current) : 0

        if (count >= maxMessages) {
            const tierInfo = actuallyAuthenticated ? 'authenticated user' : 'unauthenticated user'
            return res.status(429).json({
                message: `Daily chat limit reached (${maxMessages} for ${tierInfo}). ${!actuallyAuthenticated ? 'Sign in for higher limits!' : ''}`,
                isAuthenticated: actuallyAuthenticated,
                maxMessages,
                currentCount: count
            })
        }

        const newCount = await redis.incr(userKey)
        if (newCount === 1) {
            await redis.expire(userKey, ONE_DAY_SECONDS)
        }

        console.log(`[RateLimit] ${actuallyAuthenticated ? 'AUTH' : 'UNAUTH'} ${userKey} => ${newCount}/${maxMessages}`)

    } catch (err) {
        console.error('[Redis Error]', err)
        // Optional: let request continue if Redis fails
    }

    try {
        const backendRes = await axios.post(
            `${process.env.BACKEND_URL}/chat`,
            req.body,
            {
                headers: {
                    Cookie: req.headers.cookie || '',
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }
        )

        // ✅ Forward `Set-Cookie` from backend to browser if present
        const setCookie = backendRes.headers['set-cookie']
        if (setCookie) {
            res.setHeader('Set-Cookie', setCookie)
        }

        return res.status(backendRes.status).json(backendRes.data)
    } catch (error) {
        console.error('Error chatting with repo:', error)
        return res.status(error.response?.status || 500).json({
            message: 'Error processing chat',
            detail: error.response?.data?.detail || error.message,
        })
    }
}
