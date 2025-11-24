import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import axios from "axios";
import { Input } from "../../ui/input";

// GitHub Linguist colors - matching official repo-visualizer
const FILE_COLORS: Record<string, string> = {
    // JavaScript/TypeScript
    ".js": "#f1e05a",
    ".jsx": "#f1e05a",
    ".ts": "#2b7489",
    ".tsx": "#2b7489",
    ".mjs": "#f1e05a",
    ".cjs": "#f1e05a",

    // Python
    ".py": "#3572A5",

    // Styles
    ".css": "#563d7c",
    ".scss": "#c6538c",
    ".sass": "#c6538c",
    ".less": "#1d365d",

    // Data/Config
    ".json": "#292929",
    ".yaml": "#cb171e",
    ".yml": "#cb171e",
    ".xml": "#0060ac",
    ".toml": "#9c4221",

    // Documentation
    ".md": "#083fa1",
    ".mdx": "#fcb32c",
    ".txt": "#999999",
    ".rst": "#141414",

    // Web
    ".html": "#e34c26",
    ".htm": "#e34c26",

    // Assets
    ".png": "#dbb1a9",
    ".svg": "#ff9900",
    ".jpg": "#dbb1a9",
    ".jpeg": "#dbb1a9",
    ".gif": "#dbb1a9",
    ".ico": "#dbb1a9",
    ".webp": "#dbb1a9",

    // Java
    ".java": "#b07219",
    ".properties": "#2A6277",
    ".gradle": "#02303a",

    // Shell/Scripts
    ".sh": "#89e051",
    ".bash": "#89e051",

    // C/C++
    ".c": "#555555",
    ".cpp": "#f34b7d",
    ".h": "#555555",
    ".hpp": "#f34b7d",

    // Go
    ".go": "#00ADD8",

    // Ruby
    ".rb": "#701516",

    // PHP
    ".php": "#4F5D95",

    // Other
    ".log": "#999999",
    ".lock": "#999999",
    ".gitignore": "#999999",
    ".env": "#999999",

    default: "#CED6E0",
};

const EXCLUDED_FILES = [
    ".git",
    ".github",
    ".vscode",
    ".DS_Store",
    ".env",
    "node_modules",
    "bower_components",
    "dist",
    "out",
    "build",
    ".next",
    ".netlify",
    ".yarn",
    "package-lock.json",
    "yarn.lock",
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

            treeData.tree.forEach((item) => {
                if (EXCLUDED_FILES.some(excluded => item.path.includes(excluded))) {
                    return;
                }

                const parts = item.path.split("/");

                // Skip the entire "public" folder and all its contents
                if (parts[0] === "public") {
                    return;
                }

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

        // Calculate dynamic dimensions based on data complexity
        const root = d3.hierarchy(data);
        const nodeCount = root.descendants().length;

        // Dynamic sizing based on node count
        let baseSize = 800;
        if (nodeCount > 200) baseSize = 1200;
        else if (nodeCount > 100) baseSize = 1000;
        else if (nodeCount < 30) baseSize = 600;

        const width = baseSize;
        const height = baseSize;

        const hierarchyRoot = d3
            .hierarchy(data)
            .sum((d: TreeNode) => {
                // For files, use smart sizing with context-aware minimum
                if (!d.children || d.children.length === 0) {
                    const size = d.size || 1;

                    // Use square root to compress the range for better visual balance
                    const normalizedSize = Math.sqrt(size);

                    // Cap large files but keep smaller files visible
                    const cappedSize = Math.min(normalizedSize * 100, 15000);

                    // Set a reasonable minimum that scales with depth
                    const minimumSize = 300;

                    return Math.max(minimumSize, cappedSize);
                }
                return 0;
            })
            .sort((a, b) => (b.value ?? 0) - (a.value ?? 0));

        // Use pack layout with smart padding like the official repo-visualizer
        const pack = d3.pack<TreeNode>()
            .size([width, height * 1.3]) // Taller to create larger circles
            .padding((d) => {
                if (d.depth <= 0) return 0;
                // Reduced padding for files to make them larger
                if (!d.children) return 3;
                // More padding for folders with mixed content
                const hasChildWithNoChildren = d.children?.filter((child) =>
                    !child.children?.length
                ).length ?? 0;
                if (hasChildWithNoChildren > 1) return 6;
                return 10;
            });

        const packedRoot = pack(hierarchyRoot);
        const nodes = packedRoot.descendants().slice(1);

        // Calculate actual bounds of the visualization
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        nodes.forEach(node => {
            minX = Math.min(minX, node.x - node.r);
            minY = Math.min(minY, node.y - node.r);
            maxX = Math.max(maxX, node.x + node.r);
            maxY = Math.max(maxY, node.y + node.r);
        });

        // Add padding around the content
        const padding = 40;
        const contentWidth = maxX - minX + padding * 2;
        const contentHeight = maxY - minY + padding * 2;

        // Center offset
        const offsetX = -minX + padding;
        const offsetY = -minY + padding;

        const svg = d3
            .select(svgRef.current)
            .attr("width", contentWidth)
            .attr("height", contentHeight)
            .attr("viewBox", `0 0 ${contentWidth} ${contentHeight}`)
            .style("background", "transparent")
            .style("max-width", "100%")
            .style("height", "auto");

        svg.selectAll("*").remove();

        // Main container group with centering offset
        const container = svg.append("g")
            .attr("transform", `translate(${offsetX}, ${offsetY})`);

        // Create groups for each node
        const nodeGroups = container
            .selectAll<SVGGElement, typeof nodes[number]>("g")
            .data(nodes)
            .enter()
            .append("g")
            .attr("class", (d) => d.children ? "folder-node" : "file-node")
            .attr("transform", (d) => `translate(${d.x},${d.y})`);

        // Draw circles with glow effect for files
        nodeGroups
            .append("circle")
            .attr("r", (d) => d.r)
            .attr("fill", (d) => {
                // Folders have transparent fill
                if (d.children) return "transparent";

                // Files with search highlighting
                const name = d.data.name.toLowerCase();
                if (searchQuery.trim()) {
                    if (name.includes(searchQuery.toLowerCase())) {
                        return "#FCE68A"; // Yellow highlight
                    }
                    return "#ECEAEB"; // Dimmed gray
                }

                // Normal file colors
                const ext = getFileExtension(d.data.name);
                return FILE_COLORS[ext] || FILE_COLORS.default;
            })
            .attr("stroke", (d) => {
                if (d.children) {
                    return "currentColor";
                }
                // No stroke for files
                return "none";
            })
            .attr("stroke-width", (d) => d.children ? 1 : 0)
            .attr("stroke-opacity", (d) => d.children ? 0.3 : 0)
            .style("transition", "all 0.3s ease-out");

        // Add folder labels with curved text (like official repo-visualizer)
        nodeGroups
            .filter((d) => !!d.children && d.r > 16 && d.data.name.length <= d.r * 0.5)
            .each(function (d, i) {
                const group = d3.select(this);
                const name = d.data.name;
                const label = name.length > Math.floor(d.r / 2.7) + 3 && d.r < 30
                    ? name.slice(0, Math.floor(d.r / 2.7)) + "..."
                    : name;

                const pathId = `circle-path-${i}`;
                const offsetR = d.r + 12 - d.depth * 4;
                const fontSize = 16 - d.depth;

                // Create circular path for text
                group.append("path")
                    .attr("id", pathId)
                    .attr("fill", "none")
                    .attr("d", `
                        M 0,${offsetR - 3}
                        A ${offsetR - 3},${offsetR - 3} 0 0,1 0,${-(offsetR - 3)}
                        A ${offsetR - 3},${offsetR - 3} 0 0,1 0,${offsetR - 3}
                    `)
                    .attr("transform", `rotate(${d.depth})`);

                // Text with white stroke
                group.append("text")
                    .attr("class", "folder-label-stroke")
                    .attr("text-anchor", "middle")
                    .style("font-size", `${fontSize}px`)
                    .style("font-weight", "500")
                    .style("fill", "var(--foreground)")
                    .style("stroke", "var(--background)")
                    .style("stroke-width", "6px")
                    .style("stroke-linejoin", "round")
                    .style("pointer-events", "none")
                    .style("opacity", "0.9")
                    .append("textPath")
                    .attr("href", `#${pathId}`)
                    .attr("startOffset", "50%")
                    .text(label);

                // Text without stroke (on top)
                group.append("text")
                    .attr("class", "folder-label")
                    .attr("text-anchor", "middle")
                    .style("font-size", `${fontSize}px`)
                    .style("font-weight", "500")
                    .style("fill", "var(--foreground)")
                    .style("pointer-events", "none")
                    .append("textPath")
                    .attr("href", `#${pathId}`)
                    .attr("startOffset", "50%")
                    .text(label);
            });

        // Add file labels (centered, dual-layer for outline effect)
        nodeGroups
            .filter((d) => !d.children && d.r >= 18) // Lowered from 22 to show more labels
            .each(function (d) {
                const group = d3.select(this);
                const name = d.data.name;
                const maxChars = Math.floor(d.r / 3.2); // More generous character limit
                const label = name.length <= maxChars
                    ? name
                    : (maxChars > 3 ? name.slice(0, maxChars - 3) + "..." : "");

                if (!label) return;

                const fontSize = d.r < 25 ? "8px" : d.r < 35 ? "9px" : d.r < 45 ? "10px" : "11px";

                // White stroke layer
                group.append("text")
                    .attr("class", "file-label-stroke")
                    .attr("text-anchor", "middle")
                    .attr("dy", "0.35em")
                    .style("font-size", fontSize)
                    .style("font-weight", "500")
                    .style("fill", "var(--muted-foreground)")
                    .style("stroke", "var(--background)")
                    .style("stroke-width", "3px")
                    .style("stroke-linejoin", "round")
                    .style("pointer-events", "none")
                    .style("opacity", "0.9")
                    .text(label);

                // Main text layer
                group.append("text")
                    .attr("class", "file-label")
                    .attr("text-anchor", "middle")
                    .attr("dy", "0.35em")
                    .style("font-size", fontSize)
                    .style("font-weight", "500")
                    .style("fill", "var(--foreground)")
                    .style("pointer-events", "none")
                    .text(label);
            });

        // Add interactive hover for files
        nodeGroups
            .filter((d) => !d.children)
            .style("cursor", "pointer")
            .on("mouseenter", function (event, d) {
                const node = d3.select(this);

                // Highlight circle
                node.select("circle")
                    .transition()
                    .duration(200)
                    .attr("stroke", "var(--foreground)")
                    .attr("stroke-width", 2)
                    .attr("stroke-opacity", 0.8);

                // Show tooltip with full filename
                const tooltip = container
                    .append("g")
                    .attr("class", "tooltip")
                    .attr("transform", `translate(${d.x},${d.y - d.r - 5})`);

                const text = tooltip
                    .append("text")
                    .attr("text-anchor", "middle")
                    .attr("dy", "-5")
                    .style("font-size", "12px")
                    .style("font-weight", "600")
                    .style("fill", "var(--foreground)")
                    .text(d.data.name);

                const bbox = (text.node() as any).getBBox();

                tooltip
                    .insert("rect", "text")
                    .attr("x", bbox.x - 8)
                    .attr("y", bbox.y - 4)
                    .attr("width", bbox.width + 16)
                    .attr("height", bbox.height + 8)
                    .attr("rx", 6)
                    .style("fill", "var(--popover)")
                    .style("stroke", "var(--border)")
                    .style("stroke-width", 1.5)
                    .style("filter", "drop-shadow(0 4px 6px rgba(0,0,0,0.1))");

                text.raise();
            })
            .on("mouseleave", function () {
                const node = d3.select(this);

                // Reset circle
                node.select("circle")
                    .transition()
                    .duration(200)
                    .attr("stroke", "none")
                    .attr("stroke-width", 0);

                // Remove tooltip
                container.selectAll(".tooltip").remove();
            });

        // Add legend at bottom-right of the actual content
        const legendData = Object.entries(FILE_COLORS)
            .filter(([ext]) => ext !== 'default')
            .filter(([ext]) => {
                // Only show extensions that exist in the visualization
                return nodes.some(node =>
                    !node.children && getFileExtension(node.data.name) === ext
                );
            })
            .slice(0, 15); // Limit to 15 most common

        if (legendData.length > 0) {
            const legend = container.append("g")
                .attr("class", "legend")
                .attr("transform", `translate(${maxX - 60}, ${maxY - legendData.length * 15 - 20})`);

            legend.selectAll("g")
                .data(legendData)
                .enter()
                .append("g")
                .attr("transform", (d, i) => `translate(0, ${i * 15})`)
                .each(function ([ext, color]) {
                    const g = d3.select(this);

                    g.append("circle")
                        .attr("r", 5)
                        .attr("fill", color);

                    g.append("text")
                        .attr("x", 10)
                        .attr("dy", "0.35em")
                        .style("font-size", "14px")
                        .style("font-weight", "300")
                        .style("fill", "var(--foreground)")
                        .text(ext);
                });

            // Add "each dot sized by file size" text
            legend.append("text")
                .attr("y", legendData.length * 15 + 10)
                .style("fill", "var(--muted-foreground)")
                .style("font-weight", "300")
                .style("font-style", "italic")
                .style("font-size", "12px")
                .text("each dot sized by file size");
        }
    };

    useEffect(() => {
        fetchRepoTree();
    }, [repoUrl]);

    useEffect(() => {
        drawChart();
    }, [data, searchQuery]);

    return (
        <div className="px-2 md:px-6 pt-20 pb-8 min-h-screen">
            <div className="mb-6">
                <h2 className="text-xl font-bold mb-2">Repository Visualization</h2>
                <p className="text-muted-foreground mb-4">
                    Each circle represents a file or folder. Circle size indicates file size,
                    and color represents file type.
                </p>

                <Input
                    type="text"
                    placeholder="Search files..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full max-w-[400px]"
                />
            </div>

            {error && (
                <div className="text-destructive mb-6 p-4 border border-destructive/50 rounded-lg bg-destructive/10">
                    {error}
                </div>
            )}

            <div className="flex justify-center">
                <svg ref={svgRef}></svg>
            </div>
        </div>
    );
};

export default RepoVisualizer;
