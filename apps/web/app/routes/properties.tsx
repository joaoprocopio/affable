import { HandleBreadcrumb } from "~/components/handle-breadcrumb"

export const handle: Handle = {
  breadcrumb: "Properties",
}

export default function PropertiesRoute() {
  return (
    <div>
      <header className="border-b px-6 py-4">
        <HandleBreadcrumb />
      </header>
    </div>
  )
}
