import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { RainbowButton } from '@/components/magicui/rainbow-button'

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
        <section className="py-20 md:py-32 px-4 md:px-6">
            <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl md:text-5xl font-bold tracking-tight"
                >
                    How It Works
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-lg text-muted-foreground"
                >
                    Our process is simple yet powerful, designed to give you deep insights into your codebase.
                </motion.p>
            </div>

            <div className="relative max-w-3xl mx-auto">
                <div className="absolute left-[2.25rem] top-0 bottom-0 w-0.5 bg-muted-foreground/20" />

                <div className="flex flex-col gap-8">
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card className="bg-background/60 border-muted backdrop-blur shadow-sm hover:shadow-md transition-all duration-300">
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-6">
                                        <div className="relative z-10">
                                            <div className="text-4xl bg-background rounded-full p-2 shadow-sm border">
                                                {step.icon}
                                            </div>
                                        </div>
                                        <div className="space-y-2 flex-1 pt-2">
                                            <h4 className="text-xl font-bold">{step.title}</h4>
                                            <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="text-center space-y-6 max-w-3xl mx-auto pt-16">
                <p className="text-muted-foreground">
                    Ready to transform how you understand and work with code? Get started in minutes.
                </p>
                <div className="flex justify-center">
                    <Link href={'/'}>
                        <RainbowButton>
                            Try It Now
                        </RainbowButton>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default index
