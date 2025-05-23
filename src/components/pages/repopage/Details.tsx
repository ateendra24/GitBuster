import React, { useEffect, useState } from "react";
// import { GithubIcon } from "@heroicons/react/outline"; // You can customize this or use a custom icon
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar, Eye, File, GitFork, Loader2, Star, Text, User } from "lucide-react";

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
};

function Details({ URL }: { URL: string }) {
    const [repoDetails, setRepoDetails] = useState<RepoDetails | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true)

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
                };

                setRepoDetails(repoData);
            } catch (err: any) {
                setError(err.message || "Something went wrong");
            }
            finally {
                setLoading(false)
            }
        }

        fetchRepoDetails();
    }, [URL]);

    if (error) return <div className="w-full h-full overflow-y-auto p-8 shadow-none bg-transparent">{error}</div>;
    if (loading) return
    <div className="relative flex h-full w-full flex-col items-start justify-start overflow-hidden rounded-lg p-2">
        <Loader2 className="animate-spin" />
    </div>;

    if (repoDetails)
        return (
            <Card className="w-full h-full overflow-y-auto p-8 shadow-none bg-transparent">
                <CardHeader className="flex items-center px-0">
                    <p className="text-xl font-semibold">Repo Details</p>
                </CardHeader>
                <CardContent className="space-y-4 px-0">
                    <div>
                        <Label className="text-base"><User size={18} /> Owner</Label>
                        <p className="text-muted-foreground">{repoDetails.owner}</p>
                    </div>
                    <div>
                        <Label className="text-base"><Star size={18} />Stars</Label>
                        <p className="text-muted-foreground">{repoDetails.stargazers_count}</p>
                    </div>
                    <div>
                        <Label className="text-base"><Calendar size={18} /> Created</Label>
                        <p className="text-muted-foreground">{new Date(repoDetails.created_at).toLocaleDateString()}</p>
                    </div>
                    <div>
                        <Label className="text-base"><File size={18} /> File Size</Label>
                        <p className="text-muted-foreground">{repoDetails.size} KB</p>
                    </div>
                    <div>
                        <Label className="text-base"><Text size={18} /> Description</Label>
                        <p className="text-muted-foreground line-clamp-3">{repoDetails.description}</p>
                    </div>
                    <div>
                        <Label className="text-base"><Eye size={18} /> Watching</Label>
                        <p className="text-muted-foreground line-clamp-3">{repoDetails.watchers_count}</p>
                    </div>
                    <div>
                        <Label className="text-base"><GitFork size={18} /> Fork Count</Label>
                        <p className="text-muted-foreground line-clamp-3">{repoDetails.forks_count}</p>
                    </div>
                </CardContent>
                <CardFooter className="p-0">
                    <Button variant="outline" >
                        <a href={repoDetails.html_url} target="_blank">View Repo</a>
                    </Button>
                </CardFooter>
            </Card>
        );
}

export default Details;