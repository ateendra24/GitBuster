import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import siteConfig from '@/config/siteConfig'

function Questions() {
    return (
        <Accordion type="single" collapsible className="space-y-4" >

            <AccordionItem value="item-1">
                <AccordionTrigger>What is {siteConfig.siteName}?</AccordionTrigger>
                <AccordionContent>
                    {siteConfig.siteName} is an AI-powered platform that provides interactive GitHub repository visualization and intelligent chat analysis.
                    It creates beautiful circle pack diagrams to visualize repository structure and offers AI-powered chat to help you understand your codebase,
                    analyze patterns, and get insights about your projects.
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
                <AccordionTrigger>How does the repository visualization work?</AccordionTrigger>
                <AccordionContent>
                    Our platform fetches your GitHub repository data via the GitHub API and creates interactive circle pack visualizations using D3.js.
                    Files are represented as circles with sizes based on file size, and different colors represent different file types.
                    You can search, filter, and explore your repository structure visually.
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
                <AccordionTrigger>What is the AI chat feature?</AccordionTrigger>
                <AccordionContent>
                    The AI chat allows you to ask questions about your repository and get intelligent responses. The AI analyzes your codebase,
                    creates vector embeddings of your code, and can answer questions about functionality, suggest improvements,
                    explain code patterns, and help you understand complex repositories.
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
                <AccordionTrigger>Is my repository data stored or saved?</AccordionTrigger>
                <AccordionContent>
                    Repository data is processed temporarily for analysis and visualization. Vector embeddings may be created for AI chat functionality
                    and cached for performance, but your source code is not permanently stored. Chat conversations are maintained during your session
                    but can be cleared at any time. See our Privacy Policy for detailed information.
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
                <AccordionTrigger>Do I need to authenticate with GitHub?</AccordionTrigger>
                <AccordionContent>
                    No authentication is required. You simply provide a public GitHub repository URL, and our platform accesses it via the GitHub API.
                    We currently support public repositories only. Make sure the repository URL is accessible and properly formatted.
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
                <AccordionTrigger>What file types are supported in visualizations?</AccordionTrigger>
                <AccordionContent>
                    We support a wide range of file types including JavaScript (.js), TypeScript (.ts/.tsx), React (.jsx), CSS, JSON, Markdown (.md),
                    HTML, Python, Java, YAML, XML, and many others. Each file type is color-coded in the visualization.
                    Certain files like .git, .env, and .DS_Store are automatically excluded.
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
                <AccordionTrigger>Are there any size limitations for repositories?</AccordionTrigger>
                <AccordionContent>
                    Yes, there are practical limits based on GitHub API rate limits (5,000 requests per hour) and processing capabilities.
                    Very large repositories may take longer to process or may be limited in scope.
                    Public folder contents are automatically limited to improve performance.
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8">
                <AccordionTrigger>How accurate are the AI chat responses?</AccordionTrigger>
                <AccordionContent>
                    AI responses are generated based on analysis of your repository content and are generally accurate for understanding code structure and patterns.
                    However, AI analysis should be verified and is provided for informational purposes.
                    The accuracy depends on code quality, documentation, and repository complexity.
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9">
                <AccordionTrigger>Can I search within the repository visualization?</AccordionTrigger>
                <AccordionContent>
                    Yes! The platform includes a search feature that allows you to find specific files within the visualization.
                    Matching files are highlighted in the circle pack diagram, making it easy to locate specific components or files in large repositories.
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-10">
                <AccordionTrigger>Is this free to use for commercial projects?</AccordionTrigger>
                <AccordionContent>
                    Yes! {siteConfig.siteName} is free to use for both personal and commercial projects.
                    Just ensure you&apos;re analyzing repositories you have permission to access and follow our Terms of Service.
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-11">
                <AccordionTrigger>How do I clear my chat history or session data?</AccordionTrigger>
                <AccordionContent>
                    Chat conversations are session-based and automatically cleared when you close your browser or after a period of inactivity.
                    You can also manually clear your session data through browser settings or by starting a new session.
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-12">
                <AccordionTrigger>Does the platform work on mobile devices?</AccordionTrigger>
                <AccordionContent>
                    Yes! The platform is fully responsive and works on mobile devices. The repository visualizations are optimized for touch interaction,
                    and the chat interface adapts to smaller screens while maintaining full functionality.
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-13">
                <AccordionTrigger>What happens if a repository analysis fails?</AccordionTrigger>
                <AccordionContent>
                    If analysis fails, check that the GitHub URL is correct and the repository is public.
                    Common issues include invalid URLs, private repositories, or repositories with non-standard branch names.
                    The platform currently supports repositories with &apos;main&apos; or &apos;master&apos; branches.
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-14">
                <AccordionTrigger>Can I analyze the same repository multiple times?</AccordionTrigger>
                <AccordionContent>
                    Yes, you can analyze the same repository multiple times. However, be mindful of GitHub API rate limits.
                    Recent analyses may be cached to improve performance and reduce API usage.
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-15">
                <AccordionTrigger>Where can I report bugs or request features?</AccordionTrigger>
                <AccordionContent>
                    You can report bugs, request features, or get support through our{" "}
                    <a href={siteConfig.socialLinks.contact} target="_blank" className="underline text-blue-500">
                        Contact Form
                    </a>{" "}
                    We appreciate feedback to help improve the platform!
                </AccordionContent>
            </AccordionItem>

        </Accordion>
    )
}

export default Questions
