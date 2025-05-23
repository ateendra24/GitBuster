import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import React from 'react'
import Image from 'next/image'

function index() {
    const missionPoints = [
        {
            icon: "🎯",
            title: "Our Mission",
            desc: "To revolutionize how developers understand and interact with codebases through AI-powered visualization and analysis."
        },
        {
            icon: "💡",
            title: "Our Vision",
            desc: "A world where every developer can easily understand, maintain, and improve any codebase, regardless of its complexity."
        },
        {
            icon: "🤝",
            title: "Our Values",
            desc: "We believe in transparency, continuous improvement, and empowering developers with the tools they need to succeed."
        }
    ]

    return (
        <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="py-20 md:py-32 space-y-12 px-4 md:px-6"
        >
            <div className="max-w-7xl mx-auto">

                <div className="space-y-4 text-center  max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Our Mission</h2>
                    <p className="text-lg md:text-xl text-muted-foreground">
                        We're on a mission to transform how developers understand and work with codebases through the power of AI and visualization.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {missionPoints.map((point, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Card className="bg-background/60 h-full border-muted backdrop-blur shadow-md hover:shadow-xl transition">
                                <CardContent className="p-6 space-y-4">
                                    <div className="text-4xl">{point.icon}</div>
                                    <h4 className="text-xl font-semibold">{point.title}</h4>
                                    <p className="text-muted-foreground">{point.desc}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    )
}

export default index
