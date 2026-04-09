import * as React from "react"
import { useMatches } from "react-router"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/lib/ui/breadcrumb"
import { cn } from "~/lib/ui/utils"
import { isNil } from "~/utils/is"

export function AppHeader({ className, children, ...props }: React.ComponentProps<"header">) {
  return (
    <header
      className={cn("flex items-center justify-between border-b px-6 py-2", className)}
      {...props}>
      {children}
    </header>
  )
}

export function AppHeaderBreadcrumb() {
  const matches = useMatches()
  const breadcrumbs = matches
    .map((match) => (match.handle as Handle)?.breadcrumb)
    .filter((breadcrumb) => !isNil(breadcrumb))

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, index) =>
          index === breadcrumbs.length - 1 ? (
            <BreadcrumbPage key={breadcrumb}>{breadcrumb}</BreadcrumbPage>
          ) : (
            <React.Fragment key={breadcrumb}>
              <BreadcrumbItem>{breadcrumb}</BreadcrumbItem>
              <BreadcrumbSeparator />
            </React.Fragment>
          ),
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
