import type { Route } from "./+types/root"
import { Links, Meta, Outlet, Scripts, ScrollRestoration, redirect } from "react-router"
import "~/assets/theme.css"
import { HttpError } from "~/lib/http/errors"
import { HttpStatus } from "~/lib/http/status"
import { getQueryClient } from "~/lib/query/client"
import { QueryDevtools } from "~/lib/query/devtools"
import { QueryProvider } from "~/lib/query/provider"
import { ThemeProvider } from "~/lib/theme/provider"
import { Toaster } from "~/lib/ui/sonner"
import { Spinner } from "~/lib/ui/spinner"
import { TooltipProvider } from "~/lib/ui/tooltip"
import { authQueries } from "~/state/auth/query"

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const queryClient = getQueryClient()
  const url = new URL(request.url)
  const pathname = url.pathname

  const publicRoutes = ["/signin", "/signup"]
  const isPublicRoute = publicRoutes.includes(pathname)

  try {
    const [me] = await Promise.all([
      queryClient.ensureQueryData(authQueries.me()),
      queryClient.ensureQueryData(authQueries.token()),
    ])

    if (isPublicRoute) {
      return redirect("/home")
    }

    return { me }
  } catch (error) {
    if (HttpError.is(error)) {
      const status = error.response.status
      
      if (
        status === HttpStatus.Unauthorized ||
        HttpStatus.isClientError(status)
      ) {
        if (isPublicRoute) {
          return null
        }
        
        return redirect("/signin")
      }

      if (HttpStatus.isServerError(status)) {
        throw error
      }
    }

    throw error
  }
}

export const meta: Route.MetaFunction = () => [
  { charSet: "utf-8" },
  { name: "viewport", content: "width=device-width, initial-scale=1" },
  { title: "Affable" },
]

export const links: Route.LinksFunction = () => [{ rel: "icon", href: "/favicon.ico" }]

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
  return (
    <div className="flex size-full items-center justify-center">
      <Spinner className="size-36" />
    </div>
  )
}

export default function App() {
  return <Outlet />
}
