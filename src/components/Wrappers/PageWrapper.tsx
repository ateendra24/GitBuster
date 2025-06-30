"use client"
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Footer from '../layout/Footer';

const fadeInVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
};

function PageWrapper({ children, className }: { children?: ReactNode, className?: string }) {
    return (
        <>
            <motion.div
                key="input"
                variants={fadeInVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className={`flex-1 flex flex-col items-center justify-center mt-[60px] w-full max-w-4xl mx-auto px-6 py-10 mb-20 min-h-[calc(100dvh-60px)] ${className}`}
            >
                {children}
            </motion.div>
            <Footer />
        </>
    );
}

export default PageWrapper;
