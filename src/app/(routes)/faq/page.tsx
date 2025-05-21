import PageWrapper from "@/components/wrappers/PageWrapper"
import siteConfig from "@/config/siteConfig"
import { Metadata } from "next"
import FaqPage from "@/containers/faq-page/index"

export const metadata: Metadata = {
    title: `FAQ - ${siteConfig.siteName}`,
    description: `Frequently asked questions about ${siteConfig.siteName}.`,
}

export default function page() {
    return (
        <PageWrapper>
            <FaqPage />
        </PageWrapper>
    )
}
