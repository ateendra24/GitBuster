import { BookUser, FolderTree, MessagesSquare, Workflow } from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";

// Menu items with unique keys to map to state
const items = [
    { title: "Chat", key: "Chat", icon: MessagesSquare },
    { title: "FolderStructure", key: "FolderStructure", icon: FolderTree },
    { title: "Details", key: "Details", icon: BookUser },
    { title: "RepoGraph", key: "RepoGraph", icon: Workflow }
];

export function AppSidebar({ setActiveView, activeView, username, repo }: {
    setActiveView: (key: 'Chat' | 'FolderStructure' | 'Details' | 'RepoGraph') => void;
    activeView: 'Chat' | 'FolderStructure' | 'Details' | 'RepoGraph';
    username: string;
    repo: string;
}) {
    const { toggleSidebar } = useSidebar();

    const closeSideBar = () => {
        if (window.innerWidth < 768) {
            toggleSidebar()
        }
    }

    return (
        <Sidebar>
            <SidebarContent >
                <SidebarGroup>
                    <SidebarGroupLabel className="my-1"><a href={`https://github.com/` + username + "/" + repo} target="_blank" className="hover:underline line-clamp-1">{username + "/" + repo}</a></SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem onClick={closeSideBar} key={item.key} className={`${item.key === activeView ? "bg-border" : ""} rounded-lg`}>
                                    <SidebarMenuButton asChild className="cursor-pointer hover:bg-border/40 py-5 rounded-lg">
                                        <button
                                            className="flex items-center gap-2"
                                            onClick={() => setActiveView(item.key as 'Chat' | 'FolderStructure' | 'Details' | 'RepoGraph')}
                                        >
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </button>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <div className="p-2 flex gap-5 text-xs text-muted-foreground">
                    <Link href={"/privacy"} className="hover:underline" target="_blank">Privacy Policy</Link>
                    <Link href={"/faq"} className="hover:underline" target="_blank">FAQs</Link>
                    <Link href={"/cookies"} className="hover:underline" target="_blank">Cookies</Link>
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}