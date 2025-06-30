'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { vs } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Copy } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function CodeBlock({ value, language }: { value: string; language: string }) {
    const [copied, setCopied] = useState(false);
    const { theme } = useTheme();

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset after 2s
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <div className="relative">
            <div className='bg-input p-2 rounded-t-md text-xs'>
                {language}
            </div>
            <SyntaxHighlighter
                language={language}
                style={theme === 'light' ? vs : vscDarkPlus}
                wrapLines={true}
                wrapLongLines={true}
            >
                {value}
            </SyntaxHighlighter>
            <Button onClick={handleCopy} variant={"secondary"} className="absolute gap-1 top-1 right-2 text-xs !px-2 !py-0 h-6 cursor-pointer">
                {copied ? 'Copied!' : <><Copy className='!h-3' /> Copy</>}
            </Button>
        </div>
    );
}
