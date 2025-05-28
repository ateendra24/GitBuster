import React, { useState, useEffect, useRef, FormEvent, ChangeEvent } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { Button } from '@/components/ui/button';
import MessageWrapper from '@/components/wrappers/MessageWrapper';
import { ArrowUp } from 'lucide-react';
import QuickActions from '@/components/pages/repopage/QuickActions';
import CodeBlock from '@/components/pages/repopage/CodeBlock';
import { Textarea } from '@/components/ui/textarea';
import { AnimatedShinyText } from '@/components/magicui/animated-shiny-text';

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

        try {
            const chatHistory = messages.map((msg) =>
                msg.sender === 'human' ? { human: msg.text } : { ai: msg.text }
            );

            const response = await axios.post(`/api/chat`, {
                message: userMessage.text,
                chat_history: chatHistory,
            }, { withCredentials: true });


            const aiMessage: Message = {
                id: Date.now() + 1,
                sender: 'ai',
                text: response.data.response,
            };

            setMessages((prev) => [...prev, aiMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
            const errorMessage: Message = {
                id: Date.now(),
                sender: 'ai',
                // text: 'Sorry, I encountered an error. Please try again.',
                text: axios.isAxiosError(error) && error.response?.data?.message
                    ? error.response?.data?.message
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


    return (
        <div className='mt-0 relative w-full h-full max-w-4xl mx-auto px-2'>
            <div>
                <div ref={chatContainerRef} className="h-full pt-24 pb-32 max-h-[85dvh] overflow-y-auto space-y-4 md:px-2">
                    {messages.length === 0 ? (
                        <div className="text-center text-gray-500 dark:text-gray-400 my-8">
                            <p>Ask questions about the repository.</p>
                            <p className="mt-2 text-sm">
                                Try: "What's the main functionality of this repo?" or "How is the code organized?"
                            </p>
                        </div>
                    ) : (
                        messages.map((message) => (
                            <div key={message.id} className={`flex ${message.sender === 'human' ? 'justify-end' : 'justify-start'} `}>
                                <div className={`rounded-xl py-2 ${message.sender === 'human' ? 'bg-accent rounded-full max-w-[60%] ' : 'max-w-[90%] '}`}>
                                    {message.sender === 'ai' ? (
                                        <MessageWrapper>
                                            <div className="AI-message text-sm md:text-base space-y-6">
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
                                                    {message.text}
                                                </ReactMarkdown>



                                            </div>
                                        </MessageWrapper>

                                    ) : (
                                        <p className='px-3'>{message.text}</p>

                                    )}
                                </div>
                            </div>
                        ))

                    )}
                    {
                        isLoading && (
                            <div className='mb-32'>
                                <AnimatedShinyText>Thinking Response...</AnimatedShinyText>
                            </div>
                        )
                    }
                </div>

            </div >

            <div className='absolute bg-background z-10 bottom-0 left-1/2 translate-x-[-50%] w-[100%] max-w-4xl'>
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
                <form onSubmit={handleSendMessage}>
                    <Textarea
                        value={input}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}
                        placeholder="Ask about the repository..."
                        className='w-full min-h-10 h-full max-h-40 bg-white dark:bg-[#2f2f2f] border shadow-md rounded-3xl px-6 py-4 !text-base pr-12 resize-none'
                        disabled={isLoading}
                        maxLength={500}
                    />
                    <Button
                        type="submit"
                        className="w-fit absolute bottom-14 right-2 rounded-full cursor-pointer"
                        disabled={isLoading || input.length === 0}
                    >
                        <ArrowUp size={1} />
                    </Button>
                    <QuickActions url={url} sendMessage={sendMessage} isLoading={isLoading} />

                </form>


            </div>
        </div >
    );
};

export default RepoAnalysis;