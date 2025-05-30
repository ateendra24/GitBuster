import React, { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar, Eye, File, GitFork, Link, Loader2, Star, Text, User, Code, GitBranch, Clock, AlertCircle, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";

type RepoDetails = {
    name: string;
    owner: string;
    stargazers_count: number;
    created_at: string;
    size: number;
    description: string;
    html_url: string;
    watchers_count: number;
    forks_count: number;
    homepage: string;
    language: string;
    default_branch: string;
    open_issues_count: number;
    updated_at: string;
    topics: string[];
    visibility: string;
    archived: boolean;
};

function Details({ URL }: { URL: string }) {
    const [repoDetails, setRepoDetails] = useState<RepoDetails | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchRepoDetails() {
            try {
                const [owner, repo] = URL.split("/").slice(-2);
                const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);

                if (!response.ok) {
                    throw new Error("Failed to fetch repository details");
                }

                const data = await response.json();

                const repoData: RepoDetails = {
                    name: data.name,
                    owner: data.owner.login,
                    stargazers_count: data.stargazers_count,
                    created_at: data.created_at,
                    size: data.size,
                    description: data.description || "No description provided",
                    html_url: data.html_url,
                    watchers_count: data.watchers_count,
                    forks_count: data.forks_count,
                    homepage: data.homepage,
                    language: data.language,
                    default_branch: data.default_branch,
                    open_issues_count: data.open_issues_count,
                    updated_at: data.updated_at,
                    topics: data.topics || [],
                    visibility: data.visibility,
                    archived: data.archived
                };

                setRepoDetails(repoData);
            } catch (err: any) {
                setError(err.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        }

        fetchRepoDetails();
    }, [URL]);

    if (error) return (
        <div className="w-full h-full overflow-y-auto p-8 shadow-none bg-transparent">
            <div className="flex items-center gap-2 rounded-lg">
                <AlertCircle size={20} />
                <p>{error}</p>
            </div>
        </div>
    );

    if (loading) return (
        <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg p-2">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="animate-spin h-8 w-8 text-primary" />
                <p className="text-muted-foreground animate-pulse">Loading repository details...</p>
            </div>
        </div>
    );

    if (repoDetails)
        return (
            <Card className="w-full h-full overflow-y-auto px-2 py-6 md:px-6 shadow-none bg-transparent">
                <CardHeader className="px-0">
                    <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
                        <div className="space-y-2">
                            <h1 className="text-xl font-bold flex items-center gap-2">
                                {repoDetails.name}
                                <div className="flex flex-wrap gap-2">
                                    {repoDetails.archived && (
                                        <Badge variant="secondary" className="bg-yellow-100/50 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200">
                                            Archived
                                        </Badge>
                                    )}
                                    <Badge variant="secondary" className="capitalize">
                                        {repoDetails.visibility}
                                    </Badge>
                                </div>
                            </h1>
                            <p className="text-muted-foreground text-sm">{repoDetails.description}</p>
                        </div>
                    </div>

                    {repoDetails.topics.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                            {repoDetails.topics.map((topic) => (
                                <Badge key={topic} variant={'secondary'} className="rounded-md px-2 py-1 text-xs">
                                    {topic}
                                </Badge>
                            ))}
                        </div>
                    )}
                </CardHeader>

                <Separator className="my-4" />

                <CardContent className="px-0 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            {[
                                { label: "Owner", icon: <User size={18} />, value: repoDetails.owner, link: `https://github.com/${repoDetails.owner}` },
                                { label: "Language", icon: <Code size={18} />, value: repoDetails.language || "Not specified" },
                                { label: "Default Branch", icon: <GitBranch size={18} />, value: repoDetails.default_branch },
                                { label: "Created", icon: <Calendar size={18} />, value: new Date(repoDetails.created_at).toLocaleDateString() },
                            ].map(({ label, icon, value, link }) => (
                                <div key={label}>
                                    <Label className="text-sm flex items-center gap-2 text-muted-foreground mb-1">{icon} {label}</Label>
                                    {link ? (
                                        <a href={link} target="_blank" className="font-medium hover:underline">
                                            {value}
                                        </a>
                                    ) : (
                                        <p className="font-medium">{value}</p>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="space-y-4">
                            {[
                                { label: "Stars", icon: <Star size={18} />, value: repoDetails.stargazers_count },
                                { label: "Forks", icon: <GitFork size={18} />, value: repoDetails.forks_count },
                                { label: "Watchers", icon: <Eye size={18} />, value: repoDetails.watchers_count },
                                { label: "Last Updated", icon: <Clock size={18} />, value: new Date(repoDetails.updated_at).toLocaleDateString() },
                            ].map(({ label, icon, value }) => (
                                <div key={label}>
                                    <Label className="text-sm flex items-center gap-2 text-muted-foreground mb-1">{icon} {label}</Label>
                                    <p className="font-medium">{typeof value === 'number' ? value.toLocaleString() : value}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <Label className="text-sm flex items-center gap-2 text-muted-foreground mb-2">
                            <File size={18} /> Repository Size
                        </Label>
                        <Progress value={(repoDetails.size / 1000) * 100} className="h-2 rounded-full" />
                        <p className="text-sm mt-1 text-muted-foreground">{repoDetails.size.toLocaleString()} KB</p>
                    </div>

                    {repoDetails.homepage && (
                        <div>
                            <Label className="text-sm flex items-center gap-2 text-muted-foreground mb-1">
                                <Link size={18} /> Homepage
                            </Label>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <a
                                            href={repoDetails.homepage}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary hover:underline text-sm flex items-center gap-2 w-fit"
                                        >
                                            {repoDetails.homepage}
                                            <ExternalLink size={14} />
                                        </a>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Visit homepage</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    )}
                </CardContent>

                <Separator className="my-6" />

                <CardFooter className="flex flex-col sm:flex-row gap-4 p-0">
                    <Button variant="default" className="flex-1 group">
                        <a href={repoDetails.html_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                            <Code size={18} /> View Repository
                            <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                    </Button>

                    {repoDetails.open_issues_count > 0 && (
                        <Button variant="outline" className="flex-1 group">
                            <a
                                href={`${repoDetails.html_url}/issues`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2"
                            >
                                <AlertCircle size={18} /> {repoDetails.open_issues_count} Issues
                                <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                        </Button>
                    )}
                </CardFooter>
            </Card>

        );
}

export default Details;