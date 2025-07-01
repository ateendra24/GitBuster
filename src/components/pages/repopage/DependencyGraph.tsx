import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import axios from "axios";
import { Circle } from "../../icons/Circle";

interface DependencyNode extends d3.SimulationNodeDatum {
    id: string;
    name: string;
    version?: string;
    type: 'main' | 'dev' | 'peer' | 'optional';
    group?: number;
}

interface DependencyLink {
    source: string;
    target: string;
    type: 'dependency' | 'devDependency' | 'peerDependency' | 'optionalDependency';
}

interface DependencyGraphData {
    nodes: DependencyNode[];
    links: DependencyLink[];
}

interface DependencyGraphProps {
    URL: string;
}

const DependencyGraph: React.FC<DependencyGraphProps> = ({ URL }) => {
    const [data, setData] = useState<DependencyGraphData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const svgRef = useRef<SVGSVGElement | null>(null);

    const getRepoDetails = (url: string) => {
        const match = url.match(/github\.com\/(.+?)\/(.+?)(?:$|\.git)/);
        if (!match) throw new Error("Invalid GitHub URL");
        const [, username, repo] = match;
        return { username, repo };
    };

    const fetchDependencies = async () => {
        try {
            setLoading(true);
            const { username, repo } = getRepoDetails(URL);

            // Fetch package.json from GitHub API
            const response = await axios.get(
                `https://api.github.com/repos/${username}/${repo}/contents/package.json`,
                {
                    headers: {
                        'Accept': 'application/vnd.github.v3+json'
                    }
                }
            );

            if (response.data.content) {
                const content = JSON.parse(atob(response.data.content));
                const dependencyData = parseDependencies(content);
                setData(dependencyData);
            }
        } catch (err) {
            console.error("Error fetching dependencies:", err);
            setError("Failed to fetch dependencies. This repository might not have a package.json file.");
        } finally {
            setLoading(false);
        }
    };

    const parseDependencies = (packageJson: any): DependencyGraphData => {
        const nodes: DependencyNode[] = [];
        const links: DependencyLink[] = [];

        // Add main project node
        nodes.push({
            id: 'root',
            name: packageJson.name || 'Project',
            type: 'main',
            group: 0
        });

        let nodeIndex = 1;

        // Process different dependency types
        const depTypes = [
            { key: 'dependencies', type: 'dependency' as const, group: 1 },
            { key: 'devDependencies', type: 'devDependency' as const, group: 2 },
            { key: 'peerDependencies', type: 'peerDependency' as const, group: 3 },
            { key: 'optionalDependencies', type: 'optionalDependency' as const, group: 4 }
        ];

        depTypes.forEach(({ key, type, group }) => {
            const deps = packageJson[key] || {};
            Object.entries(deps).forEach(([name, version]) => {
                const nodeId = `${name}-${nodeIndex++}`;
                nodes.push({
                    id: nodeId,
                    name,
                    version: version as string,
                    type: type === 'dependency' ? 'main' : 'dev',
                    group
                });

                links.push({
                    source: 'root',
                    target: nodeId,
                    type
                });
            });
        });

        return { nodes, links };
    };

    const drawGraph = () => {
        if (!data || !svgRef.current) return;

        // Responsive dimensions
        const containerWidth = svgRef.current.parentElement?.clientWidth || 800;
        const isMobile = window.innerWidth < 768;
        const width = Math.min(containerWidth - 40, isMobile ? 350 : 800);
        const height = isMobile ? 400 : 600;
        const margin = { top: 20, right: 20, bottom: 20, left: 20 };

        const svg = d3.select(svgRef.current)
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", `0 0 ${width} ${height}`)
            .style("max-width", "100%")
            .style("height", "auto");

        svg.selectAll("*").remove();

        const container = svg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        // Color scale for different dependency types
        const colorScale = d3.scaleOrdinal()
            .domain(['main', 'dev', 'peer', 'optional'])
            .range(['#3b82f6', '#ef4444', '#f59e0b', '#8b5cf6']);

        // Responsive force parameters
        const linkDistance = isMobile ? 60 : 100;
        const chargeStrength = isMobile ? -200 : -300;
        const collisionRadius = isMobile ? 20 : 30;

        // Create force simulation
        const simulation = d3.forceSimulation<DependencyNode>(data.nodes)
            .force("link", d3.forceLink<DependencyNode, DependencyLink>(data.links).id((d) => d.id).distance(linkDistance))
            .force("charge", d3.forceManyBody().strength(chargeStrength))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .force("collision", d3.forceCollide().radius(collisionRadius));

        // Create links
        const link = container.append("g")
            .selectAll("line")
            .data(data.links)
            .enter().append("line")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.6)
            .attr("stroke-width", 2);

        // Create nodes with responsive sizing
        const node = container.append("g")
            .selectAll("circle")
            .data(data.nodes)
            .enter().append("circle")
            .attr("r", (d) => {
                if (d.id === 'root') return isMobile ? 12 : 15;
                return isMobile ? 6 : 8;
            })
            .attr("fill", (d) => colorScale(d.type) as string)
            .attr("stroke", "#fff")
            .attr("stroke-width", isMobile ? 1.5 : 2)
            .style("cursor", "pointer");

        // Add labels with responsive font sizes
        const labels = container.append("g")
            .selectAll("text")
            .data(data.nodes)
            .enter().append("text")
            .text((d) => {
                const maxLength = isMobile ? 10 : 15;
                return d.name.length > maxLength ? d.name.substring(0, maxLength - 3) + "..." : d.name;
            })
            .attr("font-size", (d) => {
                if (d.id === 'root') return isMobile ? "12px" : "14px";
                return isMobile ? "8px" : "10px";
            })
            .attr("font-weight", (d) => d.id === 'root' ? "bold" : "normal")
            .attr("text-anchor", "middle")
            .attr("dy", (d) => {
                if (d.id === 'root') return isMobile ? 20 : 25;
                return isMobile ? 15 : 20;
            })
            .style("fill", "var(--foreground)")
            .style("pointer-events", "none");

        // Add drag behavior with touch support
        const drag = d3.drag<SVGCircleElement, DependencyNode>()
            .on("start", (event, d) => {
                if (!event.active) simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
            })
            .on("drag", (event, d) => {
                d.fx = event.x;
                d.fy = event.y;
            })
            .on("end", (event, d) => {
                if (!event.active) simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
            });

        node.call(drag);

        // Add tooltips with touch support
        node.append("title")
            .text((d) => `${d.name}${d.version ? ` (${d.version})` : ''}`);

        // Add click/tap event for mobile tooltip alternative
        if (isMobile) {
            node.on("click", function (event, d) {
                // Create a temporary tooltip for mobile
                const tooltip = d3.select("body").append("div")
                    .style("position", "absolute")
                    .style("background", "rgba(0, 0, 0, 0.8)")
                    .style("color", "white")
                    .style("padding", "8px")
                    .style("border-radius", "4px")
                    .style("font-size", "12px")
                    .style("pointer-events", "none")
                    .style("z-index", "1000")
                    .style("top", (event.pageY - 40) + "px")
                    .style("left", (event.pageX - 50) + "px")
                    .text(`${d.name}${d.version ? ` (${d.version})` : ''}`);

                // Remove tooltip after 2 seconds
                setTimeout(() => {
                    tooltip.remove();
                }, 2000);
            });
        }

        // Update positions on tick
        simulation.on("tick", () => {
            link
                .attr("x1", (d: any) => d.source.x)
                .attr("y1", (d: any) => d.source.y)
                .attr("x2", (d: any) => d.target.x)
                .attr("y2", (d: any) => d.target.y);

            node
                .attr("cx", (d) => d.x!)
                .attr("cy", (d) => d.y!);

            labels
                .attr("x", (d) => d.x!)
                .attr("y", (d) => d.y!);
        });
    };

    useEffect(() => {
        fetchDependencies();
    }, [URL]);

    useEffect(() => {
        if (data) {
            drawGraph();
        }

        // Handle window resize
        const handleResize = () => {
            if (data) {
                drawGraph();
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [data]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-full space-y-4 px-4">
                <Circle className="animate-spin w-8 h-8 md:w-12 md:h-12" />
                <p className="text-sm md:text-base text-muted-foreground text-center">Loading dependency graph...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-full space-y-4 px-4">
                <div className="text-destructive text-center max-w-md">
                    <p className="text-sm md:text-base font-semibold">Error Loading Dependencies</p>
                    <p className="text-xs md:text-sm mt-2">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full w-full overflow-auto px-2 pt-20 pb-6 md:px-6">
            <div className="mb-4">
                <h2 className="text-lg md:text-xl font-bold mb-2">Dependency Graph</h2>
                <p className="text-sm md:text-base text-muted-foreground mb-4">
                    Visual representation of project dependencies from package.json
                </p>

                {/* Legend */}
                <div className="flex flex-wrap gap-2 md:gap-4 mb-6">
                    <div className="flex items-center gap-1 md:gap-2">
                        <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-blue-500"></div>
                        <span className="text-xs md:text-sm">Dependencies</span>
                    </div>
                    <div className="flex items-center gap-1 md:gap-2">
                        <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-red-500"></div>
                        <span className="text-xs md:text-sm">Dev Dependencies</span>
                    </div>
                    <div className="flex items-center gap-1 md:gap-2">
                        <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-yellow-500"></div>
                        <span className="text-xs md:text-sm">Peer Dependencies</span>
                    </div>
                    <div className="flex items-center gap-1 md:gap-2">
                        <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-purple-500"></div>
                        <span className="text-xs md:text-sm">Optional Dependencies</span>
                    </div>
                </div>
            </div>

            <div className="border rounded-lg bg-background overflow-hidden">
                <svg ref={svgRef} className="w-full h-auto block"></svg>
            </div>

            {data && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 md:p-4 border rounded-lg">
                        <h3 className="text-sm md:text-base font-semibold mb-2">Statistics</h3>
                        <div className="space-y-1 text-xs md:text-sm">
                            <p>Total Dependencies: {data.nodes.length - 1}</p>
                            <p>Production: {data.nodes.filter(n => n.type === 'main' && n.id !== 'root').length}</p>
                            <p>Development: {data.nodes.filter(n => n.type === 'dev').length}</p>
                        </div>
                    </div>

                    <div className="p-3 md:p-4 border rounded-lg">
                        <h3 className="text-sm md:text-base font-semibold mb-2">Usage</h3>
                        <div className="space-y-1 text-xs md:text-sm text-muted-foreground">
                            <p>• Drag nodes to rearrange</p>
                            <p>• Hover for package details</p>
                            <p>• Colors represent dependency types</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DependencyGraph;
