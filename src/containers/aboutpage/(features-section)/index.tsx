import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import React from 'react'
import Image from 'next/image'

function index() {
    const features = [
        {
            icon: "🤖",
            title: "AI-Powered Analysis",
            desc: "Get instant insights about any GitHub repository through our advanced AI analysis system. Understand code structure, patterns, and relationships.",
        },
        {
            icon: "💬",
            title: "Interactive Chat",
            desc: "Chat with an AI assistant about any aspect of the codebase. Ask questions, get explanations, and receive intelligent suggestions.",
        },
        {
            icon: "📊",
            title: "Code Visualization",
            desc: "Explore interactive visualizations of repository structure, dependencies, and relationships between components.",
        },
        {
            icon: "🔍",
            title: "Smart Search",
            desc: "Quickly find relevant code sections, functions, and files using our intelligent search capabilities.",
        },
        {
            icon: "📈",
            title: "Repository Metrics",
            desc: "Get detailed insights about code quality, complexity, and potential improvement areas.",
        },
        {
            icon: "🚀",
            title: "Instant Setup",
            desc: "Start analyzing any GitHub repository in seconds. Just paste the repository URL and let our AI do the work.",
        }
    ]

    return (
        <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="py-20 md:py-32 space-y-12 px-4 md:px-6"
        >
            <div className="text-center space-y-8 max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Powerful Features</h2>
                <p className="text-lg md:text-xl text-muted-foreground">
                    Everything you need to understand and analyze GitHub repositories, powered by advanced AI technology.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {features.map((feature, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="h-full"
                    >
                        <Card className="bg-background/60 border-muted backdrop-blur shadow-md hover:shadow-xl transition h-full group">
                            <CardContent className="p-6 space-y-4">
                                <div className="text-4xl">{feature.icon}</div>
                                <h4 className="text-xl font-semibold">{feature.title}</h4>
                                <p className="text-muted-foreground">{feature.desc}</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    )
}

export default index
