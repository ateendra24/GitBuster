"use client"
import PageWrapper from '@/components/wrappers/PageWrapper'
import React, { isValidElement, ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import { ArrowUp, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from "sonner"
import CodeBlock from '@/components/pages/repopage/CodeBlock';
import { useCopyToClipboard } from 'react-use';
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

function page() {
    const [state, copyToClipboard] = useCopyToClipboard();

    const copyCode = (code: string) => {
        copyToClipboard(code);
    };

    const data = {
        "response": "Contributing to the `React-Currency-Convertor` project can be done through the standard GitHub workflow of forking, branching, committing, and creating a pull request.  Here's a more detailed breakdown:\n\n1. Fork the Repository:\n\n   - Navigate to the project's GitHub page: [https://github.com/ateendra24/React-Currency-Convertor](https://github.com/ateendra24/React-Currency-Convertor)\n   - Click the \"Fork\" button in the top right corner. This creates a copy of the repository in your GitHub account.\n\n2. Clone your Fork:\n\n   - Open a terminal or command prompt.\n   - Navigate to the directory where you want to store the project locally.\n   - Clone your forked repository using the following command, replacing `<your-github-username>` with your actual username:\n\n     bash\n     git clone https://github.com/<your-github-username>/React-Currency-Convertor.git\n     \n\n3. Create a Branch:\n\n   - Navigate into the project directory:\n\n     bash\n     cd React-Currency-Convertor\n     \n\n   - Create a new branch for your contribution.  Use a descriptive name related to the feature or bug fix you're working on:\n\n     bash\n     git checkout -b <branch-name> \n     \n     For example: `git checkout -b feature/add-historical-rates` or `git checkout -b bugfix/incorrect-conversion`\n\n4. Make your Changes:\n\n   - Make the necessary code changes using your preferred text editor or IDE.\n   - Ensure your code follows the project's coding style and conventions.\n\n5. Commit your Changes:\n\n   - Stage the changes you've made:\n\n     bash\n     git add .  # Adds all changes (use `git add <specific-file>` for specific files)\n     \n\n   - Commit your changes with a clear and concise message:\n\n     bash\n     git commit -m \"Your descriptive commit message\"\n     \n\n6. Push your Branch:\n\n   - Push your branch to your forked repository on GitHub:\n\n     bash\n     git push origin <branch-name>\n     \n\n7. Create a Pull Request:\n\n   - Go back to the original repository on GitHub ([https://github.com/ateendra24/React-Currency-Convertor](https://github.com/ateendra24/React-Currency-Convertor)).\n   - You should see a banner suggesting to create a pull request from your branch. Click on \"Compare & pull request\".\n   - Provide a detailed description of your changes in the pull request description.  Explain the problem you're solving or the feature you're adding.\n   - Submit the pull request.\n\n8. Review and Iteration:\n\n   - The project maintainers will review your pull request. Be prepared to address any feedback or make requested changes.  You can push further commits to your branch, and they will automatically be included in the pull request.\n\n\nThis outlines the general process.  Always check the project's `README.md` or contributing guidelines for any specific instructions or requirements they may have.  This project doesn't have explicit contributing guidelines in a separate file, so adhering to standard best practices for Git and pull requests is recommended.",
        "session_id": "0bbb795d-e4cf-4d5b-abc6-0486bd7e291c"
    }

    const data2 = {
        "response": "Okay, here's a visualization of the `Password_Generator` repository structure and key components, focusing on the provided file snippets.  I'll use a combination of lists and code blocks to represent the file structure and dependencies.\n\n\nPassword_Generator (Repository Root)\n├── src\n│   └── App.jsx\n├── package-lock.json\n└── package.json (Not directly provided, but essential)\n\n\n### `src/App.jsx`\n\nThis file (Document 3) contains the main application logic, likely a React component.\n\njsx\n// src/App.jsx (Snippet)\n<input\n  type=\"range\"\n  min={6}\n  max={60}  value={length}\n  className=\"cursor-pointer h-2 bg-gray-200 rounded-lg appearance-none\"\n  onChange={(e) => {\n    setLength(e.target.value);\n  }}\n/>\n<label className=\"pt-4\" htmlFor=\"\">Length : {length}</label>\n\n// Checkbox example\n<input\n  className=\"accent-gray-700 invert checked:accent-gray-700\"\n  type=\"checkbox\"\n  defaultChecked={numberAllowed}\n  id=\"numberInput\"\n  onChange={() => {\n    setNumberAllowed((prev) => !prev);\n  }}\n/>\n<label htmlFor=\"NumberInput\">Number</label>\n\n\n*   Functionality: This snippet shows a range input for password length and checkboxes to control character sets (numbers, special characters).\n*   State Management:  It uses `setLength`, `setNumberAllowed`, and `setCharAllowed` which are likely `useState` hooks to manage the component's state.\n\n### `package-lock.json`\n\nThis file (Documents 1, 2, 4, 5, 6, 7, 8) manages the project's dependencies.  It's a large file, so I'll highlight some key dependencies based on the provided snippets.\n\n*   JavaScript Language Features/Utilities:\n    *   `esquery` (Document 1):  Used for querying JavaScript syntax trees.\n    *   `estraverse` (Document 1):  For traversing JavaScript syntax trees.\n    *   `esutils` (Document 1):  ECMAScript language utilities.\n    *   `espree` (Document 1): ECMAScript parser.\n    *   `es-abstract` (Documents 6):  Implementation of ECMAScript spec algorithms.\n    *   `es-errors` (Documents 5, 6, 8): Provides consistent error objects.\n\n*   Build/Bundling Tools:\n    *   `esbuild` (Document 4):  An extremely fast JavaScript bundler and minifier.\n    *   `@rollup/rollup-win32-*` (Document 7):  Optional dependencies for Rollup (another bundler) on Windows.\n\n*   Utility Libraries:\n    *   `which-collection` (Document 2):  Detects the type of a collection (Map, Set, etc.).\n    *   `word-wrap` (Document 2):  Wraps text to a specific line length.\n    *   `wrap-ansi` (Document 2):  Wraps text with ANSI escape codes.\n    *   `side-channel` (Document 5):  A mechanism for private data per object.\n    *   `signal-exit` (Document 5):  Handles process exit signals.\n\n*   Polyfills/Shims:\n    *   `array.prototype.flatmap` (Document 6): Polyfill for `Array.prototype.flatMap`.\n    *   `array.prototype.toreversed` (Document 6): Polyfill for `Array.prototype.toReversed`.\n    *   `array.prototype.tosorted` (Document 6): Polyfill for `Array.prototype.toSorted`.\n\n*   Type Definitions:\n    *   `@types/babel__core` (Document 7): TypeScript definitions for Babel core.\n\n*   Core Functionality:\n    *   `call-bind` (Documents 2, 5, 6):  Binds a function to a specific `this` value.\n\n### Implicit `package.json`\n\nAlthough not directly provided, `package.json` is crucial. It lists the project's dependencies and scripts.  It would contain entries like:\n\njson\n// Example package.json (Hypothetical)\n{\n  \"name\": \"password-generator\",\n  \"version\": \"1.0.0\",\n  \"dependencies\": {\n    \"react\": \"^18.0.0\",\n    \"react-dom\": \"^18.0.0\"\n    // ... other dependencies\n  },\n  \"devDependencies\": {\n    \"esbuild\": \"^0.21.0\",\n    // ... other dev dependencies\n  },\n  \"scripts\": {\n    \"start\": \"react-scripts start\",\n    \"build\": \"react-scripts build\"\n  }\n}\n\n\nSummary:\n\nThe `Password_Generator` project appears to be a React application that uses a range of dependencies for building, bundling, and providing utility functions. The `App.jsx` file contains the core logic for generating passwords based on user-defined criteria (length, character sets). The `package-lock.json` file ensures consistent dependency versions across different environments.",
        "session_id": "5ea1afc2-81f7-4e44-a00a-d86976740ef4"
    }

    const data3 = {
        "response": "Okay, here's some code from the repository, formatted as requested:\n\n### `README.md`\n\nThis file provides a basic overview of the project, including features, installation instructions, and technologies used.\n\n```md\n# Password Generator\n\nA simple and secure password generator built with Vite, React, and Tailwind CSS.\n\n## Features\n\n- Generate random passwords of various lengths\n- Include/exclude uppercase letters, lowercase letters, numbers, and symbols\n- Copy generated password to clipboard\n- Responsive design\n\n## Demo\n\n[Live Demo](https://ateendra24.github.io/Password_Generator/)\n\n## Installation\n\n1. Clone the repository:\n\n   ```bash\n   git clone https://github.com/ateendra24/Password_Generator\n   cd Password_Generator\n\n2. Install dependencies:\n    \n    ```bash\n    npm install\n\n3. Start the development server:    \n\n    ```bash\n    npm run dev\n\nThe application will be available at http://localhost:3000.\n\n## Usage\n1. Open the application in your web browser.\n2. Adjust the password settings using the provided options (length, character types).\n3. Click the \"Generate Password\" button.\n4. Copy the generated password using the \"Copy\" button.\n\n## Technologies Used\n- Vite\n- React\n- Tailwind CSS\n\n## Contributing\nContributions are welcome! Please fork the repository and create a pull request with your changes.\n\n## License\nThis project is licensed under the MIT License. See the LICENSE file for details.\n```\n\n### `src/index.css`\n\nThis file imports the Tailwind CSS directives.\n\n```css\n@tailwind base;\n@tailwind components;\n@tailwind utilities;\n```\n\n### `src/App.jsx`\n\nThis snippet shows the special character input and label.\n\n```jsx\n<input\n  type=\"checkbox\"\n  defaultChecked={charAllowed}\n  id=\"charInput\"\n  onChange={() => {\n    setCharAllowed((prev) => !prev);\n  }}\n/>\n<label htmlFor=\"charInput\">Special Character</label>\n```\n\n### `package-lock.json`\n\nThis file contains dependency information. Here's a snippet showing the entry for `@rollup/rollup-linux-arm64-gnu`:\n\n```json\n\"node_modules/@rollup/rollup-linux-arm64-gnu\": {\"version\": \"4.18.0\", \"resolved\": \"https://registry.npmjs.org/@rollup/rollup-linux-arm64-gnu/-/rollup-linux-arm64-gnu-4.18.0.tgz\", \"integrity\": \"sha512-rJ5D47d8WD7J+7STKdCUAgmQk49xuFrRi9pZkWoRD1UeSMakbcepWXPF8ycChBoAqs1pb2wzvbY6Q33WmN2ftw==\", \"cpu\": [\"arm64\"], \"dev\": true, \"optional\": true, \"os\": [\"linux\"]},\n```\nHere's a snippet showing the entry for `fsevents`:\n```json\n\"node_modules/fsevents\": {\"version\": \"2.3.3\", \"resolved\": \"https://registry.npmjs.org/fsevents/-/fsevents-2.3.3.tgz\", \"integrity\": \"sha512-5xoDfX+fL7faATnagmWPpbFtwh/R77WmMMqqHGS65C3vvB0YHrgF+B1YmZ3441tMj5n63k0212XNoJwzlhffQw==\", \"dev\": true, \"hasInstallScript\": true, \"optional\": true, \"os\": [\"darwin\"], \"engines\": {\"node\": \"^8.16.0 || ^10.6.0 || >=11.0.0\"}},\n```\nHere's a snippet showing the entry for `safe-array-concat`:\n```json\n\"node_modules/safe-array-concat\": {\"version\": \"1.1.2\", \"resolved\": \"https://registry.npmjs.org/safe-array-concat/-/safe-array-concat-1.1.2.tgz\", \"integrity\": \"sha512-vj6RsCsWBCf19jIeHEfkRMw8DPiBb+DMXklQ/1SGDHOMlHdPUkZXFQ2YdplS23zESTijAcurb1aSgJA3AgMu1Q==\", \"dev\": true, \"dependencies\": {\"call-bind\": \"^1.0.7\", \"get-intrinsic\": \"^1.2.4\", \"has-symbols\": \"^1.0.3\", \"isarray\": \"^2.0.5\"}, \"engines\": {\"node\": \">=0.4\"}, \"funding\": {\"url\": \"https://github.com/sponsors/ljharb\"}},\n```\nHere's a snippet showing the entry for `ansi-regex`:\n```json\n\"node_modules/wrap-ansi/node_modules/ansi-regex\": {\"version\": \"6.0.1\", \"resolved\": \"https://registry.npmjs.org/ansi-regex/-/ansi-regex-6.0.1.tgz\", \"integrity\": \"sha512-n5M855fKb2SsfMIiFFoVrABHJC8QtHwVx+mHWP3QcEqBHYienj5dHSgjbxtC0WEZXYt4wcD6zrQElDPhFuZgfA==\", \"dev\": true, \"engines\": {\"node\": \">=12\"}, \"funding\": {\"url\": \"https://github.com/chalk/ansi-regex?sponsor=1\"}},\n```\nHere's a snippet showing the entry for `@types/react`:\n```json\n\"node_modules/@types/react\": {\"version\": \"18.3.3\", \"resolved\": \"https://registry.npmjs.org/@types/react/-/react-18.3.3.tgz\", \"integrity\": \"sha512-hti/R0pS0q1/xx+TsI73XIqk26eBsISZ2R0wUijXIngRK9R/e7Xw/cXVxQK7R5JjW+SV4zGcn5hXjudkN/pLIw==\", \"dev\": true, \"dependencies\": {\"@types/prop-types\": \"*\", \"csstype\": \"^3.0.2\"}},\n```",
        "session_id": "052e5df0-e627-4b9f-89c0-6969422fb041"
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
        <div className='w-full max-w-3xl mx-auto mt-22 px-6 py-12'>
            <ReactMarkdown
                className='AI-message text-sm md:text-base space-y-6'
                components={{
                    code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "");
                        return !inline && match ? (
                            <CodeBlock
                                language={match[1]}
                                value={String(children).trim()}
                            />
                        ) : (
                            <code className={className} {...props}>
                                {children}
                            </code>
                        );
                    },
                }}
            >
                {data3.response}
            </ReactMarkdown>
            <div className='fixed bottom-10 left-1/2 translate-x-[-50%] fixed w-full max-w-3xl'>
                <Textarea className='w-full h-full max-h-44 bg-white dark:bg-[#2f2f2f] border shadow-2xl rounded-3xl px-6 py-4 !text-lg pr-12 resize-none' />
                <Button
                    type="submit"
                    className="w-fit absolute top-3 right-2 rounded-full cursor-pointer"
                >
                    <ArrowUp size={1} />
                </Button>
            </div>
        </div>
    )
}

export default page
