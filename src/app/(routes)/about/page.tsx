import PageWrapper from '@/components/Wrappers/PageWrapper';
import { Metadata } from "next";
import siteConfig from "@/config/siteConfig";
import AboutPage from "@/containers/aboutpage/index";

export const metadata: Metadata = {
    title: `About - ${siteConfig.siteName}`,
    description: `Learn more about ${siteConfig.siteName}.`,
}

export default function page() {

    return (
        <PageWrapper className="!max-w-7xl px-4 md:px-8 !py-0">
            <AboutPage />
        </PageWrapper>
    )
}
