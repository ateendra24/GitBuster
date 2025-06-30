'use client'

import FeaturesSection from './(features-section)'
import MissionSection from './(mission-section)'
import HowItWorksSection from './(howitworks-section)'
import CodeSection from './(code-section)'
import ContactSection from './(contact-section)'
import HeroSection from './(hero-section)'

export default function index() {


    return (
        <div >
            <HeroSection />
            <FeaturesSection />
            <MissionSection />
            <HowItWorksSection />
            <CodeSection />
            <ContactSection />
        </div>
    )
}
