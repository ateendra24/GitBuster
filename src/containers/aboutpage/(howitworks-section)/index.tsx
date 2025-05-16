import React from 'react'
import { motion } from 'framer-motion'

function index() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="py-20 text-center space-y-6"
        >
            <h2 className="text-4xl font-bold">🛠️ How It Works</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Our system analyzes your GitHub repo, identifies key components, summarizes the code using AI, and suggests improvements. Just paste a repo URL — we do the rest.
            </p>
            <div className="mt-10">
                <iframe
                    className="w-full aspect-video rounded-xl shadow-lg max-w-5xl mx-auto"
                    src="https://www.youtube.com/embed/YOUR_DEMO_VIDEO_ID"
                    title="Demo Video"
                    allowFullScreen
                />
            </div>
        </motion.section>
    )
}

export default index
