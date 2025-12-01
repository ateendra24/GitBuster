import React, { useState, useEffect, useRef, FormEvent, ChangeEvent } from 'react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import MessageWrapper from '@/components/Wrappers/MessageWrapper';
import { ArrowUp, Check, Copy, Square } from 'lucide-react';
import QuickActions from '@/components/pages/repopage/QuickActions';
import CodeBlock from '@/components/pages/repopage/CodeBlock';
import { Textarea } from '@/components/ui/textarea';
import { AnimatedShinyText } from '@/components/magicui/animated-shiny-text';
import siteConfig from '@/config/siteConfig';
import Warning from './Warning';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

// Define the message structure
type Message = {
    id: number;
    sender: 'human' | 'ai';
    text: string;
};
type ChatInterfaceProps = {
    url: string;
};

const Chat: React.FC<ChatInterfaceProps> = ({ url }) => {

    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('chat');
    const chatContainerRef = useRef<HTMLDivElement | null>(null);
    const [scrollTrigger, setScrollTrigger] = useState<'top' | 'bottom' | null>(null);
    const [showScrollToBottom, setShowScrollToBottom] = useState(false);
    const [streamingMessageId, setStreamingMessageId] = useState<number | null>(null);

    // Scroll to bottom of chat
    const scrollToBottom = () => {
        const el = chatContainerRef.current;
        if (el) {
            el.scrollTo({
                top: el.scrollHeight,
            });
        }
    };

    // Scroll to bottom of chat Smoothly
    const scrollToBottomSmooth = () => {
        const el = chatContainerRef.current;
        if (el) {
            el.scrollTo({
                top: el.scrollHeight,
                behavior: 'smooth',
            });
        }
    };

    // Scroll on new messages
    useEffect(() => {
        if (scrollTrigger === 'bottom') {
            scrollToBottomSmooth()
        } else if (scrollTrigger === 'top') {
            scrollToTop()
        }
        // Reset scroll trigger after action
        setScrollTrigger(null)
    }, [messages, scrollTrigger])

    // Scroll to top of chat
    const scrollToTop = () => {
        const el = chatContainerRef.current;
        if (el) {
            el.scrollTo({ top: 0 });
        }
    };

    // Scroll when switching back to the chat tab
    useEffect(() => {
        if (activeTab === 'chat') {
            setTimeout(() => {
                scrollToBottom();
            }, 0);
        }
    }, [activeTab]);


    useEffect(() => {
        const container = chatContainerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const threshold = 120;
            const isAtBottom =
                container.scrollHeight - container.scrollTop - container.clientHeight < threshold;
            setShowScrollToBottom(!isAtBottom);
        };

        container.addEventListener("scroll", handleScroll);
        return () => container.removeEventListener("scroll", handleScroll);
    }, [messages]);


    const sendMessage = async (messageText: string) => {
        if (!messageText.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now(),
            sender: 'human',
            text: messageText,
        };

        setScrollTrigger('bottom'); // Scroll after user message
        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        // Create placeholder AI message for streaming
        const aiMessageId = Date.now() + 1;
        const aiMessage: Message = {
            id: aiMessageId,
            sender: 'ai',
            text: '',
        };
        setMessages((prev) => [...prev, aiMessage]);
        setStreamingMessageId(aiMessageId);

        try {
            const chatHistory = messages.map((msg) =>
                msg.sender === 'human' ? { human: msg.text } : { ai: msg.text }
            );

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: userMessage.text,
                    chat_history: chatHistory,
                }),
                credentials: 'include',
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Failed to send message');
            }

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();

            if (!reader) {
                throw new Error('No response body');
            }

            let accumulatedText = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                const lines = chunk.split('\n');

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        try {
                            const data = JSON.parse(line.slice(6));

                            if (data.error) {
                                throw new Error(data.error);
                            }

                            if (data.token) {
                                accumulatedText += data.token;
                                // Update the AI message with accumulated text
                                setMessages((prev) =>
                                    prev.map((msg) =>
                                        msg.id === aiMessageId
                                            ? { ...msg, text: accumulatedText }
                                            : msg
                                    )
                                );
                                // Don't auto-scroll during streaming - let user control scroll
                            }

                            if (data.done) {
                                // Streaming complete
                                break;
                            }
                        } catch (parseError) {
                            // Skip invalid JSON lines
                            if (line.trim() && !line.includes('session_id')) {
                                console.warn('Failed to parse SSE data:', line);
                            }
                        }
                    }
                }
            }
        } catch (error) {
            console.error('Error sending message:', error);
            const errorText = error instanceof Error ? error.message : 'Sorry, I encountered an error. Please try again.';
            // Update the AI message with error
            setMessages((prev) =>
                prev.map((msg) =>
                    msg.id === aiMessageId
                        ? { ...msg, text: errorText }
                        : msg
                )
            );
        } finally {
            setIsLoading(false);
            setStreamingMessageId(null);
        }
    };

    const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await sendMessage(input);
    };

    const [copied, setCopied] = useState(false);
    const handleCopy = async (value: string) => {
        try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset after 2s
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };


    return (
        <div className='relative w-full h-full max-w-4xl mx-auto px-2'>
            <div ref={chatContainerRef} className="h-full pt-28 pb-56 max-h-dvh overflow-y-auto space-y-4 md:px-2">
                {messages.length === 0 ? (
                    <div className="text-center text-gray-500 dark:text-gray-400 my-8">
                        <p>Ask questions about the repository.</p>
                        <p className="mt-2 text-sm">
                            Try: &quot;What&apos;s the main functionality of this repo?&quot; or &quot;How is the code organized?&quot;
                        </p>
                    </div>
                ) : (
                    <AnimatePresence mode="popLayout">
                        {messages.map((message) => (
                            <motion.div
                                key={message.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                layout
                                className={`flex ${message.sender === 'human' ? 'justify-end' : 'justify-start'} `}
                            >
                                <div className={`rounded-xl py-2 ${message.sender === 'human' ? 'bg-accent rounded-full max-w-[60%] ' : 'max-w-[90%] '}`}>
                                    {message.sender === 'ai' ? (
                                        <>
                                            <MessageWrapper>
                                                <motion.div
                                                    className={`AI-message text-sm md:text-base`}
                                                    layout="position"
                                                    transition={{ duration: 0.15, ease: "easeOut" }}
                                                >
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
                                                                    <code className={`bg-muted relative rounded-md px-[0.3rem] py-[0.1rem] ${className}`} {...props}>
                                                                        {children}
                                                                    </code>
                                                                );
                                                            },
                                                            a: ({ node, ...props }) => (
                                                                <Tooltip>
                                                                    <TooltipTrigger> <a
                                                                        className="hover:underline"
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        {...props}
                                                                    /></TooltipTrigger>
                                                                    <TooltipContent>
                                                                        <p>Open Link</p>
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            ),
                                                        }}
                                                    >
                                                        {message.text}
                                                    </ReactMarkdown>
                                                    {/* {streamingMessageId === message.id && (
                                                        <motion.span
                                                            className="inline-block w-2 h-4 ml-1 bg-foreground/70 rounded-sm"
                                                            animate={{ opacity: [1, 0, 1] }}
                                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                        />
                                                    )} */}
                                                    <AnimatePresence>
                                                        {streamingMessageId !== message.id && message.text && (
                                                            <motion.button
                                                                initial={{ opacity: 0, scale: 0.8 }}
                                                                animate={{ opacity: 1, scale: 1 }}
                                                                exit={{ opacity: 0, scale: 0.8 }}
                                                                transition={{ duration: 0.2 }}
                                                                className='hover:bg-accent rounded-lg p-1.5 mt-2 cursor-pointer'
                                                                onClick={() => handleCopy(message.text)}
                                                            >
                                                                {copied ? <Check size={15} /> : <Copy size={15} />}
                                                            </motion.button>
                                                        )}
                                                    </AnimatePresence>
                                                </motion.div>
                                            </MessageWrapper>
                                        </>

                                    ) : (
                                        <MessageWrapper>
                                            <p className='px-3'>{message.text}</p>
                                        </MessageWrapper>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                )}
                {
                    isLoading && messages[messages.length - 1]?.text === '' && (
                        <div>
                            <AnimatedShinyText>Thinking...</AnimatedShinyText>
                        </div>
                    )
                }
            </div>

            <div className='absolute bg-background/50 backdrop-blur-sm z-10 bottom-0 pb-2 left-1/2 translate-x-[-50%] w-full max-w-4xl rounded-t-3xl'>
                {
                    showScrollToBottom && (
                        <MessageWrapper>
                            <div className="absolute left-1/2 translate-x-[-50%] -top-16 z-50">
                                <Button
                                    size="sm"
                                    className="rounded-full shadow-lg hover:bg-primary/90 transition-all duration-500 cursor-pointer"
                                    onClick={() => {
                                        scrollToBottomSmooth();
                                    }}
                                >
                                    ↓
                                </Button>
                            </div>
                        </MessageWrapper>
                    )
                }

                {messages.length == 0 && (
                    <Warning />
                )}

                <form onSubmit={handleSendMessage} className='relative'>
                    <Textarea
                        value={input}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}
                        onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                if (input.trim() && !isLoading) {
                                    sendMessage(input);
                                }
                            }
                        }}
                        placeholder="Ask about the repository..."
                        className='w-full min-h-10 h-full max-h-40 bg-white/30 dark:bg-[#2f2f2f]/30 border shadow-md rounded-3xl px-6 py-4 !text-base pr-12 resize-none'
                        disabled={isLoading}
                        maxLength={500}
                    />
                    <Button
                        type="submit"
                        className="w-fit absolute bottom-14 right-2 rounded-full cursor-pointer"
                        disabled={isLoading || input.length <= 1}
                    >
                        {isLoading ? (<Square fill='currentColor' size={1} />) : (<ArrowUp size={1} />)}
                    </Button>
                    <QuickActions sendMessage={sendMessage} isLoading={isLoading} />

                </form>

                <div className="text-center text-xs text-gray-500 dark:text-gray-400 px-4">
                    {siteConfig.siteName} can make mistakes. Check important info.
                </div>

            </div>
        </div >
    );
};

export default Chat;