"use client"
import PageWrapper from '@/components/wrappers/PageWrapper'
import siteConfig from '@/config/siteConfig'
import axios from 'axios'
import { CircleAlert, CircleCheck } from 'lucide-react'
import React, { use, useEffect, useState } from 'react'

function page() {
    const [status, setStatus] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)


    const checkHealth = async () => {
        setLoading(true)
        try {
            const response = await axios.get('api/health', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            console.log("response", response);

            if (response.status) {
                setStatus(response.data.message || 'Server is running')
            } else {
                setError('Failed to fetch health status')
            }
        } catch (error) {
            setError('Server is down')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        checkHealth()
    }, [])


    return (
        <PageWrapper>
            <div className='flex flex-col gap-4 items-center justify-center'>
                <h1 className='text-2xl font-bold text-center'>Health Check for {siteConfig.siteName} Backend</h1>
                {loading && <p className='text-lg flex items-center gap-3 animate-pulse'> Checking... </p>}
                {status && <p className='text-green-500 text-lg flex items-center gap-3'><CircleCheck /> {status}</p>}
                {error && <p className='text-red-500 text-lg flex items-center gap-3'><CircleAlert /> {error}</p>}
            </div>
        </PageWrapper>
    )
}

export default page
