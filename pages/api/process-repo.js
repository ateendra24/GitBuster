import axios from 'axios'
import { Redis } from '@upstash/redis'

// Initialize Upstash Redis client
const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

const MAX_REQUESTS = 2 // Max allowed per IP per day
const WINDOW_SECONDS = 60 * 60 * 24 // 24 hours

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' })
    }

    const ip =
        req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
        req.socket?.remoteAddress ||
        'unknown'

    const key = `ratelimit:${ip}`

    try {
        const current = await redis.get(key)
        const count = current ? parseInt(current) : 0

        if (count >= MAX_REQUESTS) {
            return res.status(429).json({ message: 'You can only process 2 repos per day.' })
        }

        await redis.incr(key)
        if (count === 0) {
            await redis.expire(key, WINDOW_SECONDS)
        }
    } catch (err) {
        console.error('[Upstash Redis Error]', err)
        // Optionally allow request if Redis fails
    }

    try {
        const backendRes = await axios.post(
            `${process.env.BACKEND_URL}/process-repo`,
            req.body,
            {
                withCredentials: true,
                headers: {
                    Cookie: req.headers.cookie || '',
                },
            }
        )

        // ✅ Forward Set-Cookie from backend to browser
        const setCookie = backendRes.headers['set-cookie']
        if (setCookie) {
            res.setHeader('Set-Cookie', setCookie)
        }

        return res.status(backendRes.status).json(backendRes.data)
    } catch (error) {
        console.error('Error processing repo:', error)
        return res.status(error.response?.status || 500).json({
            message: 'Error processing repository',
            detail: error.response?.data?.detail || error.message,
        })
    }
}
