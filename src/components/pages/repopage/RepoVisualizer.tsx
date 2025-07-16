import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import axios from "axios";
import { Input } from "../../ui/input";

const FILE_COLORS: Record<string, string> = {
    ".js": "#b39ddb",
    ".ts": "#b39ddb",
    ".jsx": "#c866d9",
    ".tsx": "#c866d9",
    ".py": "#c866d9",
    ".css": "#dce775",
    ".json": "#f06292",
    ".md": "#5c6bc0",
    ".html": "#81d4fa",
    ".cjs": "#ffeb3b",
    ".png": "#45aaf2",
    ".svg": "#ff8c00",
    ".gitignore": "#b0b0b0",
    ".mdx": "#3c40c6",
    ".yaml": "#cb171e",
    ".yml": "#cb171e",
    ".xml": "#cb171e",
    ".java": "#c866d9",
    ".properties": "#81d4fa",
    ".log": "#ffeb3b",
    ".sh": "#ff5722",
    ".txt": "#9e9e9e",
    default: "transparent",
};

const EXCLUDED_FILES = [
    ".git",
    ".github",
    ".vscode",
    ".DS_Store",
    ".env",
];

function getFileExtension(filename: string): string {
    return filename.includes(".") ? `.${filename.split(".").pop()}` : "default";
}

interface RepoVisualizerProps {
    repoUrl: string;
}

interface TreeItem {
    path: string;
    size?: number;
    mode: string;
    type: string;
    sha: string;
    url: string;
}

interface TreeNode {
    name: string;
    children?: TreeNode[];
    size?: number;
    path?: string;
}

const RepoVisualizer: React.FC<RepoVisualizerProps> = ({ repoUrl }) => {
    const [data, setData] = useState<TreeNode | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const svgRef = useRef<SVGSVGElement | null>(null);

    const getRepoDetails = (url: string) => {
        const match = url.match(/github\.com\/(.+?)\/(.+?)(?:$|\.git)/);
        if (!match) throw new Error("Invalid GitHub URL");
        const [, username, repo] = match;
        return { username, repo };
    };

    const fetchRepoTree = async () => {
        try {
            const { username, repo } = getRepoDetails(repoUrl);

            const { data: refData } = await axios.get(
                `https://api.github.com/repos/${username}/${repo}/git/refs/heads/main`
            );
            const commitSha = refData.object.sha;

            const { data: treeData } = await axios.get<{
                tree: TreeItem[];
            }>(
                `https://api.github.com/repos/${username}/${repo}/git/trees/${commitSha}?recursive=1`
            );

            const root: TreeNode = { name: repo, children: [] };

            const MAX_PUBLIC_ITEMS = 3;
            const publicEntries = new Set<string>();

            treeData.tree.forEach((item) => {
                if (EXCLUDED_FILES.some(excluded => item.path.includes(excluded))) {
                    return;
                }

                const parts = item.path.split("/");
                if (parts[0] === "public" && publicEntries.size >= MAX_PUBLIC_ITEMS)
                    return;
                if (parts[0] === "public") publicEntries.add(parts[1]);

                let current = root;
                parts.forEach((part, i) => {
                    if (!current.children) current.children = [];
                    let child = current.children.find((c) => c.name === part);
                    if (!child) {
                        child = {
                            name: part,
                            children: [],
                            size: i === parts.length - 1 ? item.size || 1 : undefined,
                            path: item.path,
                        };
                        current.children.push(child);
                    }
                    current = child;
                });
            });

            setData(root);
            setError(null);
        } catch (err) {
            console.error("Error fetching repo tree:", err);
            setError(
                "Failed to load repository. Please check the URL or try again later."
            );
        }
    };

    const drawChart = () => {
        if (!data || !svgRef.current) return;

        const width = 1000;
        const height = 800;

        const root = d3
            .hierarchy(data)
            .sum((d: TreeNode) => {
                const rawSize = d.size || 0.8;
                if (d.path && d.path.startsWith("public/")) {
                    return Math.max(50, Math.min(rawSize, 70));
                }
                return Math.max(50, Math.min(rawSize, 2000));
            })
            .sort((a, b) => (b.value ?? 0) - (a.value ?? 0));

        const pack = d3.pack<TreeNode>().size([width, height]).padding(6);
        const nodes = pack(root).descendants().slice(1);

        const svg = d3
            .select(svgRef.current)
            .attr("width", width)
            .attr("height", height);

        svg.selectAll("*").remove();

        const g = svg
            .selectAll<SVGGElement, typeof nodes[number]>("g")
            .data(nodes)
            .enter()
            .append("g")
            .attr("transform", (d) => `translate(${d.x},${d.y})`);

        g.append("circle")
            .attr("r", (d) => d.r)
            .attr("fill", (d) => {
                if (!d.children) {
                    const name = d.data.name.toLowerCase();
                    if (searchQuery.trim() && name.includes(searchQuery.toLowerCase())) {
                        return "#fbbf24";
                    } else if (searchQuery.trim()) {
                        return "#9ca3af";
                    }
                }
                const ext = getFileExtension(d.data.name);
                return FILE_COLORS[ext] || FILE_COLORS.default;
            })
            .attr("stroke", "var(--border)")
            .style("transition", "stroke 0.3s ease")
            .attr("stroke-width", (d) => (d.children ? 1.5 : 1));

        g.filter((d) => !!d.children)
            .append("path")
            .attr("id", (_, i) => `arc${i}`)
            .attr("d", (d) => {
                const r = d.r;
                return d3.arc()({
                    innerRadius: r,
                    outerRadius: r,
                    startAngle: -3.5,
                    endAngle: 10 * Math.PI,
                })!;
            })
            .style("fill", "none");

        g.filter((d) => !!d.children)
            .append("text")
            .append("textPath")
            .attr("href", (_, i) => `#arc${i}`)
            .attr("startOffset", "25%")
            .style("font-size", "12px")
            .style("font-weight", "900")
            .style("fill", "var(--foreground)")
            .text((d) => d.data.name);

        const fileLabels = g
            .filter((d) => !d.children)
            .append("text")
            .attr("class", "file-label")
            .text((d) => {
                const name = d.data.name;
                const maxLen = Math.floor(d.r / 3);
                if (d.r < 10) return '';
                if (name.length > maxLen && maxLen >= 3) {
                    return name.slice(0, maxLen - 1) + '...';
                } else if (name.length <= maxLen) {
                    return name;
                }
                return '';
            })
            .style("text-anchor", "middle")
            .style("fill", "var(--foreground)")
            .style("font-size", "12px")
            .style("font-weight", "600")
            .style("display", "block")
            .attr("dy", ".35em")

        g.filter((d) => !d.children)
            .on("mouseover", function () {
                d3.select(this).raise();

                if (svgRef.current?.matches(":hover")) {
                    d3.select(this)
                        .select(".file-label")
                        .text((d: any) => d.data.name)
                    // .style("display", "block")

                    d3.select(this)
                        .select("circle")
                        .attr("stroke", "var(--accent-foreground)")
                        .attr("stroke-width", 2);
                }
            })
            .on("mouseout", function () {
                if (svgRef.current?.matches(":hover")) {
                    d3.select(this)
                        .select("circle")
                        .attr("stroke", "var(--border)")
                        .attr("stroke-width", 1)

                    d3.select(this)
                        .select(".file-label")
                        .text((d: any) => {
                            const name = d.data.name;
                            const maxLen = Math.floor(d.r / 3);
                            if (d.r < 10) return '';
                            if (name.length > maxLen && maxLen >= 3) {
                                return name.slice(0, maxLen - 1) + '...';
                            } else if (name.length <= maxLen) {
                                return name;
                            }
                            return '';
                        })
                    // .style("display", "none")
                }
            });
    };

    useEffect(() => {
        fetchRepoTree();
    }, [repoUrl]);

    useEffect(() => {
        drawChart();
    }, [data, searchQuery]);

    return (
        <div className="px-2 md:px-6 pt-20 h-dvh overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">GitHub Repo Visualizer</h2>
            <Input
                type="text"
                placeholder="Search for a file..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-[300px]"
            />
            {error && (
                <div className="text-destructive">{error}</div>
            )}
            <svg ref={svgRef}></svg>
            {/* <div className="mt-5">
                <h4 className="text-lg font-semibold mb-2">Legend</h4>
                <ul className="flex gap-4 flex-wrap list-none p-0">
                    {Object.entries(FILE_COLORS).map(([ext, color]) => (
                        <li
                            key={ext}
                            className="flex items-center gap-2"
                        >
                            <span
                                className="w-4 h-4 rounded-full inline-block"
                                style={{ backgroundColor: color }}
                            ></span>
                            {ext}
                        </li>
                    ))}
                </ul>
            </div> */}
        </div>
    );
};

export default RepoVisualizer;
