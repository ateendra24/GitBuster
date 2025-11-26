import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import React from 'react'

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
        <section className="py-20 md:py-32 px-4 md:px-6 bg-background relative overflow-hidden">
            <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl md:text-5xl font-bold tracking-tight"
                >
                    Powerful Features
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-lg text-muted-foreground"
                >
                    Everything you need to understand and analyze GitHub repositories, powered by advanced AI technology.
                </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {features.map((feature, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="h-full"
                    >
                        <Card className="h-full bg-background/60 border-muted backdrop-blur shadow-sm hover:shadow-md transition-all duration-300">
                            <CardContent className="p-6 flex flex-col items-start justify-start h-full">
                                <div className="text-4xl mb-4">{feature.icon}</div>
                                <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
                                <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}

export default index
