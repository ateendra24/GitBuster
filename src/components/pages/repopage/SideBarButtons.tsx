import { SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'

function SideBarButtons() {

    return (
        <div>
            <SidebarTrigger className="hidden md:flex absolute top-[70px] left-1 z-20" />
            <SidebarTrigger className="fixed top-3 left-3 md:hidden z-50" />
        </div>
    )
}

export default SideBarButtons
