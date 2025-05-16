import React from 'react'
import { motion } from 'framer-motion'
import { AnimatedShinyText } from '@/components/magicui/animated-shiny-text'
import siteConfig from '@/config/siteConfig'

function index() {
    return (
        <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-10"
        >
            <div>
                <div className="py-40 text-center text-white space-y-6 max-w-3xl mx-auto">
                    <AnimatedShinyText className="text-4xl md:text-6xl font-extrabold">
                        Understand Code Instantly
                    </AnimatedShinyText>
                    <br /><br />
                    <p className="text-base md:text-lg text-muted-foreground">
                        {siteConfig.siteName}{' '}
                        helps developers explore and understand repositories with AI-powered insights and visual clarity.
                    </p>
                </div>
            </div>
        </motion.section>
    )
}

export default index
