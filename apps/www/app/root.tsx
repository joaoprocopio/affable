import type { Route } from "./+types/root"
import {
  Links,
  Meta,
  Outlet,
  redirect,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "react-router"
import "~/assets/theme.css"
import { HttpError } from "~/lib/http/errors"
import { HttpStatus } from "~/lib/http/status"
import { getQueryClient } from "~/lib/query/client"
import { QueryDevtools } from "~/lib/query/devtools"
import { QueryProvider } from "~/lib/query/provider"
import { ThemeProvider } from "~/lib/theme/provider"
import { Empty } from "~/lib/ui/empty"
import { Sidebar, SidebarInset, SidebarProvider } from "~/lib/ui/sidebar"
import { Toaster } from "~/lib/ui/sonner"
import { Spinner } from "~/lib/ui/spinner"
import { TooltipProvider } from "~/lib/ui/tooltip"
import { authRoutes } from "~/routes"
import { authQueries, authQueryKeys } from "~/state/auth/query"

export async function clientLoader(args: Route.ClientLoaderArgs) {
  const queryClient = getQueryClient()

  await Promise.all([
    queryClient.prefetchQuery(authQueries.me()),
    queryClient.prefetchQuery(authQueries.token()),
  ])

  const me = queryClient.getQueryState(authQueryKeys.me())

  const url = new URL(args.request.url)

  if (
    me?.status === "error" &&
    HttpError.is(me.error) &&
    HttpStatus.isClientError(me.error.response.status) &&
    !authRoutes.has(url.pathname)
  ) {
    throw redirect("/signin")
  }

  if (me?.status === "success" && authRoutes.has(url.pathname)) {
    throw redirect("/")
  }
}

export default function App() {
  return <Outlet />
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Meta />
        <Links />
      </head>

      <body>
        <QueryProvider>
          <ThemeProvider>
            <TooltipProvider>{children}</TooltipProvider>

            <Toaster />
          </ThemeProvider>

          <QueryDevtools />
        </QueryProvider>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export function HydrateFallback() {
  const location = useLocation()

  if (authRoutes.has(location.pathname)) {
    return (
      <Empty className="size-full">
        <Spinner className="size-12" />
      </Empty>
    )
  }

  return (
    <SidebarProvider>
      <Sidebar variant="inset" />
      <SidebarInset />
    </SidebarProvider>
  )
}

export const meta: Route.MetaFunction = () => [
  { charSet: "utf-8" },
  { name: "viewport", content: "width=device-width, initial-scale=1" },
  { title: "Affable" },
]

export const links: Route.LinksFunction = () => [{ rel: "icon", href: "/favicon.ico" }]
