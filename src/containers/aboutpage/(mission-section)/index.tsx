import { motion } from 'framer-motion'

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
        <section className="py-20 md:py-32 px-4 md:px-6">
            <div className="max-w-7xl mx-auto">
                <div className="space-y-4 text-center max-w-3xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-5xl font-bold tracking-tight"
                    >
                        Our Mission
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-lg text-muted-foreground"
                    >
                        We&apos;re revolutionizing how developers understand GitHub repositories by combining the power of AI with intuitive visualization tools.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {missionPoints.map((point, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="h-full"
                        >
                            <div className="relative flex h-full w-full flex-col items-start justify-start overflow-hidden rounded-lg border bg-background">
                                <div className="p-8 space-y-4 z-10">
                                    <div className="text-4xl mb-2">{point.icon}</div>
                                    <h4 className="text-xl font-bold">{point.title}</h4>
                                    <p className="text-muted-foreground leading-relaxed">{point.desc}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default index
