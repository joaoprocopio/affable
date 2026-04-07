import * as React from "react"
import { env } from "~/env"

export const QueryDevtools = env.DEV
  ? React.lazy(async () => {
      const { ReactQueryDevtools } = await import("@tanstack/react-query-devtools")

      return { default: ReactQueryDevtools }
    })
  : () => undefined
