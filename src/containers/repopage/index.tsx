"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';
import { Circle } from '../../components/icons/Circle';
import RepoAnalysis from './(interface)';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { fadeInVariants } from '@/lib/animations';
import FileTree from '@/components/pages/repopage/FileTree';
import { AppSidebar } from '@/components/app-sidebar';
import Details from '@/components/pages/repopage/Details';

function Index({ username, repo }: { username: string, repo: string }) {
    const url = `https://github.com/${username}/${repo}`;
    const [loading, setLoading] = useState(true);
    const [processed, setProcessed] = useState(false);
    const [error, setError] = useState('');
    const [activeView, setActiveView] = useState<'chat' | 'folder' | 'details'>('chat');

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

    if (loading) {
        return (
            <motion.div
                key="loading"
                variants={fadeInVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex flex-col items-center justify-center h-full space-y-4"
            >
                <Circle className="animate-spin" />
                <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                    We are currently processing your Repo. Please wait...
                </h2>
            </motion.div>
        );
    }

    if (processed) {
        return (
            <motion.div
                key="main"
                variants={fadeInVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="h-full w-full"
            >
                <SidebarProvider className="h-full w-full">
                    <AppSidebar setActiveView={setActiveView} activeView={activeView} username={username} repo={repo} />
                    <div className="flex-1 flex flex-col relative items-center justify-center w-full h-[100dvh] max-w-8xl mx-auto px-4 py-8">
                        <SidebarTrigger className="absolute top-16 left-1 z-20" />

                        <div className={`h-full w-full ${activeView === 'chat' ? 'block' : 'hidden'}`}>
                            <RepoAnalysis url={url} />
                        </div>
                        <div className={`h-full w-full md:p-2 ${activeView === 'folder' ? 'block' : 'hidden'} `}>
                            <FileTree URL={url} />
                        </div>
                        <div className={`h-full w-full md:p-2 ${activeView === 'details' ? 'block' : 'hidden'} `}>
                            <Details URL={url} />
                        </div>

                    </div>
                </SidebarProvider>
            </motion.div>
        );
    }

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
    );
}

export default Index;



