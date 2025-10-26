"use client"
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';
import CodeBlock from '@/components/pages/repopage/CodeBlock';
import Chat from '@/components/pages/repopage/Chat';
import RepoVisualizer from '@/components/pages/repopage/RepoVisualizer';

function page() {

    const data3 = {
        "response": "Okay, here's some code from the repository, formatted as requested:\n\n### `README.md`\n\nThis file provides a basic overview of the project, including features, installation instructions, and technologies used.\n\n```md\n# Password Generator\n\nA simple and secure password generator built with Vite, React, and Tailwind CSS.\n\n## Features\n\n- Generate random passwords of various lengths\n- Include/exclude uppercase letters, lowercase letters, numbers, and symbols\n- Copy generated password to clipboard\n- Responsive design\n\n## Demo\n\n[Live Demo](https://ateendra24.github.io/Password_Generator/)\n\n## Installation\n\n1. Clone the repository:\n\n   ```bash\n   git clone https://github.com/ateendra24/Password_Generator\n   cd Password_Generator\n\n2. Install dependencies:\n    \n    ```bash\n    npm install\n\n3. Start the development server:    \n\n    ```bash\n    npm run dev\n\nThe application will be available at http://localhost:3000.\n\n## Usage\n1. Open the application in your web browser.\n2. Adjust the password settings using the provided options (length, character types).\n3. Click the \"Generate Password\" button.\n4. Copy the generated password using the \"Copy\" button.\n\n## Technologies Used\n- Vite\n- React\n- Tailwind CSS\n\n## Contributing\nContributions are welcome! Please fork the repository and create a pull request with your changes.\n\n## License\nThis project is licensed under the MIT License. See the LICENSE file for details.\n```\n\n### `src/index.css`\n\nThis file imports the Tailwind CSS directives.\n\n```css\n@tailwind base;\n@tailwind components;\n@tailwind utilities;\n```\n\n### `src/App.jsx`\n\nThis snippet shows the special character input and label.\n\n```jsx\n<input\n  type=\"checkbox\"\n  defaultChecked={charAllowed}\n  id=\"charInput\"\n  onChange={() => {\n    setCharAllowed((prev) => !prev);\n  }}\n/>\n<label htmlFor=\"charInput\">Special Character</label>\n```\n\n### `package-lock.json`\n\nThis file contains dependency information. Here's a snippet showing the entry for `@rollup/rollup-linux-arm64-gnu`:\n\n```json\n\"node_modules/@rollup/rollup-linux-arm64-gnu\": {\"version\": \"4.18.0\", \"resolved\": \"https://registry.npmjs.org/@rollup/rollup-linux-arm64-gnu/-/rollup-linux-arm64-gnu-4.18.0.tgz\", \"integrity\": \"sha512-rJ5D47d8WD7J+7STKdCUAgmQk49xuFrRi9pZkWoRD1UeSMakbcepWXPF8ycChBoAqs1pb2wzvbY6Q33WmN2ftw==\", \"cpu\": [\"arm64\"], \"dev\": true, \"optional\": true, \"os\": [\"linux\"]},\n```\nHere's a snippet showing the entry for `fsevents`:\n```json\n\"node_modules/fsevents\": {\"version\": \"2.3.3\", \"resolved\": \"https://registry.npmjs.org/fsevents/-/fsevents-2.3.3.tgz\", \"integrity\": \"sha512-5xoDfX+fL7faATnagmWPpbFtwh/R77WmMMqqHGS65C3vvB0YHrgF+B1YmZ3441tMj5n63k0212XNoJwzlhffQw==\", \"dev\": true, \"hasInstallScript\": true, \"optional\": true, \"os\": [\"darwin\"], \"engines\": {\"node\": \"^8.16.0 || ^10.6.0 || >=11.0.0\"}},\n```\nHere's a snippet showing the entry for `safe-array-concat`:\n```json\n\"node_modules/safe-array-concat\": {\"version\": \"1.1.2\", \"resolved\": \"https://registry.npmjs.org/safe-array-concat/-/safe-array-concat-1.1.2.tgz\", \"integrity\": \"sha512-vj6RsCsWBCf19jIeHEfkRMw8DPiBb+DMXklQ/1SGDHOMlHdPUkZXFQ2YdplS23zESTijAcurb1aSgJA3AgMu1Q==\", \"dev\": true, \"dependencies\": {\"call-bind\": \"^1.0.7\", \"get-intrinsic\": \"^1.2.4\", \"has-symbols\": \"^1.0.3\", \"isarray\": \"^2.0.5\"}, \"engines\": {\"node\": \">=0.4\"}, \"funding\": {\"url\": \"https://github.com/sponsors/ljharb\"}},\n```\nHere's a snippet showing the entry for `ansi-regex`:\n```json\n\"node_modules/wrap-ansi/node_modules/ansi-regex\": {\"version\": \"6.0.1\", \"resolved\": \"https://registry.npmjs.org/ansi-regex/-/ansi-regex-6.0.1.tgz\", \"integrity\": \"sha512-n5M855fKb2SsfMIiFFoVrABHJC8QtHwVx+mHWP3QcEqBHYienj5dHSgjbxtC0WEZXYt4wcD6zrQElDPhFuZgfA==\", \"dev\": true, \"engines\": {\"node\": \">=12\"}, \"funding\": {\"url\": \"https://github.com/chalk/ansi-regex?sponsor=1\"}},\n```\nHere's a snippet showing the entry for `@types/react`:\n```json\n\"node_modules/@types/react\": {\"version\": \"18.3.3\", \"resolved\": \"https://registry.npmjs.org/@types/react/-/react-18.3.3.tgz\", \"integrity\": \"sha512-hti/R0pS0q1/xx+TsI73XIqk26eBsISZ2R0wUijXIngRK9R/e7Xw/cXVxQK7R5JjW+SV4zGcn5hXjudkN/pLIw==\", \"dev\": true, \"dependencies\": {\"@types/prop-types\": \"*\", \"csstype\": \"^3.0.2\"}},\n```",
        "session_id": "052e5df0-e627-4b9f-89c0-6969422fb041"
    }


    return (
        // <div className='flex items-center justify-center w-full'>
        //     <div className='w-full max-w-3xl mx-auto mt-22 px-6 py-12'>
        //         <ReactMarkdown
        //             className='AI-message text-sm md:text-base space-y-6'
        //             components={{
        //                 code({ node, inline, className, children, ...props }) {
        //                     const match = /language-(\w+)/.exec(className || "");
        //                     return !inline && match ? (
        //                         <CodeBlock
        //                             language={match[1]}
        //                             value={String(children).trim()}
        //                         />
        //                     ) : (
        //                         <code className={className} {...props}>
        //                             {children}
        //                         </code>
        //                     );
        //                 },
        //             }}
        //         >
        //             {data3.response}
        //         </ReactMarkdown>
        //         <div className='fixed bottom-10 left-1/2 translate-x-[-50%] w-full max-w-3xl'>
        //             <Textarea className='w-full h-full max-h-44 bg-white dark:bg-[#2f2f2f] border shadow-2xl rounded-3xl px-6 py-4 !text-lg pr-12 resize-none' />
        //             <Button
        //                 type="submit"
        //                 className="w-fit absolute top-3 right-2 rounded-full cursor-pointer"
        //             >
        //                 <ArrowUp size={1} />
        //             </Button>
        //         </div>
        //     </div>


        // </div>

        // <div className='w-full h-dvh'>
        //     <Chat url={"https://github.com/ateendra24/blog"} />
        // </div>

        <RepoVisualizer repoUrl={"https://github.com/ateendra24/realtime-chat-nextjs"} />

    )
}

export default page
