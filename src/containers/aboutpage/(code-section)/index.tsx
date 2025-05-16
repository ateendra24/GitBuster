import React from 'react'
import { motion } from 'framer-motion'

function index() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="py-20 text-center space-y-6"
        >
            <h2 className="text-4xl font-bold">📈 Visualize the Code</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Dive into complex codebases with architectural graphs, dependency trees, and visual file explorers.
            </p>
            <img
                src="/visual-architecture.png"
                alt="Code Architecture Graphic"
                className="rounded-xl shadow-lg max-w-4xl mx-auto"
            />
        </motion.section>
    )
}

export default index
