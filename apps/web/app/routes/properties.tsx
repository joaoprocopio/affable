import { HandleBreadcrumb } from "~/components/handle-breadcrumb"

export const handle: Handle = {
  breadcrumb: "Properties",
}

export default function PropertiesRoute() {
  return (
    <div>
      <HandleBreadcrumb />
    </div>
  )
}
