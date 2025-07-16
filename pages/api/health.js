import axios from 'axios';

// Simple in-memory rate limiter
const rateLimitMap = new Map();
const RATE_LIMIT = 5; // requests per minute
const WINDOW_MS = 60 * 1000; // 1 minute

function rateLimit(ip) {
    const now = Date.now();
    const windowStart = now - WINDOW_MS;

    if (!rateLimitMap.has(ip)) {
        rateLimitMap.set(ip, []);
    }

    const requests = rateLimitMap.get(ip);
    // Remove old requests outside the window
    const validRequests = requests.filter(timestamp => timestamp > windowStart);

    if (validRequests.length >= RATE_LIMIT) {
        return false; // Rate limit exceeded
    }

    // Add current request
    validRequests.push(now);
    rateLimitMap.set(ip, validRequests);

    // Clean up old entries periodically
    if (Math.random() < 0.01) { // 1% chance to cleanup
        for (const [key, timestamps] of rateLimitMap.entries()) {
            const validTimestamps = timestamps.filter(timestamp => timestamp > windowStart);
            if (validTimestamps.length === 0) {
                rateLimitMap.delete(key);
            } else {
                rateLimitMap.set(key, validTimestamps);
            }
        }
    }

    return true;
}

export default async function handler(req, res) {
    // Only allow GET requests
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    // Get client IP
    const ip = req.headers['x-forwarded-for'] ||
        req.headers['x-real-ip'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        (req.connection.socket ? req.connection.socket.remoteAddress : null) ||
        '127.0.0.1';

    // Apply rate limiting
    if (!rateLimit(ip)) {
        return res.status(429).json({
            message: 'Too many requests. Please try again later.',
            retryAfter: 60
        });
    }

    try {
        // Forward the request to the backend
        const response = await axios.get(`${process.env.BACKEND_URL}/health`);
        if (response.status === 200) return res.status(200).json(response.data);
        else return res.status(500).json({ message: 'Health check failed' });
    } catch (error) {
        console.error('Error checking health:', error);
        return res.status(error.response?.status || 500).json({
            message: 'Error checking health',
            detail: error.response?.data?.detail || error.message
        });
    }
}