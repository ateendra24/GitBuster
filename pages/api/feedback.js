import axios from 'axios'

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' })
    }

    try {
        const backendRes = await axios.post(
            `${process.env.BACKEND_URL}/api/feedback`,
            req.body,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
        return res.status(backendRes.status).json(backendRes.data)
    } catch (error) {
        console.error('Error recording feedback:', error)
        return res.status(error.response?.status || 500).json({
            message: 'Error recording feedback',
            detail: error.response?.data?.detail || error.message,
        })
    }
}

