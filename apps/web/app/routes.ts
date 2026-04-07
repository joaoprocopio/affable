import { layout, route, type RouteConfig } from "@react-router/dev/routes"

export default [
  layout("routes/auth.tsx", [
    route("signin", "routes/signin.tsx"),
    route("signup", "routes/signup.tsx"),
  ]),

  layout("routes/app.tsx", [route("home", "routes/home.tsx")]),

  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig
