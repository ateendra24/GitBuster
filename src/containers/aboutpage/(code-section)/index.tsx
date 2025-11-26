import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ShineBorder } from '@/components/magicui/shine-border'
import { useTheme } from 'next-themes'

function index() {
    const { theme } = useTheme()

    return (
        <section className="py-20 md:py-32 px-4 md:px-6">
            <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl md:text-5xl font-bold tracking-tight"
                >
                    Code Visualization
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-lg text-muted-foreground"
                >
                    Experience your codebase in a whole new way with our powerful visualization tools.
                </motion.p>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative w-full max-w-5xl mx-auto"
            >
                <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
                    <Image
                        width={1200}
                        height={675}
                        src="/visualize.png"
                        alt="Code Visualization Dashboard"
                        className="w-full h-auto rounded-lg"
                    />
                </div>
            </motion.div>
        </section>
    )
}

export default index
