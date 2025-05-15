import PageWrapper from "@/components/Wrappers/PageWrapper"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import siteConfig from "@/config/siteConfig"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: `FAQ - ${siteConfig.siteName}`,
    description: `Frequently asked questions about ${siteConfig.siteName}.`,
}

export default function FAQPage() {
    return (
        <PageWrapper>
            <div className="w-full space-y-8">
                <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>

                <Accordion type="single" collapsible className="space-y-4" >

                    <AccordionItem value="item-1">
                        <AccordionTrigger>What is {siteConfig.siteName}?</AccordionTrigger>
                        <AccordionContent>
                            {siteConfig.siteName} is a tool that helps you understand and analyze your GitHub repository structure,
                            component usage, and potential issues using smart code insights.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                        <AccordionTrigger>Is my code stored or saved anywhere?</AccordionTrigger>
                        <AccordionContent>
                            No. Your code is never stored or saved. All analysis happens on-the-fly and is not logged or persisted.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                        <AccordionTrigger>Do I need to give access to my GitHub account?</AccordionTrigger>
                        <AccordionContent>
                            Not necessarily. You can upload code snippets or public repositories. For private repos(*coming soon) , you will need
                            to authorize temporary access.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-4">
                        <AccordionTrigger>Can I use this for commercial projects?</AccordionTrigger>
                        <AccordionContent>
                            Yes! {siteConfig.siteName} is free to use for both personal and commercial projects. Just make sure to
                            follow our terms of use.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-5">
                        <AccordionTrigger>How often is the analyzer updated?</AccordionTrigger>
                        <AccordionContent>
                            We continuously improve the analyzer with new rules, support for modern frameworks, and performance
                            improvements. Updates are rolled out weekly or as needed.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-6">
                        <AccordionTrigger>Where can I report a bug or request a feature?</AccordionTrigger>
                        <AccordionContent>
                            You can reach us at{" "}
                            <a href={siteConfig.socialLinks.contact} target="_blank" className="underline text-blue-500">
                                Click Here
                            </a>{" "}
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-7">
                        <AccordionTrigger>Is there a mobile version?</AccordionTrigger>
                        <AccordionContent>
                            Currently, we focus on web. However, the site is responsive and works well on mobile browsers.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-8">
                        <AccordionTrigger>How can I contribute?</AccordionTrigger>
                        <AccordionContent>
                            We welcome contributions! Check our GitHub repository for guidelines on how to get involved.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-9">
                        <AccordionTrigger>Is there a community or forum?</AccordionTrigger>
                        <AccordionContent>
                            Yes! Join our Discord server to connect with other users, share insights, and get help.
                            <a href="https://discord.gg/your-discord-link" target="_blank" className="underline text-blue-500">
                                Join our Discord
                            </a>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-10">
                        <AccordionTrigger>How can I stay updated?</AccordionTrigger>
                        <AccordionContent>
                            Follow us on{" "}
                            <a href="https://twitter.com/your-twitter-handle" target="_blank" className="underline text-blue-500">
                                Twitter
                            </a>{" "}
                            and{" "}
                            <a href="" target="_blank" className="underline text-blue-500">
                                GitHub
                            </a>{" "}
                            for the latest news, updates, and features. You can also subscribe to our newsletter.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-11">
                        <AccordionTrigger>What programming languages are supported?</AccordionTrigger>
                        <AccordionContent>
                            Currently, we support JavaScript, TypeScript, Python, and Java. More languages will be added soon.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-12">
                        <AccordionTrigger>Can I use {siteConfig.siteName} offline?</AccordionTrigger>
                        <AccordionContent>
                            No, {siteConfig.siteName} requires an internet connection to analyze and provide insights on your code.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-13">
                        <AccordionTrigger>Is there a limit to the size of the code I can analyze?</AccordionTrigger>
                        <AccordionContent>
                            Yes, there is a limit of 100MB for the code you can analyze at once. If your code exceeds this limit,
                            consider breaking it into smaller parts.
                        </AccordionContent>
                    </AccordionItem>

                </Accordion>
            </div>
        </PageWrapper>
    )
}
