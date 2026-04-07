import { QueryClientProvider, type QueryClientProviderProps } from "@tanstack/react-query"
import { getQueryClient } from "~/lib/query/client"

export function QueryProvider({
  children,
  client = getQueryClient(),
}: Partial<QueryClientProviderProps>) {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
