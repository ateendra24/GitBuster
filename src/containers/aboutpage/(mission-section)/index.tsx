import siteConfig from '@/config/siteConfig'
import { motion } from 'framer-motion'
import React from 'react'

function index() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="py-20 text-center space-y-6 max-w-3xl mx-auto"
        >
            <h2 className="text-4xl font-bold">🎯 Our Mission</h2>
            <p className="text-lg text-muted-foreground">
                We aim to streamline code reviews and onboarding for developers by making repository understanding effortless.
                Whether you're joining a new project or assessing open-source code, <strong>{siteConfig.siteName}</strong> saves you hours of time.
            </p>
        </motion.section>
    )
}

export default index
