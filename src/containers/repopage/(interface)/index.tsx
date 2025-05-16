import React, { useState, useEffect, useRef, FormEvent, ChangeEvent } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AnimatedShinyText } from '@/components/magicui/animated-shiny-text';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import SummaryInterface from './(SummaryInterfce)/SummaryInterface';
import MessageWrapper from '@/components/wrappers/MessageWrapper';
import { Copy } from 'lucide-react';
import { toast } from "sonner"
import { isValidElement, ReactNode } from 'react';
import QuickActions from '@/components/pages/repopage/QuickActions';
import SummaryInterface from '@/components/pages/repopage/SummaryInterface';

// Define the message structure
type Message = {
    id: number;
    sender: 'human' | 'ai';
    text: string;
};
type ChatInterfaceProps = {
    url: string;
};

const RepoAnalysis: React.FC<ChatInterfaceProps> = ({ url }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const [activeTab, setActiveTab] = useState('chat');
    const chatContainerRef = useRef<HTMLDivElement | null>(null);
    const [scrollTrigger, setScrollTrigger] = useState<'top' | 'bottom' | null>(null);
    const [showScrollToBottom, setShowScrollToBottom] = useState(false);

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
            scrollToBottom()
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
            const threshold = 120; // pixels from bottom to trigger hiding the button
            const isAtBottom = container.scrollHeight - container.scrollTop - container.clientHeight < threshold;
            setShowScrollToBottom(!isAtBottom);
        };

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
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

        try {
            const chatHistory = messages.map((msg) =>
                msg.sender === 'human' ? { human: msg.text } : { ai: msg.text }
            );

            const response = await axios.post('/api/chat', {
                message: userMessage.text,
                chat_history: chatHistory,
            });

            const aiMessage: Message = {
                id: Date.now() + 1,
                sender: 'ai',
                text: response.data.response,
            };

            setMessages((prev) => [...prev, aiMessage]);
        } catch (error) {
            // console.log("error", error?.response?.data);

            console.error('Error sending message:', error);
            const errorMessage: Message = {
                id: Date.now(),
                sender: 'ai',
                // text: 'Sorry, I encountered an error. Please try again.',
                text: axios.isAxiosError(error) && error.response?.data?.message
                    ? error.response.data.message
                    : 'Sorry, I encountered an error. Please try again.',
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await sendMessage(input);
    };


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
        <>
            <Tabs defaultValue="chat" onValueChange={setActiveTab} className="w-full max-w-6xl mx-auto pt-16 h-[calc(100vh-4rem)] flex flex-col">

                <TabsList className="w-full">
                    <TabsTrigger value="chat">Chat</TabsTrigger>
                    <TabsTrigger value="summary">Summary</TabsTrigger>
                </TabsList>

                <div className="flex flex-col h-full CustomCardHeight shadow-lg overflow-hidden border rounded-xl">
                    <TabsContent value="chat" className="flex-1 overflow-hidden">
                        <Card className="flex relative flex-col w-full dark:bg-[#2a2a2a] gap-0 p-0 h-full">
                            <CardHeader className="p-4 ">
                                <h2 className="text-base md:text-lg font-semibold line-clamp-2">Chat with Repository : {url}</h2>
                            </CardHeader>

                            <CardContent ref={chatContainerRef}
                                className="flex-1 overflow-y-auto scrollbar-thin p-4 bg-gray-50 dark:bg-[#252525]">
                                <div className="space-y-4">
                                    {messages.length === 0 ? (
                                        <div className="text-center text-gray-500 dark:text-gray-400 my-8">
                                            <p>Ask questions about the repository.</p>
                                            <p className="mt-2 text-sm">
                                                Try: "What's the main functionality of this repo?" or "How is the code organized?"
                                            </p>
                                        </div>
                                    ) : (
                                        messages.map((message) => (
                                            <div
                                                key={message.id}
                                                className={`flex ${message.sender === 'human' ? 'justify-end' : 'justify-start'}`}
                                            >
                                                <div
                                                    className={`max-w-[80%] rounded-lg px-4 py-2 ${message.sender === 'human'
                                                        ? 'bg-background rounded-full'
                                                        : ''
                                                        }`}
                                                >
                                                    {message.sender === 'ai' ? (
                                                        <MessageWrapper>
                                                            <div className="AI-message text-sm md:text-base space-y-6">
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
                                                                                        <p>{text}</p>
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
                                                                    {message.text}
                                                                </ReactMarkdown>

                                                            </div>
                                                        </MessageWrapper>
                                                    ) : (
                                                        <p>{message.text}</p>
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    )}
                                    {isLoading && (
                                        <div className="pl-4">
                                            <AnimatedShinyText>Thinking Response...</AnimatedShinyText>
                                        </div>
                                    )}
                                    {/* <div ref={messagesEndRef} /> */}
                                </div>

                            </CardContent>

                            {showScrollToBottom && (
                                <MessageWrapper>
                                    <div className="absolute right-6 bottom-32 z-10">
                                        <Button
                                            size="sm"
                                            className="rounded-full shadow hover:bg-primary/90 transition-all duration-500 cursor-pointer"
                                            onClick={() => {
                                                scrollToBottomSmooth();
                                                setShowScrollToBottom(false);
                                            }}
                                        >
                                            ↓
                                        </Button>
                                    </div>
                                </MessageWrapper>
                            )}
                            <QuickActions sendMessage={sendMessage} isLoading={isLoading} />

                            <CardFooter className="bg-white dark:bg-[#2a2a2a] border p-3 flex flex-col ">
                                <form onSubmit={handleSendMessage} className="flex space-x-2 w-full">
                                    <Input
                                        type="text"
                                        value={input}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                                        placeholder="Ask about the repository..."
                                        className="flex-1"
                                        disabled={isLoading}
                                    />
                                    <Button
                                        type="submit"
                                        className={`px-6 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                        disabled={isLoading}
                                    >
                                        Send
                                    </Button>
                                </form>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    <TabsContent value="summary" className="flex-1 overflow-hidden border rounded-lg">
                        <SummaryInterface url={url} />
                    </TabsContent>
                </div>
            </Tabs>
        </>
    );
};

export default RepoAnalysis;
