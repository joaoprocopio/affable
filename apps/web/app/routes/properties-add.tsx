import { AppHeader, AppHeaderBreadcrumb } from "~/components/app-header"

export const handle: Handle = {
  breadcrumb: "Add",
}

export default function PropertiesAddRoute() {
  return (
    <div>
      <AppHeader>
        <AppHeaderBreadcrumb />
      </AppHeader>

      <div className="px-6 py-4">abc</div>
    </div>
  )
}
