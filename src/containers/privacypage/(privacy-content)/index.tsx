import React from 'react'
import siteConfig from '@/config/siteConfig'

export default function PrivacyContent() {
    return (
        <div className="space-y-6">
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">1. Introduction</h2>
                <p className="text-muted-foreground">
                    Welcome to {siteConfig.siteName}, an AI-powered GitHub repository analysis and chat platform. We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and protect your information when you use our repository visualization and chat services.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">2. Data We Collect</h2>
                <div className="space-y-2">
                    <h3 className="text-xl font-medium">2.1 Repository Data:</h3>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>GitHub repository URLs you provide for analysis</li>
                        <li>Repository structure and file information</li>
                        <li>Code content for AI analysis and chat responses</li>
                        <li>Repository metadata (file sizes, types, folder structures)</li>
                    </ul>
                </div>
                <div className="space-y-2">
                    <h3 className="text-xl font-medium">2.2 Chat and Interaction Data:</h3>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>Your chat messages and questions about repositories</li>
                        <li>AI-generated responses and analysis results</li>
                        <li>Search queries within repository visualizations</li>
                        <li>Session data for maintaining conversation context</li>
                    </ul>
                </div>
                <div className="space-y-2">
                    <h3 className="text-xl font-medium">2.3 Technical Data:</h3>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>IP address and browser information</li>
                        <li>Usage analytics and performance metrics</li>
                        <li>Error logs and debugging information</li>
                        <li>Cookies for session management</li>
                    </ul>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">3. How We Use Your Data</h2>
                <p className="text-muted-foreground">
                    We use your data to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Generate AI-powered repository analysis and visualizations</li>
                    <li>Provide intelligent chat responses about your codebases</li>
                    <li>Create interactive repository structure diagrams</li>
                    <li>Maintain conversation context across chat sessions</li>
                    <li>Improve our AI models and analysis accuracy</li>
                    <li>Monitor system performance and prevent abuse</li>
                    <li>Enhance user experience and platform functionality</li>
                </ul>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">4. Data Processing and Storage</h2>
                <div className="space-y-2">
                    <p className="text-muted-foreground">
                        <strong>Repository Analysis:</strong> We temporarily process your repository data to generate visualizations and enable AI chat functionality. This data is used for analysis purposes and may be cached to improve performance.
                    </p>
                    <p className="text-muted-foreground">
                        <strong>Vector Storage:</strong> Repository content may be converted to vector embeddings for AI analysis. These embeddings help our system understand and respond to questions about your code.
                    </p>
                    <p className="text-muted-foreground">
                        <strong>Session Management:</strong> Chat conversations are stored temporarily to maintain context during your session.
                    </p>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">5. Data Security</h2>
                <p className="text-muted-foreground">
                    We implement industry-standard security measures to protect your data, including encryption in transit and at rest. However, no method of transmission over the Internet is 100% secure. We recommend only analyzing public repositories or repositories you have permission to share.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">6. Third-Party Services</h2>
                <p className="text-muted-foreground">
                    Our platform integrates with:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>GitHub API for repository data access</li>
                    <li>AI/ML services for code analysis and chat functionality</li>
                    <li>Analytics services for usage monitoring</li>
                </ul>
                <p className="text-muted-foreground mt-2">
                    These services may have their own privacy policies and data handling practices.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">7. Your Rights and Controls</h2>
                <p className="text-muted-foreground">
                    You have the right to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Clear your chat history and session data</li>
                    <li>Stop analysis of any repository at any time</li>
                    <li>Request deletion of processed repository data</li>
                    <li>Access information about how your data is used</li>
                    <li>Object to data processing for certain purposes</li>
                </ul>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">8. Contact Us</h2>
                <p className="text-muted-foreground">
                    If you have any questions about this privacy policy, data handling practices, or wish to exercise your rights regarding your data, please contact us:
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
        </div>
    )
} 