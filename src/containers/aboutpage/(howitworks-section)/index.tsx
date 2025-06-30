import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'

function index() {
    const steps = [
        {
            icon: "🔗",
            title: "Connect Your Repository",
            desc: "Simply provide your repository URL or connect your GitHub account to get started.",
        },
        {
            icon: "🔍",
            title: "AI Analysis",
            desc: "Our AI analyzes your codebase, understanding its structure, dependencies, and patterns.",
        },
        {
            icon: "📊",
            title: "Visualize & Explore",
            desc: "Explore interactive visualizations of your codebase, from high-level architecture to detailed component relationships.",
        },
        {
            icon: "💡",
            title: "Get Insights",
            desc: "Receive AI-powered insights, suggestions, and recommendations to improve your codebase.",
        }
    ]

    return (
        <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="py-20 md:py-32 space-y-12 px-4 md:px-6"
        >
            <div className="text-center space-y-8 max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">How It Works</h2>
                <p className="text-lg md:text-xl text-muted-foreground">
                    Our process is simple yet powerful, designed to give you deep insights into your codebase.
                </p>
            </div>

            <div className="relative max-w-3xl mx-auto">
                <div className="absolute left-[2.25rem] top-0 bottom-0 w-0.5 bg-muted-foreground/20" />

                <div className="flex flex-col gap-10">
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <Card className="bg-background/60 border-muted backdrop-blur shadow-md hover:shadow-xl transition py-2">
                                <CardContent className="p-3">
                                    <div className="flex items-start gap-4">
                                        <div className="relative">
                                            <div className="text-4xl bg-background rounded-full p-2 shadow-sm">
                                                {step.icon}
                                            </div>
                                        </div>
                                        <div className="space-y-2 flex-1">
                                            <h4 className="text-xl font-semibold">{step.title}</h4>
                                            <p className="text-muted-foreground">{step.desc}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="text-center space-y-4 md:space-y-6 max-w-3xl mx-auto pt-6 md:pt-8">
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
                    Ready to transform how you understand and work with code? Get started in minutes.
                </p>
                <div className="flex justify-center">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition text-sm md:text-base"
                    >
                        Try It Now
                        <ArrowRight className="w-4 h-4" />
                    </motion.button>
                </div>
            </div>
        </motion.section>
    )
}

export default index
