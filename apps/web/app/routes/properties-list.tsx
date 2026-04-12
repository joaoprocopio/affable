import { useQuery } from "@tanstack/react-query"
import { Plus } from "lucide-react"
import { Link } from "react-router"
import { AppHeader, AppHeaderBreadcrumb, AppHeaderSidebarTrigger } from "~/components/app-header"
import { Button } from "~/lib/ui/button"
import { propertiesQueries } from "~/state/properties/query"

export default function PropertiesListRoute() {
  const properties = useQuery(propertiesQueries.list())

  return (
    <div>
      <AppHeader>
        <AppHeaderSidebarTrigger />
        <AppHeaderBreadcrumb />

        <Button className="ml-auto" size="sm" nativeButton={false} render={<Link to="/add" />}>
          <Plus />
          <span>Add a property</span>
        </Button>
      </AppHeader>

      {properties.isSuccess && <pre>{JSON.stringify(properties.data, null, 4)}</pre>}
    </div>
  )
}
