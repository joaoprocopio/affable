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
      <AppHeader className="px-5 py-2">
        <AppHeaderBreadcrumb />

        <Button size="sm" render={<Link to="/add" />}>
          <Plus />
          <span>Add a property</span>
        </Button>
      </AppHeader>

      <div className="px-5 py-4">
        <Outlet />
      </div>
    </div>
  )
}
