import React from 'react'
import { motion } from 'framer-motion'
import PrivacyContent from './(privacy-content)'

export default function PrivacyPage() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
        >
            <h1 className="text-3xl md:text-4xl font-bold">Privacy Policy</h1>
            <PrivacyContent />
        </motion.div>
    )
} 