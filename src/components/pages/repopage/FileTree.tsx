import React, { useEffect, useState } from "react";
import { File, Folder, Tree } from "@/components/magicui/file-tree";
import { Loader2 } from "lucide-react";

type TreeItem = {
    path: string;
    type: "blob" | "tree";
};

function buildTree(elements: TreeItem[]) {
    const root: any[] = [];
    const folderIds: string[] = [];
    const idCounter = (() => {
        let id = 1;
        return () => `${id++}`;
    })();

    const findOrCreateChild = (children: any[], name: string) => {
        let child = children.find((c) => c.name === name);
        if (!child) {
            child = {
                id: idCounter(),
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
                    id: idCounter(),
                    name,
                    isSelectable: true,
                });
            } else {
                const folder = findOrCreateChild(currentLevel, name);
                currentLevel = folder.children;
                folderIds.push(folder.id); // Add the folder ID to the list
            }
        }
    }

    return { tree: root, folderIds };
}

function FileTree({ URL }: { URL: string }) {
    const [owner, repo] = URL.split("/").slice(-2);
    const [elements, setElements] = useState<any[] | null>(null);
    const [folderIds, setFolderIds] = useState<string[]>([]); // Store the folder IDs
    const [error, setError] = useState<string | null>(null);

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
                    throw new Error("Could not fetch repository structure");
                }

                const { tree, folderIds } = buildTree(data.tree);
                setElements(tree);
                setFolderIds(folderIds); // Set the folder IDs for expansion
            } catch (err: any) {
                console.error(err);
                setError(err.message || "Something went wrong");
            }
        }

        fetchRepoTree();
    }, [owner, repo]);

    const renderTree = (items: any[]) =>
        items.map((item) =>
            item.children && item.children.length > 0 ? (
                <Folder key={item.id} element={item.name} value={item.id}>
                    {renderTree(item.children)}
                </Folder>
            ) : (
                <File key={item.id} value={item.id}>
                    <p>{item.name}</p>
                </File>
            )
        );

    if (error) return <div className="relative p-8 flex h-full w-full flex-col items-start justify-start overflow-hidden rounded-lg bg-background">Error: {error}</div>;
    if (!elements) return (
        <div className="relative p-8 flex h-full w-full flex-col items-start justify-start overflow-hidden rounded-lg bg-background">
            <Loader2 className="animate-spin" />
        </div>
    );

    return (
        <div className="relative p-8 flex h-full w-full flex-col items-start justify-start overflow-hidden rounded-lg bg-background">

            <p className="text-xl font-semibold mb-6">Repo File Tree</p>
            <Tree
                className="w-full h-full overflow-auto p-0"
                initialExpandedItems={folderIds}
            >
                {renderTree(elements)}
            </Tree>
        </div>
    );
}

export default FileTree;