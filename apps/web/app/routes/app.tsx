import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Calendar, ChevronDown, DoorOpen, Home, LogOut, type LucideIcon } from "lucide-react"
import { Link, Outlet, useLocation, useRevalidator, type To } from "react-router"
import { Avatar, AvatarFallback } from "~/lib/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/lib/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "~/lib/ui/sidebar"
import { authMutations, authQueries } from "~/state/auth/query"
import { composeInitials } from "~/utils/avatar"

const links = [
  {
    icon: Home,
    label: "Properties",
    to: "/",
  },
  {
    icon: DoorOpen,
    label: "Reservations",
    to: "/reservations",
  },
  {
    icon: Calendar,
    label: "Calendar",
    to: "/calendar",
  },
] as const satisfies {
  label: string
  icon: LucideIcon
  to: To
}[]

export default function AppRoute() {
  const location = useLocation()
  const revalidator = useRevalidator()

  const queryClient = useQueryClient()

  const me = useQuery(authQueries.me())
  const signout = useMutation(authMutations.signout(queryClient, revalidator.revalidate))

  return (
    <SidebarProvider>
      <Sidebar variant="inset">
        {me.isSuccess && (
          <SidebarHeader>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <SidebarMenuButton className="w-fit p-1">
                    <Avatar className="size-6 overflow-hidden rounded-sm after:rounded-sm">
                      <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground text-2xs rounded-none font-medium">
                        {composeInitials(me.data.name)}
                      </AvatarFallback>
                    </Avatar>

                    <span className="truncate"> {me.data!.name} </span>

                    <ChevronDown className="text-muted-foreground size-4" />
                  </SidebarMenuButton>
                }
              />

              <DropdownMenuContent side="bottom">
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => signout.mutate()}>
                    <LogOut />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarHeader>
        )}

        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu className="text-muted-foreground">
              {links.map((link, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton
                    isActive={link.to === location.pathname}
                    render={<Link to={link.to} />}>
                    <link.icon />
                    <span>{link.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      <SidebarInset>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}
