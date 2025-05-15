"use client"
import React, { ReactElement, ReactNode } from 'react';
import { motion } from 'framer-motion';
import siteConfig from '@/config/siteConfig';
import Footer from '../General/Footer';

const fadeInVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
};

function PageWrapper({ children, className }: { children: ReactNode, className?: string }) {
    return (
        <>
            <motion.div
                key="input"
                variants={fadeInVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className={`flex-1 flex flex-col items-center justify-center mt-22 w-full max-w-4xl mx-auto px-6 py-12 ${className}`}
            >
                {children}
            </motion.div>
            {/* <footer className="bg-white dark:bg-black border-t  py-4 transition-colors duration-500">
                <div className="container mx-auto px-4 text-center text-gray-500 dark:text-gray-400 text-sm">
                    <p>Made with ❤️ by @<a className="underline" href={siteConfig.author.githubUrl} target="_blank">{siteConfig.author.name}</a></p>
                </div>
            </footer> */}
            <Footer />
        </>
    );
}

export default PageWrapper;
