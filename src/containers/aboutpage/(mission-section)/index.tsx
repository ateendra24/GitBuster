import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import React from 'react'

function index() {
    const missionPoints = [
        {
            icon: "🎯",
            title: "Our Mission",
            desc: "To make GitHub repository analysis accessible to everyone through AI-powered insights and intuitive visualizations."
        },
        {
            icon: "💡",
            title: "Our Vision",
            desc: "A world where developers can instantly understand any GitHub repository, regardless of its size or complexity."
        },
        {
            icon: "🤝",
            title: "Our Values",
            desc: "We believe in open source, transparency, and empowering developers with AI-driven tools that make their work easier."
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
                <div className="space-y-4 text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Our Mission</h2>
                    <p className="text-lg md:text-xl text-muted-foreground">
                        We&apos;re revolutionizing how developers understand GitHub repositories by combining the power of AI with intuitive visualization tools.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mt-12">
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
