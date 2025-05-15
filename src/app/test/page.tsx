"use client"
import PageWrapper from '@/components/Wrappers/PageWrapper'
import React, { isValidElement, ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import Page from '../home/page';
import { Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from "sonner"

function page() {

    const data = {
        "response": "Contributing to the `React-Currency-Convertor` project can be done through the standard GitHub workflow of forking, branching, committing, and creating a pull request.  Here's a more detailed breakdown:\n\n1. Fork the Repository:\n\n   - Navigate to the project's GitHub page: [https://github.com/ateendra24/React-Currency-Convertor](https://github.com/ateendra24/React-Currency-Convertor)\n   - Click the \"Fork\" button in the top right corner. This creates a copy of the repository in your GitHub account.\n\n2. Clone your Fork:\n\n   - Open a terminal or command prompt.\n   - Navigate to the directory where you want to store the project locally.\n   - Clone your forked repository using the following command, replacing `<your-github-username>` with your actual username:\n\n     bash\n     git clone https://github.com/<your-github-username>/React-Currency-Convertor.git\n     \n\n3. Create a Branch:\n\n   - Navigate into the project directory:\n\n     bash\n     cd React-Currency-Convertor\n     \n\n   - Create a new branch for your contribution.  Use a descriptive name related to the feature or bug fix you're working on:\n\n     bash\n     git checkout -b <branch-name> \n     \n     For example: `git checkout -b feature/add-historical-rates` or `git checkout -b bugfix/incorrect-conversion`\n\n4. Make your Changes:\n\n   - Make the necessary code changes using your preferred text editor or IDE.\n   - Ensure your code follows the project's coding style and conventions.\n\n5. Commit your Changes:\n\n   - Stage the changes you've made:\n\n     bash\n     git add .  # Adds all changes (use `git add <specific-file>` for specific files)\n     \n\n   - Commit your changes with a clear and concise message:\n\n     bash\n     git commit -m \"Your descriptive commit message\"\n     \n\n6. Push your Branch:\n\n   - Push your branch to your forked repository on GitHub:\n\n     bash\n     git push origin <branch-name>\n     \n\n7. Create a Pull Request:\n\n   - Go back to the original repository on GitHub ([https://github.com/ateendra24/React-Currency-Convertor](https://github.com/ateendra24/React-Currency-Convertor)).\n   - You should see a banner suggesting to create a pull request from your branch. Click on \"Compare & pull request\".\n   - Provide a detailed description of your changes in the pull request description.  Explain the problem you're solving or the feature you're adding.\n   - Submit the pull request.\n\n8. Review and Iteration:\n\n   - The project maintainers will review your pull request. Be prepared to address any feedback or make requested changes.  You can push further commits to your branch, and they will automatically be included in the pull request.\n\n\nThis outlines the general process.  Always check the project's `README.md` or contributing guidelines for any specific instructions or requirements they may have.  This project doesn't have explicit contributing guidelines in a separate file, so adhering to standard best practices for Git and pull requests is recommended.",
        "session_id": "0bbb795d-e4cf-4d5b-abc6-0486bd7e291c"
    }

    function extractTextFromChildren(children: ReactNode): string {
        return React.Children.toArray(children)
            .map(child => {
                if (typeof child === 'string') {
                    return child;
                }

                if (isValidElement(child)) {
                    const element = child as React.ReactElement<{ children?: ReactNode }>;
                    return extractTextFromChildren(element.props.children);
                }

                return '';
            })
            .join('')
            .trim();
    }

    return (
        <PageWrapper>
            <>
                <ReactMarkdown
                    className='AI-message text-sm md:text-base space-y-6'
                    components={{
                        p: ({ node, children }) => {

                            const text = extractTextFromChildren(children);

                            const prefixes = ["bash", "javascript", "js", "python", "html", "css", "json", "xml", "java", "csharp", "php", "ruby", "go", "swift"];

                            let detectedPrefix: string | null = null;
                            let cleanedText = text;

                            for (const prefix of prefixes) {
                                if (text.toLowerCase().startsWith(prefix)) {
                                    detectedPrefix = prefix;
                                    cleanedText = text.slice(prefix.length).trim();
                                    break;
                                }
                            }
                            return (
                                <>
                                    {detectedPrefix ? (
                                        <div className='code-block relative'>
                                            <span className='text-xs bg-muted px-2 py-1 rounded absolute top-1 left-2 capitalize text-muted-foreground'>
                                                {detectedPrefix}
                                            </span>
                                            <p className='pt-6'>{cleanedText}</p>
                                            <Button
                                                variant={'ghost'}
                                                className='h-8 w-8 p-3 rounded-md absolute top-2 right-2 cursor-pointer dark:hover:bg-[var(--color-neutral-800)]'
                                                onClick={() => {
                                                    navigator.clipboard.writeText(cleanedText);
                                                    toast("Code copied to clipboard!")
                                                }}
                                            >
                                                <Copy size={10} />
                                            </Button>
                                        </div>
                                    ) : (
                                        <p>{cleanedText}</p>
                                    )}
                                </>
                            );
                        },
                        a: ({ node, children, ...props }) => {
                            return (
                                <a {...props} className='underline'>
                                    {children}
                                </a>
                            );
                        },

                    }}
                >
                    {data.response}
                </ReactMarkdown>


            </>
        </PageWrapper>
    )
}

export default page
