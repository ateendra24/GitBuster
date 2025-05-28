import React from 'react'
import { motion } from 'framer-motion'
import siteConfig from '@/config/siteConfig'

export default function CookiesContent() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">1. What Are Cookies</h2>
                <p className="text-muted-foreground">
                    Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience and enable certain features to function properly.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">2. How We Use Cookies</h2>
                <div className="space-y-4">
                    <div>
                        <h3 className="text-xl font-medium">2.1 Essential Cookies</h3>
                        <p className="text-muted-foreground">
                            These cookies are necessary for the website to function properly. They enable basic features like page navigation and access to secure areas.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-2">
                            <li>Session management</li>
                            <li>Authentication</li>
                            <li>Security features</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-medium">2.2 Performance Cookies</h3>
                        <p className="text-muted-foreground">
                            These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-2">
                            <li>Page load times</li>
                            <li>Error tracking</li>
                            <li>Usage statistics</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-medium">2.3 Functionality Cookies</h3>
                        <p className="text-muted-foreground">
                            These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-2">
                            <li>User preferences</li>
                            <li>Language settings</li>
                            <li>Theme preferences</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">3. Third-Party Cookies</h2>
                <p className="text-muted-foreground">
                    We use some third-party services that may set their own cookies:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Analytics services (e.g., Google Analytics)</li>
                    <li>GitHub authentication</li>
                    <li>Performance monitoring tools</li>
                </ul>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">4. Managing Cookies</h2>
                <p className="text-muted-foreground">
                    You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed.
                </p>
                <p className="text-muted-foreground mt-2">
                    However, if you do this, you may have to manually adjust some preferences every time you visit our site and some services and functionalities may not work.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">5. Cookie Duration</h2>
                <div className="space-y-2">
                    <h3 className="text-xl font-medium">5.1 Session Cookies</h3>
                    <p className="text-muted-foreground">
                        These cookies are temporary and are deleted when you close your browser.
                    </p>
                </div>
                <div className="space-y-2">
                    <h3 className="text-xl font-medium">5.2 Persistent Cookies</h3>
                    <p className="text-muted-foreground">
                        These cookies remain on your device for a specified period or until you delete them.
                    </p>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">6. Updates to This Policy</h2>
                <p className="text-muted-foreground">
                    We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">7. Contact Us</h2>
                <p className="text-muted-foreground">
                    If you have any questions about our Cookie Policy, please contact us:
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