import React from 'react'
import { Circle } from '../icons/Circle'
import Link from 'next/link'
import siteConfig from '@/config/siteConfig'
import Image from 'next/image'

function Footer({ className }: { className?: String }) {
    return (
        <footer className="relative rounded-lg shadow-sm">
            <div className="w-full max-w-screen-xl mx-auto p-8 md:p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <Circle />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">{siteConfig.siteName}</span>
                    </Link>
                    <ul className="flex flex-wrap items-center text-sm font-medium text-gray-500 dark:text-gray-400">
                        <li>
                            <Link href="/about" className="hover:underline me-4 md:me-6">About</Link>
                        </li>
                        <li>
                            <Link href="/privacy" className="hover:underline me-4 md:me-6">Privacy Policy</Link>
                        </li>
                        <li>
                            <Link href="/terms" className="hover:underline me-4 md:me-6">Terms of Service</Link>
                        </li>
                        <li>
                            <Link href="/cookies" className="hover:underline me-4 md:me-6">Cookie Policy</Link>
                        </li>
                        <li>
                            <Link href="/faq" className="hover:underline me-4 md:me-6">FAQs</Link>
                        </li>
                        <li>
                            <Link href={siteConfig.socialLinks.contact} target='_blank' className="hover:underline">Contact</Link>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <div className="flex flex-col sm:flex-row justify-between items-center">
                    <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
                        © {new Date().getFullYear()} {siteConfig.siteName}. All Rights Reserved.
                    </span>
                    <div className="flex gap-4 mt-4 sm:mt-0">
                        <a href={siteConfig.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                            GitHub
                        </a>
                        <a href={siteConfig.socialLinks.x} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                            Twitter
                        </a>
                        <a href={siteConfig.socialLinks.linkedIn} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                            LinkedIn
                        </a>
                    </div>
                </div>
            </div>

            <Image
                width={100}
                height={50}
                alt=''
                src='/mesh.png'
                className='absolute bottom-0 left-0 right-0 mx-auto w-[1100px] h-[100px] lg:h-[120px] object-cover -z-10'
            />
        </footer>
    )
}

export default Footer
