import { Plus } from "lucide-react"
import { Link } from "react-router"
import { AppHeader, AppHeaderBreadcrumb, AppHeaderSidebarTrigger } from "~/components/app-header"
import { Button } from "~/lib/ui/button"

export default function PropertiesListRoute() {
  return (
    <div>
      <AppHeader>
        <AppHeaderSidebarTrigger />
        <AppHeaderBreadcrumb />

        <Button className="ml-auto" size="sm" render={<Link to="/add" />}>
          <Plus />
          <span>Add a property</span>
        </Button>
      </AppHeader>
    </div>
  )
}
