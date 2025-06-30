'use client';

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation';
import BaseNavbar from './BaseNavbar';

function Navbar({ className }: { className?: string }) {
    const pathname = usePathname();
    const [isRepoPage, setIsRepoPage] = useState(false);

    useEffect(() => {
        if (pathname?.split('/').length === 3) setIsRepoPage(true)
        else setIsRepoPage(false)
    }, [pathname]);

    if (isRepoPage) return null;

    return <BaseNavbar className={className} />;
}

export default Navbar
