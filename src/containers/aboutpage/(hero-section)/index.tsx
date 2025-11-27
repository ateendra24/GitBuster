import { motion } from 'framer-motion'
import Link from 'next/link'
import { DotPattern } from '@/components/magicui/dot-pattern'
import { cn } from '@/lib/utils'
import { RainbowButton } from '@/components/magicui/rainbow-button'

function index() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background">
            <DotPattern
                width={20}
                height={20}
                cx={1}
                cy={1}
                cr={1}
                className={cn(
                    "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] ",
                )}
            />

            <div className="relative z-10 container px-4 md:px-6 flex flex-col items-center text-center space-y-8">

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter bg-gradient-to-b from-foreground to-foreground/50 bg-clip-text text-transparent max-w-4xl mx-auto"
                >
                    Chat with your <br className="hidden sm:block" />
                    <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Codebase</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
                >
                    Instantly analyze and understand any GitHub repository.
                    Ask questions, get explanations, and explore your project with AI-powered assistance.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 items-center"
                >
                    <Link href={'/'}>
                        <RainbowButton>
                            Get Started Free
                        </RainbowButton>
                    </Link>
                    {/* <Link href={siteConfig.socialLinks.github} target="_blank" className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors">
                        View on GitHub <span aria-hidden="true">→</span>
                    </Link> */}
                </motion.div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        </section>
    )
}

export default index
