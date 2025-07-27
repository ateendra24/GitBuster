"use client"
import { Button } from "@/components/ui/button"
import siteConfig from "@/config/siteConfig"
import { X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { motion } from 'framer-motion';

function Warning() {
    // This component displays a warning message with links to terms, privacy policy, and cookie preferences.
    // It also includes a close button to dismiss the warning.
    const [visible, setVisible] = useState(true)
    const fadeInVariants = {
        initial: { opacity: 0, y: 20 },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                delay: 1
            }
        },
        exit: {
            opacity: 0,
            y: 20,
            transition: {
                duration: 0.5
            }
        },
    };

    if (!visible) return null

    return (
        <motion.div
            key="input"
            variants={fadeInVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className=""
        >
            <div className='flex gap-0 md:gap-3 lg:gap-6 justify-between w-full mb-3 border px-5 py-4 rounded-3xl bg-primary-foreground'>
                <p className="text-xs sm:text-sm text-muted-foreground">
                    By messaging {siteConfig.siteName}, you agree to our{' '}
                    <Link href="/terms" target='_blank' className="underline hover:text-gray-700 dark:hover:text-gray-300">
                        Terms
                    </Link>{' '}
                    and have read our{' '}
                    <Link href="/privacy" target='_blank' className="underline hover:text-gray-700 dark:hover:text-gray-300">
                        Privacy Policy
                    </Link>
                    . See{' '}
                    <Link href="/cookies" target='_blank' className="underline hover:text-gray-700 dark:hover:text-gray-300">
                        Cookie Preferences
                    </Link>
                    . Don&apos;t share sensitive info. {' '}
                    <Link href="/faq" target='_blank' className="underline hover:text-gray-700 dark:hover:text-gray-300">
                        Learn more
                    </Link>
                </p>
                <Button variant="ghost" size="icon" className="cursor-pointer rounded-full" onClick={() => setVisible(false)}>
                    <X className="!w-5 !h-5" />
                </Button>
            </div>
        </motion.div>
    )
}

export default Warning
