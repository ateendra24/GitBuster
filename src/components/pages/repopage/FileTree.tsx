import React, { useEffect, useMemo, useState } from "react";
import { File, Folder, Tree } from "@/components/magicui/file-tree";
import { Loader2 } from "lucide-react";

type TreeItem = {
    path: string;
    type: "blob" | "tree";
};

type TreeNode = {
    id: string;
    name: string;
    isSelectable: boolean;
    children?: TreeNode[];
};

// Generate unique IDs
const generateId = (() => {
    let id = 1;
    return () => `${id++}`;
})();

function buildTree(elements: TreeItem[]) {
    const root: TreeNode[] = [];
    const folderIds: string[] = [];

    const findOrCreateChild = (children: TreeNode[], name: string): TreeNode => {
        let child = children.find((c) => c.name === name);
        if (!child) {
            child = {
                id: generateId(),
                name,
                isSelectable: true,
                children: [],
            };
            children.push(child);
        }
        return child;
    };

    for (const item of elements) {
        const parts = item.path.split("/");
        let currentLevel = root;

        for (let i = 0; i < parts.length; i++) {
            const name = parts[i];
            const isFile = item.type === "blob" && i === parts.length - 1;

            if (isFile) {
                currentLevel.push({
                    id: generateId(),
                    name,
                    isSelectable: true,
                });
            } else {
                const folder = findOrCreateChild(currentLevel, name);
                currentLevel = folder.children!;
                folderIds.push(folder.id);
            }
        }
    }

    return { tree: root, folderIds };
}

function FileTree({ URL }: { URL: string }) {
    const [elements, setElements] = useState<TreeNode[] | null>(null);
    const [folderIds, setFolderIds] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    const [owner, repo] = URL.split("/").slice(-2);

    useEffect(() => {
        async function fetchRepoTree() {
            try {
                let response = await fetch(
                    `https://api.github.com/repos/${owner}/${repo}/git/trees/main?recursive=1`
                );

                if (response.status === 404) {
                    response = await fetch(
                        `https://api.github.com/repos/${owner}/${repo}/git/trees/master?recursive=1`
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
                        <p>{item.name}</p>
                    </File>
                )
            );
        return render;
    }, []);

    if (error) {
        return (
            <div className="p-8 flex h-full w-full items-center justify-center bg-red-50 text-red-600 rounded-lg">
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
        <div className="relative px-4 py-6 md:px-6 flex h-full w-full flex-col items-start justify-start overflow-hidden rounded-lg bg-background">
            <p className="text-xl font-semibold mb-6">Repository File Tree</p>
            <Tree className="w-full h-full overflow-auto p-0" initialExpandedItems={folderIds}>
                {renderTree(elements)}
            </Tree>
        </div>
    );
}

export default FileTree;
