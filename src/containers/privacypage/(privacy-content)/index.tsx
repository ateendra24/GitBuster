import React from 'react'
import { motion } from 'framer-motion'
import siteConfig from '@/config/siteConfig'

export default function PrivacyContent() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">1. Introduction</h2>
                <p className="text-muted-foreground">
                    Welcome to {siteConfig.siteName}. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">2. Data We Collect</h2>
                <div className="space-y-2">
                    <h3 className="text-xl font-medium">2.1 Information you provide to us:</h3>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>GitHub repository URLs for analysis</li>
                        <li>Chat messages and queries about codebases</li>
                        <li>Feedback and support requests</li>
                    </ul>
                </div>
                <div className="space-y-2">
                    <h3 className="text-xl font-medium">2.2 Automatically collected information:</h3>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>Usage data and analytics</li>
                        <li>IP address and browser information</li>
                        <li>Cookies and similar tracking technologies</li>
                    </ul>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">3. How We Use Your Data</h2>
                <p className="text-muted-foreground">
                    We use your data to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Provide and improve our GitHub repository analysis services</li>
                    <li>Process your requests and queries</li>
                    <li>Monitor and prevent abuse of our services</li>
                    <li>Improve our website and user experience</li>
                    <li>Comply with legal obligations</li>
                </ul>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">4. Data Security</h2>
                <p className="text-muted-foreground">
                    We implement appropriate security measures to protect your personal data. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">5. Your Rights</h2>
                <p className="text-muted-foreground">
                    You have the right to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Access your personal data</li>
                    <li>Correct inaccurate data</li>
                    <li>Request deletion of your data</li>
                    <li>Object to processing of your data</li>
                    <li>Data portability</li>
                </ul>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">6. Contact Us</h2>
                <p className="text-muted-foreground">
                    If you have any questions about this privacy policy or our data practices, please contact us at:
                </p>
                <div className="flex items-center gap-2">
                    <a
                        href={siteConfig.socialLinks.contact}
                        className="text-primary hover:underline"
                    >
                        Contact Form
                    </a>
                </div>
            </section>
        </motion.div>
    )
} 