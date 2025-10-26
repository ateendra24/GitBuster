import React from 'react'
import { motion } from 'framer-motion'
import siteConfig from '@/config/siteConfig'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Highlighter } from '@/components/magicui/highlighter'

function index() {
    return (
        <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
        >
            {/* Content */}
            <div className="relative z-10 py-16 md:py-20 text-center space-y-8 max-w-4xl mx-auto px-4 md:px-6">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    {siteConfig.siteName}
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    Instantly  <Highlighter action="underline" padding={0} color="#FF9800">chat with your codebase</Highlighter>. Ask questions, get explanations, and explore your project with AI-powered assistance.
                </p>
                <div className="flex justify-center gap-4">
                    <Button asChild>
                        <Link href={'/'}>
                            Try It Now
                        </Link>
                    </Button>
                    {/* <Button variant={'secondary'} asChild>
                        <Link href={siteConfig.socialLinks.github} >
                            View on GitHub
                        </Link>
                    </Button> */}
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </motion.section>
    )
}

export default index
