import PageWrapper from "@/components/wrappers/PageWrapper";
import { Metadata } from "next";
import siteConfig from "@/config/siteConfig";

export const metadata: Metadata = {
    title: `Terms of Service - ${siteConfig.siteName}`,
    description: `Terms of Service for ${siteConfig.siteName}. Learn about our service terms, usage policies, and user responsibilities.`,
}

export default function TermsOfService() {
    return (
        <PageWrapper>
            <div className="space-y-8">
                <h1 className="text-3xl md:text-4xl font-bold">Terms of Service</h1>

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
                            {siteConfig.siteName} provides AI-powered GitHub repository analysis services, including code understanding, visualization, and interactive chat capabilities.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">3. API Rate Limiting</h2>
                        <p className="text-muted-foreground">
                            To ensure fair usage and system stability, we implement the following rate limits:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                            <li>Maximum 100 API requests per hour per user</li>
                            <li>Maximum 5 concurrent repository analyses</li>
                            <li>Maximum 50 chat messages per hour</li>
                            <li>Rate limits may be adjusted based on usage patterns and system load</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">4. User Responsibilities</h2>
                        <p className="text-muted-foreground">
                            Users agree to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                            <li>Provide accurate repository URLs and information</li>
                            <li>Not attempt to circumvent rate limits or security measures</li>
                            <li>Not use the service for malicious purposes</li>
                            <li>Respect intellectual property rights of analyzed repositories</li>
                            <li>Not share or distribute API keys or access tokens</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">5. Service Limitations</h2>
                        <p className="text-muted-foreground">
                            We do not guarantee:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                            <li>Uninterrupted or error-free service</li>
                            <li>Accuracy of AI-generated analysis</li>
                            <li>Availability of specific features or functionality</li>
                            <li>Support for all repository types or sizes</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">6. Termination</h2>
                        <p className="text-muted-foreground">
                            We reserve the right to terminate or suspend access to our service for users who violate these terms or engage in abusive behavior.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">7. Changes to Terms</h2>
                        <p className="text-muted-foreground">
                            We may modify these terms at any time. Continued use of the service after changes constitutes acceptance of the modified terms.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">8. Contact</h2>
                        <p className="text-muted-foreground">
                            For questions about these terms, please contact us through our:
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
            </div>
        </PageWrapper>
    )
} 