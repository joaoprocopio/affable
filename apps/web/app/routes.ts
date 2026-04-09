import { index, layout, route, type RouteConfig } from "@react-router/dev/routes"

export const authRoutes = new Set(["/signin", "/signup"])

export default [
  layout("routes/auth.tsx", [
    route("signin", "routes/signin.tsx"),
    route("signup", "routes/signup.tsx"),
  ]),

  layout("routes/app.tsx", [index("routes/properties.tsx"), route("*", "routes/catchall.tsx")]),
] satisfies RouteConfig
