import type { Route } from "./+types/root"
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router"
import "~/assets/theme.css"
import { ThemeProvider } from "~/lib/theme/provider"
import { TooltipProvider } from "~/lib/ui/tooltip"

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
        <ThemeProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}
