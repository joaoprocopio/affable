import { index, layout, route, type RouteConfig } from "@react-router/dev/routes"

export const authRoutes = new Set(["/signin", "/signup"])

export default [
  layout("routes/auth.tsx", [
    route("signin", "routes/signin.tsx"),
    route("signup", "routes/signup.tsx"),
  ]),

  layout("routes/app.tsx", [
    layout("routes/properties.tsx", [
      index("routes/properties-list.tsx"),
      route("add", "routes/properties-add.tsx"),
    ]),

    layout("routes/reservations.tsx", [route("reservations", "routes/reservations-list.tsx")]),
    route("metrics", "routes/metrics.tsx"),
    route("*", "routes/catchall.tsx"),
  ]),
] satisfies RouteConfig
