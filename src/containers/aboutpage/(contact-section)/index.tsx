import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Mail, MessageSquare, Linkedin, Github } from 'lucide-react'
import siteConfig from '@/config/siteConfig'

function index() {
    const contactOptions = [
        {
            icon: <MessageSquare className="w-6 h-6" />,
            title: "Feedback & Support",
            description: "Have questions or suggestions? We'd love to hear from you!",
            action: "Contact Us",
            href: siteConfig.socialLinks.contact
        },
        {
            icon: <Github className="w-6 h-6" />,
            title: "GitHub",
            description: "Check out our open-source project and contribute to its development.",
            action: "View Repository",
            href: siteConfig.socialLinks.github
        }
    ]

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="py-12 md:py-20 space-y-8 md:space-y-12 px-4 md:px-6"
        >
            <div className="text-center space-y-4 md:space-y-6 max-w-3xl mx-auto">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">Get in Touch</h2>
                <p className="md:text-lg text-muted-foreground leading-relaxed">
                    Have questions about our GitHub repository analyzer? Want to contribute or provide feedback?
                    <br />
                    We're here to help and would love to hear from you!
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 content-center gap-6 max-w-3xl mx-auto">
                {contactOptions.map((option, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <Card className="bg-background/60 border-muted backdrop-blur shadow-md hover:shadow-xl transition h-full">
                            <CardContent className="p-6 space-y-4">
                                <div className="text-primary">{option.icon}</div>
                                <h4 className="text-xl font-semibold">{option.title}</h4>
                                <p className="text-muted-foreground">{option.description}</p>
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    asChild
                                >
                                    <a href={option.href} target="_blank" rel="noopener noreferrer">
                                        {option.action}
                                    </a>
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <div className="text-center pt-8">
                <motion.a
                    href="/"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition"
                >
                    Try RepoAI Now
                </motion.a>
            </div>
        </motion.section>
    )
}

export default index
