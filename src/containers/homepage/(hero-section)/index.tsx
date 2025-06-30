import React from 'react'
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
