import { QueryClient, environmentManager } from "@tanstack/react-query"
import * as React from "react"
import { isNil } from "~/utils/validators"

let browserQueryClient: QueryClient | undefined

export const STALE_TIME_IN_SECS = 300 // 5min = 300s
export const STALE_TIME_IN_MS = STALE_TIME_IN_SECS * 1000

const makeQueryClient = React.cache(() => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: STALE_TIME_IN_MS,
        throwOnError: (error, query) => {
          console.error(query, error)
          return false
        },
      },
      mutations: {
        throwOnError: (error) => {
          console.error(error)
          return false
        },
      },
    },
  })
})

export function getQueryClient() {
  if (environmentManager.isServer()) {
    return makeQueryClient()
  }

  if (isNil(browserQueryClient)) {
    browserQueryClient = makeQueryClient()
  }

  return browserQueryClient
}
