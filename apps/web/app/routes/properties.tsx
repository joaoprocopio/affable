import { Plus } from "lucide-react"
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

        <Button size="sm">
          <Plus />
          <span>Add a property</span>
        </Button>
      </AppHeader>
    </div>
  )
}
