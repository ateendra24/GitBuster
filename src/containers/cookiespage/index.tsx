import React from 'react'
import { motion } from 'framer-motion'
import CookiesContent from './(cookies-content)'

export default function CookiesPage() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
        >
            <h1 className="text-3xl md:text-4xl font-bold">Cookie Policy</h1>
            <CookiesContent />
        </motion.div>
    )
} 