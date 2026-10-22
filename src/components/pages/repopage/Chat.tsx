import React, { useState, useEffect, useRef, FormEvent, ChangeEvent } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import MessageWrapper from '@/components/Wrappers/MessageWrapper';
import { ArrowUp, Check, Copy, Share2, Square, Key } from 'lucide-react';
import QuickActions from '@/components/pages/repopage/QuickActions';
import CodeBlock from '@/components/pages/repopage/CodeBlock';
import { Textarea } from '@/components/ui/textarea';
import { AnimatedShinyText } from '@/components/magicui/animated-shiny-text';
import siteConfig from '@/config/siteConfig';
import Warning from './Warning';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import ApiKeyModal from '@/components/common/ApiKeyModal';
import { getStoredApiKey, API_KEY_EVENT } from '@/lib/apiKey';
import { ThinkingOrb } from 'thinking-orbs';
import { VoiceBeam } from 'voice-glow';

// Define the message structure
type Message = {
    id: number;
    sender: 'human' | 'ai';
    text: string;
};
type ChatInterfaceProps = {
    url: string;
    sessionId?: string;
};

const Chat: React.FC<ChatInterfaceProps> = ({ url, sessionId: initialSessionId }) => {

    const [activeSessionId, setActiveSessionId] = useState<string | undefined>(initialSessionId);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('chat');
    const chatContainerRef = useRef<HTMLDivElement | null>(null);
    const [scrollTrigger, setScrollTrigger] = useState<'top' | 'bottom' | null>(null);
    const [showScrollToBottom, setShowScrollToBottom] = useState(false);
    const [streamingMessageId, setStreamingMessageId] = useState<number | null>(null);
    const abortControllerRef = useRef<AbortController | null>(null);
    const [apiKeyModalOpen, setApiKeyModalOpen] = useState(false);
    const [hasApiKey, setHasApiKey] = useState(false);

    useEffect(() => {
        if (initialSessionId) {
            setActiveSessionId(initialSessionId);
        }
    }, [initialSessionId]);

    useEffect(() => {
        const updateKey = () => {
            setHasApiKey(Boolean(getStoredApiKey()));
        };
        updateKey();
        window.addEventListener(API_KEY_EVENT, updateKey);
        return () => window.removeEventListener(API_KEY_EVENT, updateKey);
    }, []);

    const stopStreaming = () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            abortControllerRef.current = null;
        }
    };

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

            const controller = new AbortController();
            abortControllerRef.current = controller;

            const customApiKey = getStoredApiKey();

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(customApiKey ? { 'x-custom-api-key': customApiKey } : {}),
                },
                body: JSON.stringify({
                    message: userMessage.text,
                    chat_history: chatHistory,
                    session_id: activeSessionId || initialSessionId || undefined,
                    custom_api_key: customApiKey || undefined,
                }),
                credentials: 'include',
                signal: controller.signal,
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                if (response.status === 429 || errorData.isRateLimit) {
                    setApiKeyModalOpen(true);
                }
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
                        let data: any = null;
                        try {
                            data = JSON.parse(line.slice(6));
                        } catch (parseError) {
                            if (line.trim() && !line.includes('session_id')) {
                                console.warn('Failed to parse SSE data:', line);
                            }
                            continue;
                        }

                        if (data) {
                            if (data.session_id) {
                                setActiveSessionId(data.session_id);
                            }

                            if (data.error) {
                                if (data.error.includes('API Key') || data.error.includes('Quota') || data.error.includes('No API Key Provided')) {
                                    setApiKeyModalOpen(true);
                                }
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
                            }

                            if (data.done) {
                                break;
                            }
                        }
                    }
                }
            }
        } catch (error) {
            // If user clicked stop, AbortError is expected — don't show an error message
            if (error instanceof Error && error.name === 'AbortError') {
                // Keep whatever text was streamed so far
            } else {
                console.error('Error sending message:', error);
                const errorText = error instanceof Error ? error.message : 'Sorry, I encountered an error. Please try again.';
                setMessages((prev) =>
                    prev.map((msg) =>
                        msg.id === aiMessageId
                            ? { ...msg, text: errorText }
                            : msg
                    )
                );
            }
        } finally {
            abortControllerRef.current = null;
            setIsLoading(false);
            setStreamingMessageId(null);
        }
    };

    const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await sendMessage(input);
    };

    const [copiedId, setCopiedId] = useState<number | null>(null);
    const handleCopy = async (id: number, value: string) => {
        try {
            await navigator.clipboard.writeText(value);
            setCopiedId(id);
            setTimeout(() => setCopiedId(null), 2000); // Reset after 2s
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleShare = async (text: string) => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: 'AI Code Response',
                    text: text,
                });
            } else {
                // Fallback: copy to clipboard directly
                await navigator.clipboard.writeText(text).catch(() => { });
            }
        } catch (err) {
            // User cancelled share or error
            if ((err as Error).name !== 'AbortError') {
                console.error('Failed to share:', err);
            }
        }
    };

    const meter = useRef(0.25);

    useEffect(() => {
        let animId: number;
        let target = 0.35;
        let lastTime = performance.now();
        let nextBurstTime = lastTime + 500;

        const animate = (time: number) => {
            // Trigger random voice-like energy bursts at variable intervals
            if (time >= nextBurstTime) {
                const isSpike = Math.random() < 0.35;
                target = isSpike
                    ? 0.55 + Math.random() * 0.4   // Dynamic voice bursts (0.55 - 0.95)
                    : 0.15 + Math.random() * 0.3;  // Gentle ambient presence (0.15 - 0.45)

                nextBurstTime = time + 300 + Math.random() * 800;
            }

            const dt = Math.min((time - lastTime) / 1000, 0.1);
            lastTime = time;

            // Organic subtle oscillation
            const oscillation = Math.sin(time * 0.0035) * 0.05 + Math.cos(time * 0.008) * 0.03;
            const currentTarget = Math.max(0.05, Math.min(1, target + oscillation));

            // Fast rise (attack) and gentle fall (release)
            const speed = currentTarget > meter.current ? 7.0 : 3.0;
            meter.current += (currentTarget - meter.current) * Math.min(1, dt * speed);
            meter.current = Math.max(0, Math.min(1, meter.current));

            animId = requestAnimationFrame(animate);
        };

        animId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animId);
    }, []);

    return (
        <div className='relative w-full h-full max-w-4xl mx-auto px-2'>

            {isLoading && messages.length === 2 && (
                <div className="fixed top-0 right-0 w-full md:w-[calc(100%_-_254px)] pointer-events-none -z-10 overflow-hidden rotate-180">
                    <VoiceBeam
                        type="mobile"
                        colorVariant="colorful"
                        theme="auto"
                        level={() => meter.current}
                        scale={1.6}
                        reach={1.8}
                        spread={2.2}
                        bend={50}
                        glowSize={1.4}
                        bloomHeight={1.4}
                        flow={45}
                        strength={0.9}
                        className="w-full rounded-none!"
                    >
                        <div className="w-full h-[400px] md:h-[550px]" />
                    </VoiceBeam>
                </div>
            )}

            <div ref={chatContainerRef} className="h-full pt-28 pb-56 max-h-dvh overflow-y-auto md:px-2">
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
                                className={`flex ${message.sender === 'human' ? 'justify-end pb-8' : 'justify-start pb-4'} group`}
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
                                                    <div className='AI-message text-sm md:text-base space-y-6'>
                                                        <ReactMarkdown
                                                            remarkPlugins={[remarkMath]}
                                                            rehypePlugins={[rehypeKatex]}
                                                            components={{
                                                                code({ node, className, children, ...props }) {
                                                                    const match = /language-(\w+)/.exec(className || "");
                                                                    return match ? (
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
                                                    </div>
                                                    {/* {streamingMessageId === message.id && (
                                                        <motion.span
                                                            className="inline-block w-2 h-4 ml-1 bg-foreground/70 rounded-sm"
                                                            animate={{ opacity: [1, 0, 1] }}
                                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                        />
                                                    )} */}
                                                    {streamingMessageId !== message.id && message.text && (
                                                        <div className='flex items-center gap-1 mt-2'>
                                                            <button
                                                                className='hover:bg-accent rounded-lg p-1.5 cursor-pointer'
                                                                onClick={() => handleCopy(message.id, message.text)}
                                                            >
                                                                {copiedId === message.id ? <Check size={15} /> : <Copy size={15} />}
                                                            </button>
                                                            <button
                                                                className='hover:bg-accent rounded-lg p-1.5 cursor-pointer'
                                                                onClick={() => handleShare(message.text)}
                                                            >
                                                                <Share2 size={15} />
                                                            </button>
                                                        </div>
                                                    )}
                                                </motion.div>
                                            </MessageWrapper>
                                        </>

                                    ) : (
                                        <div className='relative'>
                                            <MessageWrapper>
                                                <p className='px-3'>{message.text}</p>
                                            </MessageWrapper>
                                            <div className='hidden group-hover:flex items-center gap-1 mt-4 absolute right-0'>
                                                <button
                                                    className='hover:bg-accent rounded-lg p-1.5 cursor-pointer'
                                                    onClick={() => handleCopy(message.id, message.text)}
                                                >
                                                    {copiedId === message.id ? <Check size={12} /> : <Copy size={12} />}
                                                </button>
                                                <button
                                                    className='hover:bg-accent rounded-lg p-1.5 cursor-pointer'
                                                    onClick={() => handleShare(message.text)}
                                                >
                                                    <Share2 size={12} />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                )}
                {
                    isLoading && messages[messages.length - 1]?.text === '' && (
                        <div className='flex w-fit gap-2 items-center'>
                            <ThinkingOrb state="listening" size={32} />
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
                        // disabled={isLoading}
                        maxLength={500}
                    />
                    <Button
                        type={isLoading ? 'button' : 'submit'}
                        className="w-fit absolute bottom-14 right-2 rounded-full cursor-pointer"
                        disabled={!isLoading && input.length <= 1}
                        onClick={isLoading ? stopStreaming : undefined}
                    >
                        {isLoading ? (<Square fill='currentColor' size={16} />) : (<ArrowUp size={16} />)}
                    </Button>
                    <QuickActions sendMessage={sendMessage} isLoading={isLoading} />

                </form>

                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground px-4 py-1">
                    <span>{siteConfig.siteName} can make mistakes. Check important info.</span>
                    <button
                        type="button"
                        onClick={() => setApiKeyModalOpen(true)}
                        className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors cursor-pointer font-medium"
                        title={hasApiKey ? 'Custom Gemini API Key Active (Rate limits bypassed)' : 'Use your own Gemini API Key to bypass limits'}
                    >
                        <Key className="w-3.5 h-3.5 text-primary" />
                        <span>{hasApiKey ? 'Custom Key Active' : 'Use Own API Key'}</span>
                        {hasApiKey && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />}
                    </button>
                </div>

            </div>

            <ApiKeyModal open={apiKeyModalOpen} onOpenChange={setApiKeyModalOpen} />
        </div >
    );
};

export default Chat;