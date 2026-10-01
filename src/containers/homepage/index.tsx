'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { VoiceBeam } from 'voice-glow';
import HeroSection from './(hero-section)';
import InputSection from './(input-section)';

const fadeInVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
};

export default function Index() {
    const meter = useRef(0.25);

    useEffect(() => {
        let animId: number;
        let target = 0.35;
        let lastTime = performance.now();
        let nextBurstTime = lastTime + 500;

        const animate = (time: number) => {
            // Trigger random voice-like energy bursts at variable intervals
            if (time >= nextBurstTime) {
                const isSpike = Math.random() < 0.35;
                target = isSpike
                    ? 0.55 + Math.random() * 0.4   // Dynamic voice bursts (0.55 - 0.95)
                    : 0.15 + Math.random() * 0.3;  // Gentle ambient presence (0.15 - 0.45)

                nextBurstTime = time + 300 + Math.random() * 800;
            }

            const dt = Math.min((time - lastTime) / 1000, 0.1);
            lastTime = time;

            // Organic subtle oscillation
            const oscillation = Math.sin(time * 0.0035) * 0.05 + Math.cos(time * 0.008) * 0.03;
            const currentTarget = Math.max(0.05, Math.min(1, target + oscillation));

            // Fast rise (attack) and gentle fall (release)
            const speed = currentTarget > meter.current ? 7.0 : 3.0;
            meter.current += (currentTarget - meter.current) * Math.min(1, dt * speed);
            meter.current = Math.max(0, Math.min(1, meter.current));

            animId = requestAnimationFrame(animate);
        };

        animId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animId);
    }, []);

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

                    <div className="fixed bottom-0 mx-auto w-full max-w-[1540px] pointer-events-none -z-10 overflow-hidden">
                        <VoiceBeam
                            type="mobile"
                            colorVariant="colorful"
                            theme="auto"
                            level={() => meter.current}
                            scale={1.6}
                            reach={1.8}
                            spread={2.2}
                            bend={50}
                            glowSize={1.4}
                            bloomHeight={1.4}
                            flow={45}
                            strength={0.9}
                            className="w-full"
                        >
                            <div className="w-full h-[400px] md:h-[550px]" />
                        </VoiceBeam>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
