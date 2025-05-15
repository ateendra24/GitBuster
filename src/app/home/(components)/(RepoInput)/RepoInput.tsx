'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import axios from 'axios';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
const MagicCard = dynamic(() => import("@/components/magicui/magic-card"), {
    ssr: false,
}); import { useTheme } from "next-themes"
import { Loader2, Search } from 'lucide-react';
import { ShineBorder } from '@/components/magicui/shine-border';
import HeroSection from './(components)/HeroSection';
import { toast } from 'sonner';

type RepoInputProps = {
    onProcessed: () => void;
    onUrlChange: (url: string) => void;
};

const RepoInput = ({ onProcessed, onUrlChange }: RepoInputProps) => {
    const [url, setUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

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

        try {
            const response = await axios.post('/api/process-repo', { url });
            if (response.status === 200) {
                onProcessed();
                onUrlChange(url);
            }
        } catch (error: any) {
            console.error('Error processing repository:', error);
            toast.error(error?.response?.data?.message || 'Error processing repository');
            setError(error?.response?.data?.message || 'Error processing repository');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>

            <HeroSection />

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
                            <p className="absolute text-sm text-red-500 -bottom-12 left-3">{error}</p>
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
            </Card >
        </>
    );
};

export default RepoInput;

