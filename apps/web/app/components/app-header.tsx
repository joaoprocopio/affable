import * as React from "react"
import { Link, useMatches, type UIMatch } from "react-router"
import {
  Breadcrumb,
  BreadcrumbLink,
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
  const matches = (useMatches() as UIMatch<unknown, Handle>[]).filter(
    (match) => !isNil(match.handle?.breadcrumb),
  )

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {matches.map((match, index) =>
          index === matches.length - 1 ? (
            <BreadcrumbPage key={match.pathname}>{match.handle!.breadcrumb}</BreadcrumbPage>
          ) : (
            <React.Fragment key={match.pathname}>
              <BreadcrumbLink render={<Link to={match.pathname} />}>
                {match.handle!.breadcrumb}
              </BreadcrumbLink>
              <BreadcrumbSeparator />
            </React.Fragment>
          ),
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
