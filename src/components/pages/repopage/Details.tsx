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
            <Card className="w-full h-full overflow-y-auto px-2 py-6 md:px-6 shadow-none bg-transparent backdrop-blur-sm border-border/50">
                <CardHeader className="flex flex-col gap-4 px-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="space-y-2">
                            <h1 className="text-xl font-semibold mb-6 flex gap-2">
                                {repoDetails.name}
                                <div className="flex flex-wrap gap-2">
                                    {repoDetails.archived && (
                                        <Badge variant="secondary" className="bg-yellow-100/50 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200">
                                            Archived
                                        </Badge>
                                    )}
                                    <Badge variant="secondary" className="bg-blue-100/50 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200">
                                        {repoDetails.visibility}
                                    </Badge>
                                </div>
                            </h1>
                            <p className="text-muted-foreground text-sm md:text-base">{repoDetails.description}</p>
                        </div>

                    </div>
                    {repoDetails.topics.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {repoDetails.topics.map((topic) => (
                                <Badge key={topic} variant="outline" className="bg-secondary/50 hover:bg-secondary/80 transition-colors">
                                    {topic}
                                </Badge>
                            ))}
                        </div>
                    )}
                </CardHeader>

                <Separator className="my-3" />

                <CardContent className="space-y-8 px-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label className="text-base flex items-center gap-2 text-muted-foreground">
                                    <User size={18} /> Owner
                                </Label>
                                <a className="text-lg font-medium hover:underline" href={"https://www.github.com/" + repoDetails.owner} target="_blank">{repoDetails.owner}</a>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-base flex items-center gap-2 text-muted-foreground">
                                    <Code size={18} /> Language
                                </Label>
                                <p className="text-lg font-medium">{repoDetails.language || "Not specified"}</p>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-base flex items-center gap-2 text-muted-foreground">
                                    <GitBranch size={18} /> Default Branch
                                </Label>
                                <p className="text-lg font-medium">{repoDetails.default_branch}</p>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-base flex items-center gap-2 text-muted-foreground">
                                    <Calendar size={18} /> Created
                                </Label>
                                <p className="text-lg font-medium">
                                    {new Date(repoDetails.created_at).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label className="text-base flex items-center gap-2 text-muted-foreground">
                                    <Star size={18} /> Stars
                                </Label>
                                <p className="text-lg font-medium">{repoDetails.stargazers_count.toLocaleString()}</p>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-base flex items-center gap-2 text-muted-foreground">
                                    <GitFork size={18} /> Forks
                                </Label>
                                <p className="text-lg font-medium">{repoDetails.forks_count.toLocaleString()}</p>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-base flex items-center gap-2 text-muted-foreground">
                                    <Eye size={18} /> Watching
                                </Label>
                                <p className="text-lg font-medium">{repoDetails.watchers_count.toLocaleString()}</p>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-base flex items-center gap-2 text-muted-foreground">
                                    <Clock size={18} /> Last Updated
                                </Label>
                                <p className="text-lg font-medium">
                                    {new Date(repoDetails.updated_at).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Label className="text-base flex items-center gap-2 text-muted-foreground">
                            <File size={18} /> Repository Size
                        </Label>
                        <div className="space-y-2">
                            <Progress value={(repoDetails.size / 1000) * 100} className="h-2" />
                            <p className="text-sm text-muted-foreground">
                                {repoDetails.size.toLocaleString()} KB
                            </p>
                        </div>
                    </div>

                    {repoDetails.homepage && (
                        <div className="space-y-2">
                            <Label className="text-base flex items-center gap-2 text-muted-foreground">
                                <Link size={18} /> Homepage
                            </Label>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <a
                                            href={repoDetails.homepage}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary hover:text-primary/80 transition-colors flex items-center gap-2 w-fit"
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