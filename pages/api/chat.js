// import axios from 'axios';

// export default async function handler(req, res) {
//     // Only allow POST requests
//     if (req.method !== 'POST') {
//         return res.status(405).json({ message: 'Method not allowed' });
//     }

//     try {
//         // Forward the request to the backend
//         const response = await axios.post(`${process.env.BACKEND_URL}/chat`, req.body);
//         return res.status(200).json(response.data);
//     } catch (error) {
//         console.error('Error chatting with repo:', error);
//         return res.status(error.response?.status || 500).json({
//             message: 'Error processing chat',
//             detail: error.response?.data?.detail || error.message
//         });
//     }
// } 



import axios from 'axios'
import { Redis } from '@upstash/redis'

// Initialize Upstash Redis client
const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

const MAX_MESSAGES_PER_DAY = 20
const ONE_DAY_SECONDS = 60 * 60 * 24 // 24 hours

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' })
    }

    // Identify user (or IP fallback)
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
            return res.status(429).json({ message: 'Daily chat limit reached (20).' })
        }

        // Only increment if under the limit
        await redis.incr(userKey)
        if (count === 0) {
            await redis.expire(userKey, ONE_DAY_SECONDS)
        }
    } catch (err) {
        console.error('[Redis Error]', err)
        // Optionally allow the request to go through if Redis fails
    }

    try {
        const response = await axios.post(`${process.env.BACKEND_URL}/chat`, req.body)
        return res.status(200).json(response.data)
    } catch (error) {
        console.error('Error chatting with repo:', error)
        return res.status(error.response?.status || 500).json({
            message: 'Error processing chat',
            detail: error.response?.data?.detail || error.message,
        })
    }
}
