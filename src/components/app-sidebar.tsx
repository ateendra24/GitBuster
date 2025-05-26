import { BookUser, FolderTree, MessagesSquare } from "lucide-react";
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
    { title: "Chat", key: "chat", icon: MessagesSquare },
    { title: "Folder Structure", key: "folder", icon: FolderTree },
    { title: "Details", key: "details", icon: BookUser },
];

export function AppSidebar({ setActiveView, activeView, username, repo }: {
    setActiveView: (key: 'chat' | 'folder' | 'details') => void;
    activeView: 'chat' | 'folder' | 'details';
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
        <Sidebar className="mt-[60px] h-auto">
            <SidebarContent >
                <SidebarGroup>
                    <SidebarGroupLabel className="mb-2"><a href={`https://github.com/` + username + "/" + repo} target="_blank" className="hover:underline line-clamp-1">{username + "/" + repo}</a></SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem onClick={closeSideBar} key={item.key} className={`${item.key === activeView ? "bg-border" : ""} rounded-md`}>
                                    <SidebarMenuButton asChild className="cursor-pointer hover:bg-border/40 py-5">
                                        <button
                                            className="flex items-center gap-2"
                                            onClick={() => setActiveView(item.key as any)}
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
                <div className="p-2 flex gap-3 text-xs text-muted-foreground">
                    <Link href={"/privacy"} className="hover:underline" target="_blank">Privacy Policy</Link>
                    <Link href={"/faq"} className="hover:underline" target="_blank">FAQs</Link>
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}