import { Button } from '@/components/ui/button'
import React from 'react'

function QuickActions({ sendMessage, isLoading }: { sendMessage: (message: string) => void, isLoading: boolean }) {
    // This component renders a set of buttons that trigger different actions when clicked.
    // Each button sends a specific message to the sendMessage function when clicked.
    return (
        <div className='w-full flex gap-2 justify-end px-3 py-2 font-thin overflow-x-auto'>
            <Button
                className='py-0 px-2 rounded-full text-sm h-fit py-1 cursor-pointer font-normal'
                variant={'outline'}
                onClick={() => sendMessage("functionality of this repo?")}
                disabled={isLoading}
            >
                functionality
            </Button>
            <Button
                className='py-0 px-2 rounded-full text-sm h-fit py-1 cursor-pointer font-normal'
                variant={'outline'}
                onClick={() => sendMessage("folder structure of this repo")}
                disabled={isLoading}
            >
                folder structure
            </Button>
            <Button
                className='py-0 px-2 rounded-full text-sm h-fit py-1 cursor-pointer font-normal'
                variant={'outline'}
                onClick={() => sendMessage("Summary of this repo")}
                disabled={isLoading}
            >
                Summary
            </Button>
            <Button
                className='py-0 px-2 rounded-full text-sm h-fit py-1 cursor-pointer font-normal'
                variant={'outline'}
                onClick={() => sendMessage("How to use this repo")}
                disabled={isLoading}
            >
                How to use this repo
            </Button>
            <Button
                className='py-0 px-2 rounded-full text-sm h-fit py-1 cursor-pointer font-normal'
                variant={'outline'}
                onClick={() => sendMessage("How to contribute to this repo")}
                disabled={isLoading}
            >
                How to contribute
            </Button>

        </div>
    )
}

export default QuickActions
