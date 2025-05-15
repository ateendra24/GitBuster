import PageWrapper from "@/components/Wrappers/PageWrapper"
import { Separator } from "@/components/ui/separator"
import siteConfig from "@/config/siteConfig"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: `Terms & Policies - ${siteConfig.siteName}`,
    description: `Read our terms and privacy policy for using ${siteConfig.siteName}.`,
}

export default function TermsPage() {
    return (
        <PageWrapper>
            <div className="space-y-8">
                <h1 className="text-4xl font-bold">Terms & Policies</h1>

                <Separator />

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">1. Terms of Use</h2>
                    <p>
                        By accessing and using {siteConfig.siteName}, you agree to comply with these Terms. You may not use the
                        service for any illegal or unauthorized purpose. Any misuse may result in suspension or termination of your
                        access.
                    </p>
                </section>

                <Separator />

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">2. Privacy Policy</h2>
                    <p>
                        We do not store or collect your GitHub code or personal data. The analysis happens in real-time and is not
                        saved on our servers. We respect your privacy and aim to keep all interactions secure.
                    </p>
                </section>

                <Separator />

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">3. Disclaimer</h2>
                    <p>
                        {siteConfig.siteName} is provided "as-is" without warranties of any kind. We are not responsible for
                        inaccuracies or any decisions made based on the tool's output.
                    </p>
                </section>

                <Separator />

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">4. Changes to This Policy</h2>
                    <p>
                        We may update these terms at any time. When we do, we will update the date at the top of the document. It is
                        your responsibility to review these terms periodically.
                    </p>
                </section>

                <Separator />

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">5. Limitation of Liability</h2>
                    <p>
                        In no event shall {siteConfig.siteName} or its affiliates be liable for any direct, indirect, incidental,
                        special, consequential, or punitive damages arising from your use of the service.
                    </p>
                </section>

                <Separator />

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">6. Governing Law</h2>
                    <p>
                        These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which
                        {siteConfig.siteName} operates, without regard to its conflict of law principles.
                    </p>
                </section>

                <Separator />

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">5. Contact Us</h2>
                    <p>
                        If you have any questions or concerns about these Terms & Policies, feel free to reach out at{" "}
                        <a href={siteConfig.socialLinks.contact} className="underline text-blue-500">
                            Click Here
                        </a>
                    </p>
                </section>
            </div>
        </PageWrapper>
    )
}
