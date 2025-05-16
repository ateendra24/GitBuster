import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

function index() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="py-20 text-center space-y-6"
        >
            <h2 className="text-4xl font-bold">💬 Get in Touch</h2>
            <p className="text-muted-foreground text-lg">
                Have feedback, ideas, or feature requests? We'd love to hear from you.
            </p>
            <Button asChild className="px-6 text-lg">
                <a href="https://forms.gle/c97P7ov41tSL9nom8" target="_blank">
                    Contact Us
                </a>
            </Button>
        </motion.section>
    )
}

export default index
