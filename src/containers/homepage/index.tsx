'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import HeroSection from './(hero-section)';
import InputSection from './(input-section)';

const fadeInVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
};

export default function index() {

    return (
        <div className="min-h-[100dvh] transition-colors duration-500">
            <div className="container mx-auto px-4 py-8 h-[100dvh] flex flex-col">
                <motion.div
                    key="input"
                    variants={fadeInVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="flex-1 flex flex-col items-center justify-center"
                >
                    <HeroSection />
                    <InputSection />

                    <Image
                        alt="Background mesh"
                        src="/mesh.png"
                        width={100}
                        height={50}
                        className="fixed bottom-0 mx-auto w-[1000px] aspect-auto h-[100px] object-cover -z-10"
                    />
                </motion.div>
            </div>
        </div>
    );
}
