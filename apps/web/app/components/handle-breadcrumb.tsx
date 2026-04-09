import * as React from "react"
import { useMatches } from "react-router"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/lib/ui/breadcrumb"
import { isNil } from "~/utils/is"

export function HandleBreadcrumb() {
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
