import {cookies} from "next/headers"

import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar"
import {AppSidebar} from "@/app/components/app-sidebar"

export default async function Layout({children}: { children: React.ReactNode }) {
    const cookieStore = await cookies()
    const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"

    return (
        <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar/>
            <div className="w-full">
                <SidebarTrigger/>
                <div className="flex flex-row items-center justify-center min-h-screen">
                    {children}
                </div>
            </div>
        </SidebarProvider>
    )
}
