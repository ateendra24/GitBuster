import React from 'react'
import { motion } from 'framer-motion'
import siteConfig from '@/config/siteConfig'

function index() {
    return (
        <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative min-h-[75vh] flex items-center justify-center overflow-hidden"
        >
            {/* Content */}
            <div className="relative z-10 py-16 md:py-20 text-center space-y-8 max-w-4xl mx-auto px-4 md:px-6">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    {siteConfig.siteName}
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                    Your AI-powered GitHub repository analyzer. Understand any codebase instantly with intelligent insights and interactive visualizations.
                </p>
                <div className="flex justify-center gap-4">
                    <motion.a
                        href="/"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition"
                    >
                        Try It Now
                    </motion.a>
                    <motion.a
                        href={siteConfig.socialLinks.github}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/90 transition"
                    >
                        View on GitHub
                    </motion.a>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </motion.section>
    )
}

export default index
