import { Outlet } from "react-router"

export default function AuthRoute() {
  return (
    <div className="flex size-full items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
