"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';
import { Circle } from '../../components/icons/Circle';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import Details from '@/components/pages/repopage/Details';
import RepoPageNavbar from '@/components/layout/RepoPageNavbar';
import FolderStructure from '@/components/pages/repopage/FolderStructure';
import Chat from '@/components/pages/repopage/Chat';
import RepoVisualizer from '@/components/pages/repopage/RepoVisualizer';
import DependencyGraph from '@/components/pages/repopage/DependencyGraph';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';

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
    const [activeView, setActiveView] = useState<'Chat' | 'FolderStructure' | 'Details' | 'RepoVisualizer' | 'DependencyGraph'>('Chat');
    const [repoData, setRepoData] = useState<any>(null);
    const { isSignedIn, user, isLoaded } = useUser();

    console.log("repoData: ", repoData);


    useEffect(() => {
        // Wait for auth to be loaded before making the request
        if (!isLoaded) return;

        const fetchData = async () => {
            console.log("Authentication status:", { isSignedIn, userId: user?.id, user, isLoaded });

            // Extract GitHub access token from Clerk user object
            let githubAccessToken: string | undefined = undefined;
            if (isSignedIn && user?.externalAccounts) {
                const githubAccount = user.externalAccounts.find(
                    (acc: any) => acc.provider === 'oauth_github'
                );
                // Try to get the token from publicMetadata or unsafeMetadata
                githubAccessToken = githubAccount?.publicMetadata?.accessToken || (githubAccount && (githubAccount as any).unsafeMetadata?.accessToken);
                if (!githubAccessToken) {
                    // For debugging: log the external account object
                    console.warn('No GitHub access token found in externalAccounts:', githubAccount);
                }
            }

            try {
                const response = await axios.post(
                    `/api/process-repo`,
                    {
                        url,
                        isAuthenticated: isSignedIn,
                        userId: user?.id,
                        github_access_token: githubAccessToken,
                    },
                    {
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
                if (response.status === 200) {
                    setProcessed(true);
                    setRepoData(response.data);
                }
            } catch (error: any) {
                console.error('Error processing repository:', error);
                toast.error(error?.response?.data?.message || 'Error processing repository');
                setError(error?.response?.data?.detail || 'Error processing repository');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, isLoaded, isSignedIn, user?.id]);


    if (loading) {
        return (
            <motion.div
                key="loading"
                variants={fadeInVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex flex-col items-center justify-center h-full space-y-4 px-4"
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
                    <div className="flex-1 flex flex-col relative items-center justify-center w-full h-[100dvh] max-w-8xl mx-auto px-4 ">
                        <RepoPageNavbar />
                        <section id='Chat' className={`h-full w-full ${activeView === 'Chat' ? 'block' : 'hidden'}`}>
                            <Chat url={url} />
                        </section>
                        <section id='FolderStructure' className={`h-full w-full max-w-7xl ${activeView === 'FolderStructure' ? 'block' : 'hidden'} `}>
                            <FolderStructure URL={url} />
                        </section>
                        <section id='Details' className={`h-full w-full max-w-7xl ${activeView === 'Details' ? 'block' : 'hidden'} `}>
                            <Details URL={url} />
                        </section>
                        <section id='RepoVisualizer' className={`h-full w-full max-w-7xl ${activeView === 'RepoVisualizer' ? 'block' : 'hidden'} `}>
                            <RepoVisualizer repoUrl={url} />
                        </section>
                        <section id='DependencyGraph' className={`h-full w-full max-w-7xl ${activeView === 'DependencyGraph' ? 'block' : 'hidden'} `}>
                            <DependencyGraph URL={url} />
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
            className="flex flex-col items-center justify-center h-full space-y-4 px-4"
        >
            <Info className="h-12 w-12 text-red-500" />
            <p className="text-base text-center font-semibold max-w-md">
                {error.startsWith("Failed") ? "An unexpected error occurred." : error}
            </p>
            <Button variant="default" asChild>
                <Link href="/">
                    Home
                </Link>
            </Button>
        </motion.div>
    );
}

export default Index;



