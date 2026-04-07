import { route, type RouteConfig } from "@react-router/dev/routes"

export default [
  route("/signin", "routes/signin.tsx"),
  route("/signup", "routes/signup.tsx"),
  route("/home", "routes/home.tsx"),
] satisfies RouteConfig
