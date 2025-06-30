import { PageWrapper } from "../../../components/wrappers";
import { Metadata } from "next";
import siteConfig from "@/config/siteConfig";
import TermsPage from "@/containers/termspage";

export const metadata: Metadata = {
    title: `Terms of Service - ${siteConfig.siteName}`,
    description: `Terms of Service for ${siteConfig.siteName}. Learn about our service terms, usage policies, and user responsibilities.`,
}

export default function TermsOfService() {
    return (
        <PageWrapper>
            <TermsPage />
        </PageWrapper>
    )
} 