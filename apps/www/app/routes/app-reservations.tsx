import { Outlet } from "react-router"

export const handle: Handle = {
  breadcrumb: "Reservations",
}

export default function AppReservationsRoute() {
  return <Outlet />
}
