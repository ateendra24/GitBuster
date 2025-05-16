import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import React from 'react'

function index() {
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
    )
}

export default index
