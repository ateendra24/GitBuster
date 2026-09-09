"use client"

import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Key, Eye, EyeOff, Check, ExternalLink, ShieldAlert, Sparkles, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { getStoredApiKey, setStoredApiKey, removeStoredApiKey, API_KEY_EVENT } from '@/lib/apiKey';

interface ApiKeyModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function ApiKeyModal({ open, onOpenChange }: ApiKeyModalProps) {
    const [apiKey, setApiKey] = useState('');
    const [showKey, setShowKey] = useState(false);
    const [hasKey, setHasKey] = useState(false);
    const [maskedKey, setMaskedKey] = useState('');

    useEffect(() => {
        const updateKeyStatus = () => {
            const current = getStoredApiKey();
            if (current) {
                setHasKey(true);
                setMaskedKey(
                    current.length > 8
                        ? `${current.slice(0, 6)}...${current.slice(-4)}`
                        : '••••••••••••'
                );
            } else {
                setHasKey(false);
                setMaskedKey('');
            }
        };

        updateKeyStatus();
        window.addEventListener(API_KEY_EVENT, updateKeyStatus);
        return () => window.removeEventListener(API_KEY_EVENT, updateKeyStatus);
    }, []);

    const handleSave = () => {
        const trimmed = apiKey.trim();
        if (!trimmed) {
            toast.error('Please enter a valid Gemini API key');
            return;
        }

        setStoredApiKey(trimmed);
        setApiKey('');
        toast.success('Gemini API key saved! Daily rate limits are now bypassed.');
        onOpenChange(false);
    };

    const handleRemove = () => {
        removeStoredApiKey();
        setApiKey('');
        toast.info('Custom API key removed. Using default server limits.');
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader className="space-y-2">
                    <div className="flex items-center gap-2">
                        <div className="p-2 rounded-xl bg-primary/10 text-primary">
                            <Key className="w-5 h-5" />
                        </div>
                        <DialogTitle className="text-xl font-bold">Custom Gemini API Key</DialogTitle>
                    </div>
                    <DialogDescription className="text-sm text-muted-foreground">
                        Use your own Google Gemini API key to bypass repository and message limits with faster, dedicated rate limits.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-2">
                    {hasKey ? (
                        <div className="rounded-xl border border-border bg-accent/40 p-3.5 space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-medium text-muted-foreground">Status</span>
                                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 gap-1.5 py-0.5 px-2 font-medium">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    Custom API key active
                                </Badge>
                            </div>
                            <div className="flex items-center justify-between gap-2 pt-1">
                                <code className="text-xs font-mono bg-background/80 px-2 py-1 rounded border">
                                    {maskedKey}
                                </code>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleRemove}
                                    className="h-7 px-2 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive"
                                >
                                    <Trash2 className="w-3.5 h-3.5 mr-1" />
                                    Remove Key
                                </Button>
                            </div>
                        </div>
                    ) : null}

                    <div className="space-y-2">
                        <Label htmlFor="gemini-api-key" className="text-xs font-medium flex items-center justify-between">
                            <span>{hasKey ? 'Update API Key' : 'Enter Gemini API Key'}</span>
                            <a
                                href="https://aistudio.google.com/app/apikey"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-primary hover:underline flex items-center gap-1 font-normal"
                            >
                                Get free key <ExternalLink className="w-3 h-3" />
                            </a>
                        </Label>

                        <div className="relative">
                            <Input
                                id="gemini-api-key"
                                type={showKey ? 'text' : 'password'}
                                placeholder="AIzaSy..."
                                value={apiKey}
                                onChange={(e) => setApiKey(e.target.value)}
                                className="pr-10 font-mono text-sm"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleSave();
                                    }
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowKey(!showKey)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                                tabIndex={-1}
                            >
                                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground space-y-1.5 border border-border/50">
                        <div className="flex items-center gap-1.5 font-medium text-foreground">
                            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                            Benefits of using your own key:
                        </div>
                        <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
                            <li>Bypasses the daily repository processing limit.</li>
                            <li>Bypasses the daily chat message limit.</li>
                            <li>Your key is stored securely in your local browser only.</li>
                        </ul>
                    </div>
                </div>

                <DialogFooter className="gap-2">
                    <Button variant="outline" onClick={() => onOpenChange(false)} className='rounded-lg cursor-pointer'>
                        Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={!apiKey.trim()} className="gap-1.5 rounded-lg cursor-pointer">
                        <Check className="w-4 h-4" />
                        {hasKey ? 'Update Key' : 'Save Key'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
