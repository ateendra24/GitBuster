"use client"
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Footer from '../layout/Footer';

const fadeInVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
};

function ChatPageWrapper({ children, className }: { children?: ReactNode, className?: string }) {
    return (
        <>
            <motion.div
                key="input"
                variants={fadeInVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className={`flex-1 flex flex-col items-center justify-center w-full h-[100dvh] max-w-6xl mx-auto px-4 py-8 ${className}`}
            >
                {children}
            </motion.div>
        </>
    );
}

export default ChatPageWrapper;
