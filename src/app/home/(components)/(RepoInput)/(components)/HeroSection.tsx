import { AnimatedShinyText } from '@/components/magicui/animated-shiny-text'
import siteConfig from '@/config/siteConfig'
import { cn } from '@/lib/utils'
import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Circle } from '../../../../../../public/Circle'

function HeroSection() {
    return (
        <div className='pb-8 text-center max-w-xl space-y-1.5'>
            <Link href={'/about'} className="flex items-center justify-center pb-2">
                <div
                    className={cn(
                        "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",
                    )}
                >
                    <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                        <span className='text-sm'>✨ Introducing {siteConfig.siteName}</span>
                        <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                    </AnimatedShinyText>
                </div>
            </Link>

            <h1 className='text-2xl md:text-3xl lg:text-4xl font-extrabold flex items-center justify-center gap-2'>
                {siteConfig.siteName} <Circle />
            </h1>
            <h2 className='text-xl md:text-2xl lg:text-3xl font-bold'>{siteConfig.tagline}</h2>
            <p className='opacity-60 text-sm md:text-md lg:text-base'>
                {siteConfig.description}
            </p>
        </div>
    )
}

export default HeroSection
