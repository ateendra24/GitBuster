import React from 'react'
import siteConfig from '@/config/siteConfig'

export default function CookiesContent() {
    return (
        <div className="space-y-6">
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">1. What Are Cookies</h2>
                <p className="text-muted-foreground">
                    Cookies are small text files stored on your device when you use {siteConfig.siteName}. They help us maintain your chat sessions, remember your repository analysis preferences, and provide a smooth experience while using our AI-powered GitHub repository visualization and chat platform.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">2. How We Use Cookies</h2>
                <div className="space-y-4">
                    <div>
                        <h3 className="text-xl font-medium">2.1 Essential Cookies</h3>
                        <p className="text-muted-foreground">
                            These cookies are necessary for our platform to function properly and provide core repository analysis features.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-2">
                            <li>Chat session management and conversation continuity</li>
                            <li>Repository analysis state preservation</li>
                            <li>User interface preferences and settings</li>
                            <li>Security features and CSRF protection</li>
                            <li>Rate limiting enforcement</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-medium">2.2 Performance Cookies</h3>
                        <p className="text-muted-foreground">
                            These cookies help us optimize repository processing performance and understand how users interact with our visualization features.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-2">
                            <li>Repository analysis performance metrics</li>
                            <li>SVG visualization rendering optimization</li>
                            <li>Chat response time monitoring</li>
                            <li>Error tracking for failed repository analyses</li>
                            <li>Vector store performance analytics</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-medium">2.3 Functionality Cookies</h3>
                        <p className="text-muted-foreground">
                            These cookies enhance your experience by remembering your preferences and maintaining context across sessions.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-2">
                            <li>Recently analyzed repository URLs</li>
                            <li>Visualization preferences (zoom, filter settings)</li>
                            <li>Chat history and conversation context</li>
                            <li>Theme preferences (dark/light mode)</li>
                            <li>Search query history within repositories</li>
                            <li>File type visibility preferences in visualizations</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-medium">2.4 AI and Analysis Cookies</h3>
                        <p className="text-muted-foreground">
                            Specific to our AI-powered features for repository analysis and chat functionality.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-2">
                            <li>Vector embedding cache for faster AI responses</li>
                            <li>Repository analysis progress and state</li>
                            <li>Chat model preferences and settings</li>
                            <li>AI response optimization data</li>
                            <li>Code analysis context preservation</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">3. Third-Party Cookies</h2>
                <p className="text-muted-foreground">
                    Our platform integrates with several third-party services that may set their own cookies:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li><strong>GitHub API:</strong> For accessing repository data and authentication</li>
                    <li><strong>AI/ML Services:</strong> For powering our chat and analysis features</li>
                    <li><strong>Analytics Services:</strong> To understand platform usage and improve performance</li>
                    <li><strong>CDN Services:</strong> For delivering D3.js and other visualization libraries</li>
                    <li><strong>Error Monitoring:</strong> To track and resolve technical issues</li>
                </ul>
                <p className="text-muted-foreground mt-2">
                    These third-party services operate under their own privacy policies and cookie practices.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">4. Managing Cookies</h2>
                <div className="space-y-4">
                    <div>
                        <h3 className="text-xl font-medium">4.1 Browser Controls</h3>
                        <p className="text-muted-foreground">
                            You can control cookies through your browser settings. However, disabling certain cookies may affect platform functionality:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-2">
                            <li><strong>Essential cookies:</strong> Disabling these will prevent chat sessions and repository analysis from working properly</li>
                            <li><strong>Functionality cookies:</strong> You&apos;ll lose saved preferences and have to re-enter repository URLs</li>
                            <li><strong>Performance cookies:</strong> We won&apos;t be able to optimize loading times for repository visualizations</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-medium">4.2 Platform-Specific Controls</h3>
                        <p className="text-muted-foreground">
                            Within our platform, you can manage certain data:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-2">
                            <li>Clear chat history and conversation data</li>
                            <li>Reset repository analysis cache</li>
                            <li>Clear search history and preferences</li>
                            <li>Reset visualization settings to defaults</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">5. Cookie Duration</h2>
                <div className="space-y-2">
                    <h3 className="text-xl font-medium">5.1 Session Cookies</h3>
                    <p className="text-muted-foreground">
                        Temporary cookies that maintain your active chat session and current repository analysis. These are deleted when you close your browser or after a period of inactivity.
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-2">
                        <li>Active chat conversation context</li>
                        <li>Current repository visualization state</li>
                        <li>Temporary analysis cache</li>
                    </ul>
                </div>
                <div className="space-y-2">
                    <h3 className="text-xl font-medium">5.2 Persistent Cookies</h3>
                    <p className="text-muted-foreground">
                        Longer-lasting cookies that remember your preferences across visits:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-2">
                        <li><strong>User preferences:</strong> Up to 1 year</li>
                        <li><strong>Recently analyzed repositories:</strong> Up to 30 days</li>
                        <li><strong>Performance optimization data:</strong> Up to 90 days</li>
                        <li><strong>Analytics data:</strong> Up to 2 years (anonymized)</li>
                    </ul>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">6. Data Protection and Security</h2>
                <p className="text-muted-foreground">
                    We take cookie security seriously, especially given the sensitive nature of repository data:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>All cookies containing repository data are encrypted</li>
                    <li>Session cookies use secure transmission (HTTPS only)</li>
                    <li>Chat conversation cookies are automatically purged after session timeout</li>
                    <li>No repository source code is stored in persistent cookies</li>
                    <li>Vector embeddings in cookies are anonymized and non-reversible</li>
                </ul>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">7. Impact on Platform Features</h2>
                <div className="space-y-2">
                    <p className="text-muted-foreground">
                        <strong>Without Essential Cookies:</strong> Repository analysis, chat functionality, and visualizations will not work.
                    </p>
                    <p className="text-muted-foreground">
                        <strong>Without Functionality Cookies:</strong> You&apos;ll need to re-enter repository URLs and reconfigure visualization preferences each visit.
                    </p>
                    <p className="text-muted-foreground">
                        <strong>Without Performance Cookies:</strong> Repository processing may be slower, and we can&apos;t optimize the experience based on usage patterns.
                    </p>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">8. Updates to This Policy</h2>
                <p className="text-muted-foreground">
                    We may update this Cookie Policy when we add new features to our repository analysis platform or change how we handle data. Significant changes will be communicated through the platform. Continued use indicates acceptance of updated cookie practices.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                    Last updated: {new Date().toLocaleDateString()}
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">9. Contact Us</h2>
                <p className="text-muted-foreground">
                    If you have questions about our cookie practices, data handling in repository analysis, or need help managing your preferences, please contact us:
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