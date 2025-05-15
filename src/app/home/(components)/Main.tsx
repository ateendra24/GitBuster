'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import RepoInput from './(RepoInput)/RepoInput';
import RepoAnalysis from './(RepoAnalysis)/RepoAnalysis';
import Image from 'next/image';
import { fadeInVariants } from '@/lib/animations';

interface MainProps { }

export default function Main({ }: MainProps) {
    const [repoProcessed, setRepoProcessed] = useState(false);
    const [repoUrl, setRepoUrl] = useState<string>("");

    const handleRepoProcessed = () => {
        setRepoProcessed(true);
    };

    return (
        <div className="min-h-[100dvh] transition-colors duration-500">
            <div className="container mx-auto px-4 py-8 h-[100dvh] flex flex-col">
                <AnimatePresence mode="wait">
                    {!repoProcessed ? (
                        <motion.div
                            key="input"
                            variants={fadeInVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="flex-1 flex flex-col items-center justify-center"
                        >
                            <RepoInput
                                onProcessed={handleRepoProcessed}
                                onUrlChange={setRepoUrl}
                            />
                            <Image
                                alt="Background mesh"
                                src="/mesh.png"
                                width={100}
                                height={50}
                                className="fixed bottom-0 mx-auto w-[1300px] aspect-auto h-[180px] object-cover -z-10"
                            />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="chat"
                            variants={fadeInVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="flex-1 flex justify-center flex-col h-full"
                        >
                            <RepoAnalysis url={repoUrl} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
