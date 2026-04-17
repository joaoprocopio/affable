import { Outlet } from "react-router"

export default function AuthRoute() {
  return (
    <div className="grid size-full items-center justify-center overflow-y-auto">
      <div className="max-w-md px-6 py-12 md:px-10">
        <Outlet />
      </div>
    </div>
  )
}
