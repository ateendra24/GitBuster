"use client"
import React, { ReactElement } from 'react';
import { motion } from 'framer-motion';

const fadeInVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
};

function MessageWrapper({ children }: { children: ReactElement }) {
    return (
        <>
            <motion.div
                key="input"
                variants={fadeInVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className=""
            >
                {children}
            </motion.div>
        </>
    );
}

export default MessageWrapper;
