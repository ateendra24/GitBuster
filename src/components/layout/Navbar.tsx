// 'use client';

// import React, { useEffect, useState } from 'react'
// import { useTheme } from "next-themes"
// import { Moon, Sun } from 'lucide-react';
// import { RainbowButton } from '../magicui/rainbow-button';
// import Link from 'next/link';
// import siteConfig from '@/config/siteConfig';
// import Github from '../icons/Github';
// import X from '../icons/X';
// import { motion } from 'framer-motion'

// function Navbar() {
//     const { setTheme, theme } = useTheme()

//     const [showBorder, setShowBorder] = useState(false);
//     const [lastScrollY, setLastScrollY] = useState(0);

//     useEffect(() => {
//         if (typeof window !== 'undefined') {
//             const handleScroll = () => {
//                 const currentScrollY = window.scrollY;
//                 if (currentScrollY > 30) {
//                     setShowBorder(true);
//                 } else {
//                     setShowBorder(false);
//                 }
//             };

//             window.addEventListener('scroll', handleScroll);
//             return () => {
//                 window.removeEventListener('scroll', handleScroll);
//             };
//         }
//     }, [lastScrollY]);

//     return (
//         <>
//             <motion.section
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 1 }}
//                 viewport={{ once: true }}
//                 className="space-y-10 fixed z-50 top-3 left-[50%] translate-x-[-50%] w-[90%] max-w-7xl"
//             >
//                 <nav className={`relative w-[100%] max-w-7xl py-3 px-6 flex justify-between items-center rounded-full bg-opacity-50 backdrop-blur-2xl ${showBorder ? 'border shadow-lg dark:shadow-red' : 'border border-[#00000000]'}`}>
//                     <div className='space-x-6'>
//                         <Link href='/' className='font-bold'>{siteConfig.siteName} <span className='text-lg font-normal'>ᵇᵉᵗᵃ</span></Link>
//                         <Link href='/about' className='opacity-70 hover:opacity-100 hidden md:inline-block'>About</Link>
//                     </div>

//                     <div className='flex items-center gap-1 md:gap-2'>
//                         <RainbowButton className='py-0 px-4 h-9 text-sm hidden md:flex gap-2 items-center'> <Github color='black' /> Star on Github</RainbowButton>

//                         <a href={siteConfig.socialLinks.x} target='_blank' className='h-auto p-1.5 hover:bg-gray-200 dark:hover:bg-[#353535] rounded-md'>
//                             <X />
//                         </a>

//                         <a href={siteConfig.socialLinks.github} target='_blank' className='h-auto p-1.5 hover:bg-gray-200 dark:hover:bg-[#353535] rounded-md'>
//                             <Github />
//                         </a>

//                         {theme === "light" ? (
//                             <button onClick={() => setTheme("dark")} className='p-1.5 hover:bg-gray-200 rounded-md cursor-pointer'>
//                                 <Sun className="h-[22px] w-[22px]" />
//                             </button>
//                         ) : (
//                             <button onClick={() => setTheme("light")} className='p-1.5 hover:bg-[#353535] rounded-md cursor-pointer'>
//                                 <Moon className="h-[22px] w-[22px]" />
//                             </button>
//                         )}

//                     </div>

//                 </nav>
//             </motion.section>
//         </>
//     )
// }

// export default Navbar




'use client';

import React from 'react'
import { useTheme } from "next-themes"
import { Moon, Sun } from 'lucide-react';
import { RainbowButton } from '../magicui/rainbow-button';
import Link from 'next/link';
import siteConfig from '@/config/siteConfig';
import Github from '../icons/Github';
import X from '../icons/X';
import { motion } from 'framer-motion'

function Navbar() {
    const { setTheme, theme } = useTheme()

    return (
        <>
            <motion.section
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="space-y-10 fixed z-50 top-0 left-[50%] translate-x-[-50%] w-full max-w-full bg-opacity-50 backdrop-blur-3xl border-b shadow"
            >
                <nav className={`relative w-[100%] max-w-7xl mx-auto py-3 px-6 flex justify-between items-center`}>
                    <div className='space-x-6'>
                        <Link href='/' className='font-bold'>{siteConfig.siteName} <span className='text-lg font-normal'>ᵇᵉᵗᵃ</span></Link>
                        <Link href='/about' className='opacity-70 hover:opacity-100 hidden md:inline-block'>About</Link>
                    </div>

                    <div className='flex items-center gap-1 md:gap-2'>
                        <RainbowButton className='py-0 px-4 h-9 text-sm hidden md:flex gap-2 items-center'> <Github color='black' /> Star on Github</RainbowButton>

                        <a href={siteConfig.socialLinks.x} target='_blank' className='h-auto p-1.5 hover:bg-gray-200 dark:hover:bg-[#353535] rounded-md'>
                            <X />
                        </a>

                        <a href={siteConfig.socialLinks.github} target='_blank' className='h-auto p-1.5 hover:bg-gray-200 dark:hover:bg-[#353535] rounded-md'>
                            <Github />
                        </a>

                        {theme === "light" ? (
                            <button onClick={() => setTheme("dark")} className='p-1.5 hover:bg-gray-200 rounded-md cursor-pointer'>
                                <Sun className="h-[22px] w-[22px]" />
                            </button>
                        ) : (
                            <button onClick={() => setTheme("light")} className='p-1.5 hover:bg-[#353535] rounded-md cursor-pointer'>
                                <Moon className="h-[22px] w-[22px]" />
                            </button>
                        )}

                    </div>

                </nav>
            </motion.section>
        </>
    )
}

export default Navbar
