import { Outlet } from "react-router"
import { Sidebar, SidebarInset, SidebarProvider } from "~/lib/ui/sidebar"

export default function AppRoute() {
  return (
    <SidebarProvider>
      <Sidebar variant="sidebar"></Sidebar>

      <SidebarInset>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}
