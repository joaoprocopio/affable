import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  ChartNoAxesCombined,
  ChevronDown,
  Computer,
  DoorOpen,
  Home,
  LogOut,
  Moon,
  Palette,
  Sun,
  type LucideIcon,
} from "lucide-react"
import { Link, useLocation, useRevalidator, type To } from "react-router"
import { useTheme } from "~/lib/theme"
import { Avatar, AvatarFallback } from "~/lib/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "~/lib/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
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
    icon: ChartNoAxesCombined,
    label: "Metrics",
    to: "/metrics",
  },
] as const satisfies {
  label: string
  icon: LucideIcon
  to: To
}[]

export function AppSidebar() {
  const sidebar = useSidebar()
  const { theme, setTheme } = useTheme()

  const location = useLocation()
  const revalidator = useRevalidator()

  const queryClient = useQueryClient()

  const me = useQuery(authQueries.me())
  const signout = useMutation(authMutations.signout(queryClient, revalidator.revalidate))

  return (
    <Sidebar variant="inset">
      <SidebarHeader className="flex-row">
        {me.isSuccess && (
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

            <DropdownMenuContent side="bottom" className="w-36">
              <DropdownMenuGroup>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <Palette className="text-muted-foreground" />
                    Theme
                  </DropdownMenuSubTrigger>

                  <DropdownMenuSubContent className="w-48">
                    <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                      <DropdownMenuRadioItem value="system">
                        <Computer className="text-muted-foreground" />
                        <span>Match system</span>
                      </DropdownMenuRadioItem>

                      <DropdownMenuRadioItem value="light">
                        <Sun className="text-muted-foreground" />
                        <span>Light theme</span>
                      </DropdownMenuRadioItem>

                      <DropdownMenuRadioItem value="dark">
                        <Moon className="text-muted-foreground" />
                        <span>Dark theme</span>
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>

                <DropdownMenuItem onClick={() => signout.mutate()}>
                  <LogOut className="text-muted-foreground" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {sidebar.open && <SidebarTrigger className="ml-auto" />}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="text-muted-foreground">
            {links.map((link, index) => (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton
                  isActive={location.pathname === link.to}
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
  )
}
