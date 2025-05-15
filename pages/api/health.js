import axios from 'axios';

export default async function handler(req, res) {
    // Only allow GET requests
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
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