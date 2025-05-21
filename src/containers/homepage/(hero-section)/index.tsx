import { AnimatedShinyText } from '@/components/magicui/animated-shiny-text'
import siteConfig from '@/config/siteConfig'
import { cn } from '@/lib/utils'
import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Circle } from '../../../components/icons/Circle'
import Introducing from '@/components/pages/homepage/Introducing'
import TitleDesc from '@/components/pages/homepage/TitleDesc'

function HeroSection() {
    return (
        <div className='pb-8 text-center max-w-xl space-y-1.5'>
            <Introducing />
            <TitleDesc />
        </div>
    )
}

export default HeroSection
