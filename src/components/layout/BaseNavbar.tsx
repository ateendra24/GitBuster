'use client';

import React, { useState, useEffect } from 'react'
import { useTheme } from "next-themes"
import { Menu, Moon, Sun, Key } from 'lucide-react';
import Link from 'next/link';
import siteConfig from '@/config/siteConfig';
import Github from '../icons/Github';
import X from '../icons/X';
import { motion } from 'framer-motion'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import ApiKeyModal from '../common/ApiKeyModal';
import { getStoredApiKey, API_KEY_EVENT } from '@/lib/apiKey';

interface BaseNavbarProps {
    className?: string;
    children?: React.ReactNode;
    position?: 'fixed' | 'absolute';
}

function BaseNavbar({ className, children, position = 'fixed' }: BaseNavbarProps) {
    const { setTheme, theme } = useTheme()
    const [mounted, setMounted] = React.useState(false)
    const [apiKeyModalOpen, setApiKeyModalOpen] = useState(false)
    const [hasApiKey, setHasApiKey] = useState(false)

    React.useEffect(() => {
        setMounted(true)
        const checkKey = () => {
            setHasApiKey(Boolean(getStoredApiKey()));
        };
        checkKey();
        window.addEventListener(API_KEY_EVENT, checkKey);
        return () => window.removeEventListener(API_KEY_EVENT, checkKey);
    }, [])

    const navbarData = [
        { name: 'About', href: '/about' },
        { name: 'FAQs', href: '/faq' },
    ]

    return (
        <motion.section
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className={`space-y-10 ${position} z-40 top-0 left-[50%] translate-x-[-50%] w-full max-w-full bg-opacity-50 backdrop-blur-2xl border-b shadow ${className}`}
        >
            <nav className={`relative w-[100%] max-w-[1440px] mx-auto py-3 px-6 flex justify-between items-center`}>
                <div className='flex space-x-4 items-center'>
                    {children}
                    <Link href='/' className='font-bold'>{siteConfig.siteName} <span className='text-lg font-normal'>ᵇᵉᵗᵃ</span></Link>
                    {/* <Link href='/about' className='opacity-70 hover:opacity-100 hidden md:inline-block'>About</Link> */}
                    {/* <Link href='/faq' className='opacity-70 hover:opacity-100 hidden md:inline-block'>FAQs</Link> */}
                    {navbarData.map((item, index) => (
                        <Link key={index} href={item.href} className='opacity-70 hover:opacity-100 hidden md:inline-block'>
                            {item.name}
                        </Link>
                    ))}
                </div>

                <div className='flex items-center gap-1 md:gap-2'>
                    {/* <a href={siteConfig.socialLinks.github} target='_blank' >
                        <RainbowButton className='py-0 px-4 h-9 text-sm hidden lg:flex gap-2 items-center'>
                            <Github color='black' /> Github
                        </RainbowButton>
                    </a> */}

                    <button
                        onClick={() => setApiKeyModalOpen(true)}
                        className={`relative p-1.5 hover:bg-accent rounded-xl cursor-pointer flex items-center gap-1.5 transition-colors ${hasApiKey ? 'text-foreground font-medium' : 'opacity-70 hover:opacity-100'}`}
                        title={hasApiKey ? 'Custom Gemini API Key Active' : 'Configure Gemini API Key'}
                        aria-label="Configure Gemini API Key"
                    >
                        <Key className="h-[20px] w-[20px]" strokeWidth={1.5} />
                        {hasApiKey && (
                            <span className="relative flex h-2 w-2 -ml-0.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                        )}
                    </button>

                    <button
                        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                        className='p-1.5 hover:bg-accent rounded-xl cursor-pointer'
                        aria-label="Toggle theme"
                    >
                        {mounted && theme === "dark" ? (
                            <Moon className="h-[22px] w-[22px]" strokeWidth={1.5} />
                        ) : (
                            <Sun className="h-[22px] w-[22px]" strokeWidth={1.5} />
                        )}
                    </button>

                    <a href={siteConfig.socialLinks.x} target='_blank' className='h-auto p-1.5 hover:bg-accent rounded-xl hidden md:inline-block'>
                        <X />
                    </a>

                    <a href={siteConfig.socialLinks.github} target='_blank' className='h-auto p-1.5 hover:bg-accent rounded-xl hidden md:inline-block'>
                        <Github />
                    </a>

                    <div className='md:hidden'>
                        <DropdownMenu>
                            <DropdownMenuTrigger className='p-1.5 hover:bg-accent rounded-xl'><Menu /></DropdownMenuTrigger>
                            <DropdownMenuContent className='mr-3'>
                                <DropdownMenuItem onClick={() => setApiKeyModalOpen(true)} className="flex items-center justify-between cursor-pointer">
                                    <span className="flex items-center gap-2"><Key className="w-4 h-4" /> API Key</span>
                                    {hasApiKey && <span className="h-2 w-2 rounded-full bg-emerald-500" />}
                                </DropdownMenuItem>
                                {navbarData.map((item, index) => (
                                    <DropdownMenuItem key={index} asChild>
                                        <Link href={item.href}>{item.name}</Link>
                                    </DropdownMenuItem>
                                ))}
                                <DropdownMenuItem asChild><a href={siteConfig.socialLinks.github} target='_blank'>Github</a></DropdownMenuItem>
                                <DropdownMenuItem asChild><a href={siteConfig.socialLinks.x} target='_blank'>X</a></DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                </div>
            </nav>

            <ApiKeyModal open={apiKeyModalOpen} onOpenChange={setApiKeyModalOpen} />
        </motion.section>
    )
}

export default BaseNavbar;