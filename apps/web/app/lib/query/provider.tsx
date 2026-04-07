import { QueryClientProvider, type QueryClientProviderProps } from "@tanstack/react-query"
import { getQueryClient } from "~/lib/query/client"

export function QueryProvider({
  client = getQueryClient(),
  children,
}: Partial<QueryClientProviderProps>) {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
