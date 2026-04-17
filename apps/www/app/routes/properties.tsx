import { Outlet } from "react-router"

export const handle: Handle = {
  breadcrumb: "Properties",
}

export default function PropertiesRoute() {
  // return <div className="flex-1">{/* <div className="h-2000">abc</div> */}</div>
  return <Outlet />
}
