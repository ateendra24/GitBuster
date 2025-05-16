"use client"
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import ChatPageWrapper from '@/components/wrappers/ChatPageWrapper';
import { AnimatePresence, motion } from 'framer-motion';
import { fadeInVariants } from '@/lib/animations';
import { Info } from 'lucide-react';
import { Circle } from '../../../public/Circle';
import RepoAnalysis from './(interface)';

function index({ username, repo }: { username: String, repo: String }) {
    const url = `https://github.com/${username}/${repo}`
    const [loading, setLoading] = useState(true);
    const [processed, setProcessed] = useState(false)
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('/api/process-repo', { url });
                if (response.status === 200) {
                    setProcessed(true);
                }
            } catch (error: any) {
                console.error('Error processing repository:', error);
                toast.error(error?.response?.data?.message || 'Error processing repository');
                setError(error?.response?.data?.message || 'Error processing repository');

            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    if (loading) return (
        <>
            <motion.div
                key="loading"
                variants={fadeInVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex flex-col items-center justify-center h-full space-y-4"
            >
                {/* <Loader2 className='animate-spin h-12 w-12 text-blue-500' /> */}
                <Circle className={"animate-spin"} />
                <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                    We are currently processing your Repo. Please wait...
                </h2>
            </motion.div>
        </>
    )

    if (processed) return (
        <>
            <motion.div
                key="chat"
                variants={fadeInVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="h-full w-full"
            >
                <RepoAnalysis url={url} />
            </motion.div>

        </>
    )

    return (
        <motion.div
            key="error"
            variants={fadeInVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col items-center justify-center h-full space-y-4"
        >
            <Info className="h-12 w-12 text-red-500" />
            <p className="text-xl font-semibold">
                {error}
            </p>
        </motion.div>
    )
}

export default index
