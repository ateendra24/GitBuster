import React from 'react'
import siteConfig from '@/config/siteConfig'

export default function TermsContent() {
    return (
        <div className="space-y-6">
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground">
                    By accessing and using {siteConfig.siteName}, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using this service.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">2. Service Description</h2>
                <p className="text-muted-foreground">
                    {siteConfig.siteName} is an AI-powered platform that provides:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Interactive GitHub repository visualization using circle pack diagrams</li>
                    <li>AI-powered chat interface for repository analysis and code understanding</li>
                    <li>Real-time repository structure analysis and file exploration</li>
                    <li>Intelligent code search and filtering capabilities</li>
                    <li>Vector-based code embeddings for enhanced AI responses</li>
                    <li>Session-based conversation management for contextual interactions</li>
                </ul>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">3. Repository Access and Analysis</h2>
                <div className="space-y-2">
                    <h3 className="text-xl font-medium">3.1 Supported Repositories:</h3>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>Public GitHub repositories accessible via GitHub API</li>
                        <li>Repositories with valid branch references (main/master)</li>
                        <li>Repositories within reasonable size limits for processing</li>
                    </ul>
                </div>
                <div className="space-y-2">
                    <h3 className="text-xl font-medium">3.2 Processing Limitations:</h3>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>Maximum repository size subject to system capabilities</li>
                        <li>Certain file types may be excluded from analysis (.git, .env, etc.)</li>
                        <li>Public folder contents may be limited for performance optimization</li>
                        <li>Processing time varies based on repository complexity</li>
                    </ul>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">4. Rate Limiting and Usage Policies</h2>
                <p className="text-muted-foreground">
                    To ensure fair usage and system stability, we implement the following limits:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>GitHub API rate limits apply (5,000 requests per hour for authenticated users)</li>
                    <li>Maximum 5 concurrent repository analyses per day</li>
                    <li>Chat message rate limiting based on session activity</li>
                    <li>Vector storage limitations for large repositories</li>
                    <li>Session timeout after extended periods of inactivity</li>
                </ul>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">5. User Responsibilities and Acceptable Use</h2>
                <p className="text-muted-foreground">
                    Users agree to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Only analyze repositories you own or have permission to access</li>
                    <li>Provide valid GitHub repository URLs in the correct format</li>
                    <li>Not attempt to analyze private repositories without proper access</li>
                    <li>Respect intellectual property rights of repository owners</li>
                    <li>Not use the service to extract or redistribute proprietary code</li>
                    <li>Not attempt to circumvent rate limits or system protections</li>
                    <li>Use the chat feature responsibly and not for malicious queries</li>
                    <li>Not overload the system with excessive concurrent requests</li>
                </ul>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">6. Data Processing and AI Analysis</h2>
                <div className="space-y-2">
                    <h3 className="text-xl font-medium">6.1 Repository Data:</h3>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>Repository content is processed for visualization and AI analysis</li>
                        <li>Code may be converted to vector embeddings for chat functionality</li>
                        <li>File structure and metadata are analyzed for visualization</li>
                        <li>Processing data may be temporarily cached for performance</li>
                    </ul>
                </div>
                <div className="space-y-2">
                    <h3 className="text-xl font-medium">6.2 AI Chat Responses:</h3>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>AI responses are generated based on repository content analysis</li>
                        <li>Chat context is maintained during active sessions</li>
                        <li>AI analysis may not be 100% accurate and should be verified</li>
                        <li>Generated insights are for informational purposes only</li>
                    </ul>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">7. Service Limitations and Disclaimers</h2>
                <p className="text-muted-foreground">
                    We do not guarantee:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>100% uptime or uninterrupted service availability</li>
                    <li>Accuracy of AI-generated code analysis or chat responses</li>
                    <li>Successful processing of all repository types or sizes</li>
                    <li>Compatibility with all GitHub repository configurations</li>
                    <li>Preservation of analysis data across sessions</li>
                    <li>Support for repositories with complex authentication requirements</li>
                    <li>Real-time synchronization with repository changes</li>
                </ul>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">8. Intellectual Property and Third-Party Services</h2>
                <div className="space-y-2">
                    <p className="text-muted-foreground">
                        <strong>GitHub Integration:</strong> This service uses the GitHub API and is subject to GitHub&apos;s terms of service and rate limiting policies.
                    </p>
                    <p className="text-muted-foreground">
                        <strong>Repository Content:</strong> All analyzed repository content remains the property of the original repository owners. We do not claim ownership of user-provided repository data.
                    </p>
                    <p className="text-muted-foreground">
                        <strong>Visualization Technology:</strong> Our platform uses D3.js and other open-source libraries for repository visualization, subject to their respective licenses.
                    </p>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">9. Privacy and Data Handling</h2>
                <p className="text-muted-foreground">
                    Data handling practices are detailed in our Privacy Policy. Key points include:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Repository data is processed temporarily for analysis purposes</li>
                    <li>Chat conversations may be stored for session continuity</li>
                    <li>Vector embeddings may be created from repository content</li>
                    <li>Users can clear their session data at any time</li>
                    <li>We recommend only analyzing public or authorized repositories</li>
                </ul>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">10. Service Modifications and Availability</h2>
                <p className="text-muted-foreground">
                    We reserve the right to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Modify, suspend, or discontinue any part of the service</li>
                    <li>Update visualization algorithms and AI models</li>
                    <li>Adjust rate limits and usage policies</li>
                    <li>Perform maintenance that may temporarily affect availability</li>
                    <li>Block access to repositories that violate terms or cause system issues</li>
                </ul>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">11. Termination and Access Suspension</h2>
                <p className="text-muted-foreground">
                    We may terminate or suspend access for:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Violation of these terms of service</li>
                    <li>Abuse of rate limits or system resources</li>
                    <li>Attempting to access unauthorized repositories</li>
                    <li>Malicious use of the chat or analysis features</li>
                    <li>Any behavior that compromises system integrity or other users</li>
                </ul>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">12. Limitation of Liability</h2>
                <p className="text-muted-foreground">
                    To the maximum extent permitted by law:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>We are not liable for any indirect, incidental, or consequential damages</li>
                    <li>AI-generated analysis is provided &quot;as is&quot; without warranties</li>
                    <li>Users are responsible for verifying AI insights and code analysis</li>
                    <li>We are not responsible for GitHub API availability or changes</li>
                    <li>Repository visualization accuracy depends on source data quality</li>
                </ul>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">13. Changes to Terms</h2>
                <p className="text-muted-foreground">
                    We may modify these terms at any time to reflect service updates, legal requirements, or policy changes. Continued use of the service after changes constitutes acceptance of the modified terms. Significant changes will be communicated through the platform.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">14. Contact and Support</h2>
                <p className="text-muted-foreground">
                    For questions about these terms, technical support, or to report issues with repository analysis or chat functionality, please contact us:
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