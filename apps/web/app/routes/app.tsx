import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ChevronDown, LogOut } from "lucide-react"
import { Outlet, useRevalidator } from "react-router"
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
  SidebarHeader,
  SidebarInset,
  SidebarMenuButton,
  SidebarProvider,
} from "~/lib/ui/sidebar"
import { authMutations, authQueries } from "~/state/auth/query"
import { composeInitials } from "~/utils/avatar"

export default function AppRoute() {
  const queryClient = useQueryClient()
  const revalidator = useRevalidator()
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

                    <ChevronDown className="text-sidebar-muted-foreground size-4" />
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
      </Sidebar>

      <SidebarInset>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}
