import { Outlet } from "react-router"

export const handle: Handle = {
  breadcrumb: "Properties",
}

export default function PropertiesRoute() {
  return <Outlet />
}
