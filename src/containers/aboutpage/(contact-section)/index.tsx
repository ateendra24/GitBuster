import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { MessageSquare } from 'lucide-react'
import siteConfig from '@/config/siteConfig'
import X from '@/components/icons/X'
import { RainbowButton } from '@/components/magicui/rainbow-button'
import Link from 'next/link'

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
            icon: <X />,
            title: "Feature Requests",
            description: "Have an idea for a new feature? We'd love to hear it!",
            action: "Submit Request",
            href: siteConfig.socialLinks.x
        }
    ]

    return (
        <section className="py-12 md:py-20 px-4 md:px-6">
            <div className="text-center space-y-4 md:space-y-6 max-w-3xl mx-auto mb-12">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold"
                >
                    Get in Touch
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="md:text-lg text-muted-foreground leading-relaxed"
                >
                    Have questions about our GitHub repository analyzer? Want to contribute or provide feedback?
                    <br className="hidden md:block" />
                    We&apos;re here to help and would love to hear from you!
                </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                {contactOptions.map((option, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <Card className="h-full bg-background/60 border-muted backdrop-blur shadow-sm hover:shadow-md transition-all duration-300">
                            <CardContent className="p-8 flex flex-col items-start justify-between h-full">
                                <div className="space-y-4 w-full">
                                    <div className="text-primary p-3 bg-primary/10 rounded-lg w-fit">{option.icon}</div>
                                    <h4 className="text-xl font-semibold">{option.title}</h4>
                                    <p className="text-muted-foreground">{option.description}</p>
                                    <Button
                                        variant="outline"
                                        className="w-full mt-4"
                                        asChild
                                    >
                                        <a href={option.href} target="_blank" rel="noopener noreferrer">
                                            {option.action}
                                        </a>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <div className="text-center pt-16">
                <Link href="/">
                    <RainbowButton>
                        Try {siteConfig.siteName} Now
                    </RainbowButton>
                </Link>
            </div>
        </section>
    )
}

export default index
