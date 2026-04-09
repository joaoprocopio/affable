import { Plus } from "lucide-react"
import { Link, Outlet } from "react-router"
import { AppHeader, AppHeaderBreadcrumb } from "~/components/app-header"
import { Button } from "~/lib/ui/button"

export const handle: Handle = {
  breadcrumb: "Properties",
}

export default function PropertiesRoute() {
  return (
    <div>
      <AppHeader>
        <AppHeaderBreadcrumb />

        <Button size="sm" render={<Link to="/add" />}>
          <Plus />
          <span>Add a property</span>
        </Button>
      </AppHeader>

      <Outlet />
    </div>
  )
}
