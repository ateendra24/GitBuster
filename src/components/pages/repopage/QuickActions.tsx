import { Button } from '@/components/ui/button'
import React from 'react'

function QuickActions({ sendMessage, isLoading, url }: { sendMessage: (message: string) => void, isLoading: boolean, url: string }) {
    // This component renders a set of buttons that trigger different actions when clicked.
    // Each button sends a specific message to the sendMessage function when clicked.
    return (
        <div className="w-full overflow-x-auto px-3 py-2 font-thin">
            <div className="flex gap-2 whitespace-nowrap">

                <Button
                    className='py-1 px-2 rounded-full text-sm h-fit cursor-pointer font-normal'
                    variant={'outline'}
                    onClick={() => sendMessage("Summary of this repo?")}
                    disabled={isLoading}
                >
                    Summary
                </Button>
                <Button
                    className='py-1 px-2 rounded-full text-sm h-fit cursor-pointer font-normal'
                    variant={'outline'}
                    onClick={() => sendMessage("functionality of this repo?")}
                    disabled={isLoading}
                >
                    functionality
                </Button>
                <Button
                    className='py-1 px-2 rounded-full text-sm h-fit cursor-pointer font-normal'
                    variant={'outline'}
                    onClick={() => sendMessage("How to use this repo")}
                    disabled={isLoading}
                >
                    How to use
                </Button>
                <Button
                    className='py-1 px-2 rounded-full text-sm h-fit cursor-pointer font-normal'
                    variant={'outline'}
                    onClick={() => sendMessage("How to contribute to this repo")}
                    disabled={isLoading}
                >
                    How to contribute
                </Button>
                <Button
                    className='py-1 px-2 rounded-full text-sm h-fit cursor-pointer font-normal'
                    variant={'outline'}
                    onClick={() => sendMessage("How to install this repo")}
                    disabled={isLoading}
                >
                    How to install
                </Button>

            </div>
        </div>
    )
}

export default QuickActions
