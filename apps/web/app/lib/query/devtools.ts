import * as React from "react"

export const QueryDevtools = React.lazy(async () => {
  const { ReactQueryDevtools } = await import("@tanstack/react-query-devtools")

  return { default: ReactQueryDevtools }
})
