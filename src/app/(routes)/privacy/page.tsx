import PageWrapper from '@/components/Wrappers/PageWrapper';
import { Metadata } from "next";
import siteConfig from "@/config/siteConfig";
import PrivacyPage from "@/containers/privacypage";

export const metadata: Metadata = {
    title: `Privacy Policy - ${siteConfig.siteName}`,
    description: `Privacy Policy for ${siteConfig.siteName}. Learn how we handle your data and protect your privacy.`,
}

export default function PrivacyPolicy() {
    return (
        <PageWrapper>
            <PrivacyPage />
        </PageWrapper>
    )
} 