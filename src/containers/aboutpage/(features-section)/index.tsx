import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import React from 'react'
import Image from 'next/image'

function index() {
    const features = [
        {
            icon: "📁",
            title: "Code Structure Analysis",
            desc: "Get a bird's-eye view of your codebase with interactive visualizations of folders, files, and their relationships. Navigate complex projects with ease.",
        },
        {
            icon: "🤖",
            title: "AI-Powered Summaries",
            desc: "Our advanced AI analyzes your codebase to provide intelligent breakdowns, highlighting key components and their purposes.",
        },
        {
            icon: "📊",
            title: "Advanced Metrics & Graphs",
            desc: "Track code quality, complexity, and improvement opportunities with detailed metrics and interactive visualizations.",
        },
        {
            icon: "🔍",
            title: "Dependency Mapping",
            desc: "Visualize and understand complex dependency relationships between modules, packages, and components.",
        },
        {
            icon: "📦",
            title: "Package Insights",
            desc: "Deep dive into your project's dependencies, versions, and potential security or compatibility issues.",
        },
        {
            icon: "🧠",
            title: "Smart Code Suggestions",
            desc: "Receive intelligent recommendations for code improvements, best practices, and optimization opportunities.",
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
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Our Technology</h2>
                <p className="text-lg md:text-xl text-muted-foreground">
                    We're building the most advanced code understanding AI system, designed to help developers work more effectively.
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
