import React, { useEffect, useMemo, useState } from "react";
import { File, Folder, Tree } from "@/components/magicui/file-tree";
import { Loader2, Copy } from "lucide-react";
import { motion } from "framer-motion";
import clsx from "clsx";

type TreeItem = {
    path: string;
    type: "blob" | "tree";
};

type TreeNode = {
    id: string;
    name: string;
    isSelectable: boolean;
    children?: TreeNode[];
    fullPath: string;
};

const generateId = (() => {
    let id = 1;
    return () => `${id++}`;
})();

function buildTree(elements: TreeItem[]) {
    const root: TreeNode[] = [];
    const folderIds: string[] = [];

    const findOrCreateChild = (children: TreeNode[], name: string, fullPath: string): TreeNode => {
        let child = children.find((c) => c.name === name);
        if (!child) {
            child = {
                id: generateId(),
                name,
                isSelectable: true,
                fullPath,
                children: [],
            };
            children.push(child);
        }
        return child;
    };

    for (const item of elements) {
        const parts = item.path.split("/");
        let currentLevel = root;
        let currentPath = "";

        for (let i = 0; i < parts.length; i++) {
            const name = parts[i];
            currentPath = currentPath ? `${currentPath}/${name}` : name;

            const isFile = item.type === "blob" && i === parts.length - 1;

            if (isFile) {
                currentLevel.push({
                    id: generateId(),
                    name,
                    isSelectable: true,
                    fullPath: currentPath,
                });
            } else {
                const folder = findOrCreateChild(currentLevel, name, currentPath);
                currentLevel = folder.children!;
                folderIds.push(folder.id);
            }
        }
    }

    return { tree: root, folderIds };
}

// 🧠 Recursively filter the tree for search
function filterTree(nodes: TreeNode[], query: string): TreeNode[] {
    const lowerQuery = query.toLowerCase();

    return nodes
        .map((node) => {
            if (node.children) {
                const filteredChildren = filterTree(node.children, query);
                if (filteredChildren.length > 0 || node.name.toLowerCase().includes(lowerQuery)) {
                    return {
                        ...node,
                        children: filteredChildren,
                    };
                }
                return null;
            } else {
                return node.name.toLowerCase().includes(lowerQuery) ? node : null;
            }
        })
        .filter(Boolean) as TreeNode[];
}

function FolderStructure({ URL }: { URL: string }) {
    const [elements, setElements] = useState<TreeNode[] | null>(null);
    const [folderIds, setFolderIds] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [copiedPath, setCopiedPath] = useState<string | null>(null);
    const [search, setSearch] = useState("");

    const [owner, repo] = URL.split("/").slice(-2);

    useEffect(() => {
        async function fetchRepoTree() {
            try {
                let response = await fetch(
                    `https://api.github.com/repos/${owner}/${repo}/git/trees/main?recursive=1`,
                    {
                        headers: {
                            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
                            'Accept': 'application/vnd.github.v3+json'
                        }
                    }
                );

                if (response.status === 404) {
                    response = await fetch(
                        `https://api.github.com/repos/${owner}/${repo}/git/trees/master?recursive=1`,
                        {
                            headers: {
                                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
                                'Accept': 'application/vnd.github.v3+json'
                            }
                        }
                    );
                }

                const data = await response.json();

                if (!data.tree) {
                    throw new Error("Repository structure not available.");
                }

                const { tree, folderIds } = buildTree(data.tree);
                setElements(tree);
                setFolderIds(folderIds);
            } catch (err: any) {
                console.error(err);
                setError(err.message || "Failed to load repository data.");
            }
        }

        fetchRepoTree();
    }, [owner, repo]);

    const renderTree = useMemo(() => {
        const render = (items: TreeNode[]): React.ReactNode[] =>
            items.map((item) =>
                item.children && item.children.length > 0 ? (
                    <Folder key={item.id} element={item.name} value={item.id}>
                        {render(item.children)}
                    </Folder>
                ) : (
                    <File key={item.id} value={item.id}>
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-center justify-between w-full group"
                        >
                            <span className="text-sm truncate">{item.name}</span>
                            <a
                                title="Copy file path"
                                onClick={async (e) => {
                                    e.stopPropagation();
                                    try {
                                        if (navigator?.clipboard?.writeText) {
                                            await navigator.clipboard.writeText(item.fullPath);
                                        } else {
                                            const textArea = document.createElement("textarea");
                                            textArea.value = item.fullPath;
                                            document.body.appendChild(textArea);
                                            textArea.select();
                                            document.execCommand("copy");
                                            document.body.removeChild(textArea);
                                        }

                                        setCopiedPath(item.id);
                                        setTimeout(() => setCopiedPath(null), 1500);
                                    } catch (err) {
                                        console.error("Copy failed:", err);
                                        alert("Failed to copy. Please copy manually.");
                                    }
                                }}
                                className={clsx(
                                    "ml-2 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity",
                                    copiedPath === item.id && "text-green-500"
                                )}
                            >
                                <Copy size={14} />
                            </a>
                        </motion.div>
                    </File>
                )
            );
        return render;
    }, [copiedPath]);

    const filteredElements = useMemo(() => {
        if (!elements) return [];
        if (!search) return elements;
        return filterTree(elements, search);
    }, [search, elements]);

    if (error) {
        return (
            <div className="p-8 flex h-full w-full items-center justify-center rounded-lg">
                <p className="text-sm font-medium">Error: {error}</p>
            </div>
        );
    }

    if (!elements) {
        return (
            <div className="p-8 flex h-full w-full items-center justify-center bg-background rounded-lg">
                <Loader2 className="animate-spin h-6 w-6 text-muted-foreground" />
            </div>
        );
    }

    return (
        <div className="relative px-4 pt-20 pb-6 md:px-6 flex h-full w-full flex-col overflow-hidden rounded-lg bg-background">
            <h2 className="text-xl font-semibold mb-4">Folder Structure</h2>

            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search files or folders..."
                className="mb-4 w-full px-3 py-2 border border-border rounded-md bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <Tree
                className="w-full h-full overflow-auto"
                initialExpandedItems={folderIds}
            >
                {renderTree(filteredElements)}
            </Tree>
        </div>
    );
}

export default FolderStructure;
