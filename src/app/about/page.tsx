'use client'

import { motion } from 'framer-motion'
import siteConfig from '@/config/siteConfig'
import PageWrapper from '@/components/Wrappers/PageWrapper'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
// import { HeroHighlight, Highlight } from '@/components/magicui/hero-highlight'
import { AnimatedShinyText } from '@/components/magicui/animated-shiny-text'

export default function AboutPage() {
    const features = [
        { icon: "📁", title: "Code Structure", desc: "Instantly visualize folders and files." },
        { icon: "🤖", title: "AI Summaries", desc: "Smart breakdowns of your codebase." },
        { icon: "📊", title: "Metrics & Graphs", desc: "See complexity and improvements." },
        { icon: "🔍", title: "Dependency Maps", desc: "Track dependencies across modules." },
        { icon: "📦", title: "Package Insights", desc: "Understand project setup and tooling." },
        { icon: "🧠", title: "Smart Suggestions", desc: "Detect bad patterns and suggest fixes." },
        { icon: "📝", title: "Inline Explanations", desc: "Get AI explanations for code blocks." },
        { icon: "📈", title: "Progress Tracking", desc: "Visualize refactors and improvements." },
        { icon: "🌐", title: "Multi-Repo Support", desc: "Analyze and compare multiple projects." },
        { icon: "🔒", title: "Private Repo Access", desc: "Securely analyze private repositories." },
        { icon: "🌟", title: "Developer Tools", desc: "Editor plugins and GitHub integrations." },
        { icon: "⚡", title: "Blazing Fast", desc: "Process and respond instantly." },
    ]

    return (
        <PageWrapper className="!max-w-7xl px-4 md:px-8">
            {/* HERO SECTION */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="space-y-10"
            >
                <div>
                    <div className="py-40 text-center text-white space-y-6 max-w-3xl mx-auto">
                        <AnimatedShinyText className="text-4xl md:text-6xl font-extrabold">
                            Understand Code Instantly
                        </AnimatedShinyText>
                        <br /><br />
                        <p className="text-base md:text-lg text-muted-foreground">
                            {siteConfig.siteName}{' '}
                            helps developers explore and understand repositories with AI-powered insights and visual clarity.
                        </p>
                    </div>
                </div>
            </motion.section>

            {/* FEATURES */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="py-20 space-y-10"
            >
                <h2 className="text-4xl font-bold text-center">🚀 Key Features</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="h-full"
                        >
                            <Card className="bg-background/60 border-muted backdrop-blur shadow-md hover:shadow-xl transition">
                                <CardContent className="p-6 space-y-3">
                                    <div className="text-3xl">{feature.icon}</div>
                                    <h4 className="text-lg font-semibold">{feature.title}</h4>
                                    <p className="text-muted-foreground text-sm">{feature.desc}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* MISSION */}
            <motion.section
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="py-20 text-center space-y-6 max-w-3xl mx-auto"
            >
                <h2 className="text-4xl font-bold">🎯 Our Mission</h2>
                <p className="text-lg text-muted-foreground">
                    We aim to streamline code reviews and onboarding for developers by making repository understanding effortless.
                    Whether you're joining a new project or assessing open-source code, <strong>{siteConfig.siteName}</strong> saves you hours of time.
                </p>
            </motion.section>

            {/* HOW IT WORKS */}
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

            {/* CODE VISUALIZATION */}
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="py-20 text-center space-y-6"
            >
                <h2 className="text-4xl font-bold">📈 Visualize the Code</h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Dive into complex codebases with architectural graphs, dependency trees, and visual file explorers.
                </p>
                <img
                    src="/visual-architecture.png"
                    alt="Code Architecture Graphic"
                    className="rounded-xl shadow-lg max-w-4xl mx-auto"
                />
            </motion.section>

            {/* CONTACT US */}
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
        </PageWrapper>
    )
}
