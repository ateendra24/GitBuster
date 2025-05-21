import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Mail, MessageSquare, Linkedin } from 'lucide-react'
import Github from '@/components/icons/Github';
import siteConfig from '@/config/siteConfig'

function index() {
    const contactOptions = [
        {
            icon: <MessageSquare className="w-6 h-6" />,
            title: "Feedback Form",
            description: "Share your thoughts, ideas, or feature requests with us.",
            action: "Submit Feedback",
            href: "https://forms.gle/c97P7ov41tSL9nom8"
        },
        {
            icon: <Github height={24} width={24} />,
            title: "GitHub",
            description: "Check out our open-source projects and contribute.",
            action: "Visit GitHub",
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
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">💬 Get in Touch</h2>
                <p className="md:text-lg text-muted-foreground leading-relaxed">
                    Have questions, feedback, or ideas? We're here to help and would love to hear from you.
                    <br />
                    Feel free to reach out through any of the channels below, and we'll get back to you as soon as possible.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 max-w-3xl mx-auto">
                {contactOptions.map((option, index) => (
                    <Card key={index} className="bg-background/60 border-muted backdrop-blur shadow-md hover:shadow-xl transition h-full">
                        <CardContent className="p-4 md:p-6 space-y-3 md:space-y-4">
                            <div className="text-primary">
                                {option.icon}
                            </div>
                            <h3 className="text-base sm:text-lg md:text-xl font-semibold">{option.title}</h3>
                            <p className="text-xs sm:text-sm md:text-base text-muted-foreground">{option.description}</p>
                            <Button asChild variant="outline" className="w-full text-xs sm:text-sm md:text-base">
                                <a href={option.href} target="_blank" rel="noopener noreferrer">
                                    {option.action}
                                </a>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

        </motion.section>
    )
}

export default index
