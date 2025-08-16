"use client"

import { ShineBorder } from '@/components/magicui/shine-border';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Loader2, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function InputSection() {
    const [url, setUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter()
    let normalizedUrl = url;
    // Remove protocol if present
    normalizedUrl = normalizedUrl.replace(/^(?:https?:\/\/)?/i, '');
    // Remove www. if present
    normalizedUrl = normalizedUrl.replace(/^www\./i, '');
    // Remove domain if it's github.com
    normalizedUrl = normalizedUrl.replace(/^github\.com\//i, '');
    // Remove trailing slash
    normalizedUrl = normalizedUrl.replace(/\/$/, '');

    const parts = normalizedUrl.split('/');
    const username = parts[0] || '';
    const repo = parts[1] || '';

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setError('');

        if (!url) {
            setError('Please enter a GitHub repository URL');
            return;
        }

        if (!url.includes('github.com')) {
            setError('Please enter a valid GitHub URL');
            return;
        }

        setIsLoading(true);
        router.push(`/${username}/${repo}`)

    };

    return (
        <>
            <Card className="w-full relative max-w-2xl p-0 rounded-full shadow-lg">

                <ShineBorder shineColor={["#9E7AFF", "#FE8BBB"]} borderWidth={2} />

                <CardContent className='p-0 rounded-full bg-background'>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="m-0">
                            <Input
                                id="repo-url"
                                type="text"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="https://github.com/username/repo"
                                disabled={isLoading}
                                className='rounded-full w-full h-14 text-center focus-visible:ring-0 focus:border-0 border-0 text-sm sm:text-base md:text-lg'
                            />
                        </div>

                        {error && (
                            <p className="absolute text-sm text-red-500 -bottom-10 left-3">{error}</p>
                        )}

                        <Button
                            type="submit"
                            className="w-fit absolute top-[10px] right-2 rounded-full cursor-pointer"
                            disabled={isLoading || !url}
                        >
                            {isLoading ? (
                                <Loader2 className='animate-spin' />
                            ) :
                                (
                                    <Search />
                                )}
                        </Button>
                    </form>


                </CardContent>
            </Card>
        </>
    )
}

export default InputSection
