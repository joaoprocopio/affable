import { index, layout, route, type RouteConfig } from "@react-router/dev/routes"

export const authRoutes = new Set(["/signin", "/signup"])

export default [
  layout("routes/auth.tsx", [
    route("signin", "routes/auth-signin.tsx"),
    route("signup", "routes/auth-signup.tsx"),
  ]),

  layout("routes/app.tsx", [
    layout("routes/app-properties.tsx", [
      index("routes/app-properties-list.tsx"),
      route("add", "routes/app-properties-add.tsx"),
    ]),

    layout("routes/app-reservations.tsx", [
      route("reservations", "routes/app-reservations-list.tsx"),
    ]),
    route("metrics", "routes/app-metrics.tsx"),
    route("*", "routes/catchall.tsx"),
  ]),
] satisfies RouteConfig
