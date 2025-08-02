'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'
import Link from 'next/link'
import siteConfig from '@/config/siteConfig'
import { Circle } from '@/components/icons/Circle'
import PageWrapper from '@/components/Wrappers/PageWrapper'
import { GithubSignInButton } from '@/components/GithubSignInButton'

export default function SignInPage() {

    return (
        <PageWrapper className="flex items-center justify-center">
            <div id="clerk-captcha" className="hidden" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >

                <Card className="border bg-sidebar shadow-md">
                    <CardHeader className="text-center space-y-5">
                        {/* Site branding */}
                        <div className="flex items-center justify-center gap-2">
                            <h1 className="text-3xl font-bold tracking-tight">
                                {siteConfig.siteName}
                            </h1>
                            <Circle />
                        </div>

                        <div>
                            <CardTitle className="text-xl font-semibold">
                                Welcome to {siteConfig.siteName}
                            </CardTitle>
                            <CardDescription className="text-base text-muted-foreground mt-1 px-4">
                                Sign in with GitHub to access premium features and higher limits
                            </CardDescription>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-6 px-6 pb-6">

                        <div className="mt-4 rounded-md bg-muted/30 px-3 py-2 text-xs text-muted-foreground text-center">
                            Sign in with Github for higher limits and better experience
                        </div>

                        <div className='space-y-2'>
                            {/* Sigin up button */}
                            <GithubSignInButton className='w-full cursor-pointer text-md' />

                            {/* Additional info */}
                            <p className="text-xs text-center text-muted-foreground">
                                By signing in, you agree to our{' '}
                                <Link href="/terms" className="underline hover:text-foreground">
                                    Terms of Service
                                </Link>{' '}
                                and{' '}
                                <Link href="/privacy" className="underline hover:text-foreground">
                                    Privacy Policy
                                </Link>
                            </p>
                        </div>

                    </CardContent>
                </Card>

                <div className="text-center mt-2">
                    <p className="text-sm text-muted-foreground">
                        New users will automatically be registered with GitHub
                    </p>
                </div>
            </motion.div>
        </PageWrapper>
    )
}
