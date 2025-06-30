import PageWrapper from '@/components/Wrappers/PageWrapper';
import { Metadata } from "next";
import siteConfig from "@/config/siteConfig";
import CookiesPage from "@/containers/cookiespage";

export const metadata: Metadata = {
    title: `Cookie Policy - ${siteConfig.siteName}`,
    description: `Cookie Policy for ${siteConfig.siteName}. Learn about how we use cookies and similar technologies.`,
}

export default function CookiePolicy() {
    return (
        <PageWrapper>
            <CookiesPage />
        </PageWrapper>
    )
} 