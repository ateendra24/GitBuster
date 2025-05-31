import { Card, CardContent, CardHeader } from '@/components/ui/card'
import React from 'react'
import FileTree from './FolderStructure'
import { Loader2 } from 'lucide-react'
import Details from './Details'

function SummaryInterface({ url }: { url: string }) {
    return (
        <Card className="flex flex-col w-full rounded-lg overflow-hidden dark:bg-[#2a2a2a] gap-0 p-0 h-full">
            <CardHeader className="p-4">
                <h2 className="text-base md:text-lg font-semibold">Summary of Repository : {url}</h2>
            </CardHeader>

            <CardContent className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-[#252525] flex gap-3 flex-wrap md:flex-nowrap">
                <FileTree URL={url} />
                <Details URL={url} />
            </CardContent>
        </Card>
    )
}

export default SummaryInterface