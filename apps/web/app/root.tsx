import type { Route } from "./+types/root"
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router"
import "~/assets/theme.css"
import { getQueryClient } from "~/lib/query/client"
import { QueryDevtools } from "~/lib/query/devtools"
import { QueryProvider } from "~/lib/query/provider"
import { ThemeProvider } from "~/lib/theme/provider"
import { TooltipProvider } from "~/lib/ui/tooltip"
import { authQueries } from "~/state/auth/query"

export const meta: Route.MetaFunction = () => [
  { charSet: "utf-8" },
  { name: "viewport", content: "width=device-width, initial-scale=1" },
  { title: "Affable" },
]

export const links: Route.LinksFunction = () => [{ rel: "icon", href: "/favicon.ico" }]

export async function clientLoader() {
  const queryClient = getQueryClient()

  queryClient.prefetchQuery(authQueries.token())
  queryClient.prefetchQuery(authQueries.me())
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
          </ThemeProvider>

          <QueryDevtools />
        </QueryProvider>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}
