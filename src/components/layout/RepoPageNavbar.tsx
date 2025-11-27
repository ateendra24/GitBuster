'use client';

import { SidebarTrigger } from '../ui/sidebar';
import BaseNavbar from './BaseNavbar';

function RepoPageNavbar({ className }: { className?: string }) {
    return (
        <BaseNavbar className={className} position="absolute">
            <SidebarTrigger className="" />
        </BaseNavbar>
    );
}

export default RepoPageNavbar
