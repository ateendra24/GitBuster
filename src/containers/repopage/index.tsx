"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';
import { Circle } from '../../components/icons/Circle';
import RepoAnalysis from './(interface)';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import FileTree from '@/components/pages/repopage/FileTree';
import { AppSidebar } from '@/components/app-sidebar';
import Details from '@/components/pages/repopage/Details';

const fadeInVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
};

function Index({ username, repo }: { username: string, repo: string }) {
    const url = `https://github.com/${username}/${repo}`;
    const [loading, setLoading] = useState(true);
    const [processed, setProcessed] = useState(false);
    const [error, setError] = useState('');
    const [activeView, setActiveView] = useState<'chat' | 'folder' | 'details'>('chat');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    `/api/process-repo`,
                    { url },
                    {
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
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
                <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 text-center">
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
                    <div className="flex-1 flex flex-col relative items-center justify-center w-full h-[100dvh] max-w-8xl mx-auto px-4 pb-8 pt-12">
                        <SidebarTrigger className="hidden md:flex absolute top-[70px] left-1 z-20" />
                        <SidebarTrigger className="fixed top-3 left-3 md:hidden z-50" />
                        <section id='chat' className={`h-full w-full ${activeView === 'chat' ? 'block' : 'hidden'}`}>
                            <RepoAnalysis url={url} />
                        </section>
                        <section id='filetree' className={`h-full w-full md:p-2 ${activeView === 'folder' ? 'block' : 'hidden'} `}>
                            <FileTree URL={url} />
                        </section>
                        <section id='details' className={`h-full w-full md:p-2 ${activeView === 'details' ? 'block' : 'hidden'} `}>
                            <Details URL={url} />
                        </section>

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
            <p className="text-base text-center font-semibold max-w-lg">
                {error}
            </p>
        </motion.div>
    );
}

export default Index;



