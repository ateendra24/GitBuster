import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { GitBranch, GitCommit, GitPullRequest, GitMerge } from 'lucide-react'

function index() {
    const visualizationFeatures = [
        {
            icon: "📊",
            title: "Interactive Code Maps",
            desc: "Navigate your codebase through interactive, zoomable maps that show relationships between components.",
        },
        {
            icon: "🔍",
            title: "Dependency Graphs",
            desc: "Visualize complex dependency relationships with clear, interactive graphs that highlight connections.",
        },
        {
            icon: "📈",
            title: "Code Metrics",
            desc: "Track code quality, complexity, and improvement opportunities with detailed metrics and charts.",
        },
        {
            icon: "🧠",
            title: "AI Insights",
            desc: "Get AI-powered insights about your codebase structure, patterns, and potential improvements.",
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
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Code Visualization</h2>
                <p className="text-lg md:text-xl text-muted-foreground">
                    Experience your codebase in a whole new way with our powerful visualization tools.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-7xl mx-auto">
                {visualizationFeatures.map((feature, i) => (
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

            <div className="relative w-full max-w-3xl mx-auto">
                <div className="hidden dark:block absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg z-10 pointer-events-none"></div>

                <Image
                    width={500}
                    height={300}
                    src="/visualize.png"
                    alt="Code Visualization Dashboard"
                    className="w-full h-auto rounded-lg z-0"
                />
            </div>


        </motion.section>
    )
}

export default index
