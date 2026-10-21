"use client"
import axios from 'axios';
import React, { useEffect, useState, useCallback, useRef } from 'react'
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Info, Key } from 'lucide-react';
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
import LoadingSection from './(loading-section)/index';
import ApiKeyModal from '@/components/common/ApiKeyModal';
import { getStoredApiKey, API_KEY_EVENT } from '@/lib/apiKey';

const fadeInVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
};

function Index({ username, repo }: { username: string, repo: string }) {
    const url = `https://github.com/${username}/${repo}`;
    const [loading, setLoading] = useState(true);
    const [processed, setProcessed] = useState(false);
    const [currentStep, setCurrentStep] = useState<number | undefined>(0);
    const [error, setError] = useState('');
    const [activeView, setActiveView] = useState<'Chat' | 'FolderStructure' | 'Details' | 'RepoVisualizer' | 'DependencyGraph'>('Chat');
    const [repoData, setRepoData] = useState<any>(null);
    const [apiKeyModalOpen, setApiKeyModalOpen] = useState(false);
    const [isRateLimited, setIsRateLimited] = useState(false);

    const processedRef = useRef(false);
    const isRateLimitedRef = useRef(false);

    useEffect(() => {
        processedRef.current = processed;
    }, [processed]);

    useEffect(() => {
        isRateLimitedRef.current = isRateLimited;
    }, [isRateLimited]);

    console.log("repoData: ", repoData);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError('');
        setIsRateLimited(false);
        setCurrentStep(0);

        try {
            const customApiKey = getStoredApiKey();
            const response = await fetch(`/api/process-repo?stream=true`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(customApiKey ? { 'x-custom-api-key': customApiKey } : {}),
                },
                body: JSON.stringify({
                    url,
                    custom_api_key: customApiKey || undefined,
                }),
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                const isLimit = response.status === 429 || errData?.isRateLimit;
                if (isLimit) {
                    setIsRateLimited(true);
                }
                throw new Error(errData?.message || errData?.detail || 'Error processing repository');
            }

            const contentType = response.headers.get('content-type') || '';
            if (contentType.includes('text/event-stream') && response.body) {
                const reader = response.body.getReader();
                const decoder = new TextDecoder();
                let buffer = '';
                let finalData: any = null;

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    buffer += decoder.decode(value, { stream: true });
                    const lines = buffer.split('\n');
                    buffer = lines.pop() || '';

                    for (const line of lines) {
                        const trimmed = line.trim();
                        if (!trimmed.startsWith('data:')) continue;
                        const dataStr = trimmed.slice(5).trim();
                        if (!dataStr) continue;

                        try {
                            const event = JSON.parse(dataStr);
                            if (event.error) {
                                if (event.status_code === 429 || event.isRateLimit) {
                                    setIsRateLimited(true);
                                }
                                throw new Error(event.error);
                            }

                            if (typeof event.step === 'number') {
                                setCurrentStep(event.step);
                            }

                            if (event.type === 'complete' || event.status === 'completed') {
                                finalData = event;
                                setCurrentStep(5);
                            }
                        } catch (pErr: any) {
                            if (pErr.message && !pErr.message.includes('JSON')) {
                                throw pErr;
                            }
                        }
                    }
                }

                if (finalData) {
                    setRepoData(finalData);
                    // Brief pause to show the completed checklist
                    await new Promise((resolve) => setTimeout(resolve, 800));
                    setProcessed(true);
                } else {
                    throw new Error('Repository processing completed without returning data.');
                }
            } else {
                // Fallback for standard JSON response
                const data = await response.json();
                setRepoData(data);
                setCurrentStep(5);
                await new Promise((resolve) => setTimeout(resolve, 500));
                setProcessed(true);
            }
        } catch (error: any) {
            console.error('Error processing repository:', error);
            const msg = error.message || 'Error processing repository';
            const isLimit = msg.toLowerCase().includes('limit') || isRateLimitedRef.current;
            if (isLimit) {
                setIsRateLimited(true);
            }
            toast.error(msg);
            setError(msg);
        } finally {
            setLoading(false);
        }
    }, [url]);

    useEffect(() => {
        fetchData();

        const handleKeyChange = (e: Event) => {
            const customEvent = e as CustomEvent<string>;
            const newKey = customEvent.detail;
            // Only re-fetch if repository was NOT processed yet and failed due to rate limits
            if (!processedRef.current && isRateLimitedRef.current && Boolean(newKey)) {
                fetchData();
            }
        };

        window.addEventListener(API_KEY_EVENT, handleKeyChange);
        return () => window.removeEventListener(API_KEY_EVENT, handleKeyChange);
    }, [fetchData]);


    if (loading) {
        return (
            <LoadingSection currentStep={currentStep} loading={loading} />
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
                        {/* <SideBarButtons /> */}
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
            className="flex flex-col items-center justify-center h-full space-y-4 px-4 text-center"
        >
            <Info className="h-12 w-12 text-destructive" />
            <p className="text-base font-semibold max-w-md">
                {error.startsWith("Failed") ? "An unexpected error occurred." : error}
            </p>
            {isRateLimited && (
                <p className="text-xs text-muted-foreground max-w-sm">
                    You can bypass daily repository processing limits by providing your own free Gemini API key.
                </p>
            )}
            <div className="flex flex-wrap gap-2 items-center justify-center pt-2">
                <Button variant="default" onClick={() => setApiKeyModalOpen(true)} className="gap-1.5 cursor-pointer">
                    <Key className="w-4 h-4" />
                    Configure Gemini API Key
                </Button>
                <Button variant="outline" asChild>
                    <Link href="/">
                        Home
                    </Link>
                </Button>
            </div>
            <ApiKeyModal open={apiKeyModalOpen} onOpenChange={setApiKeyModalOpen} />
        </motion.div>
    );
}

export default Index;



