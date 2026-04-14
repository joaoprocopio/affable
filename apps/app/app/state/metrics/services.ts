import type { QueryFunctionContext } from "@tanstack/react-query"
import { globalFetcher } from "~/lib/http/global"
import { MetricsResponse } from "~/state/metrics/schemas"

export async function getMetrics(context: QueryFunctionContext) {
  const response = await globalFetcher("/v1/metrics", {
    signal: context.signal,
  })
  const json = await response.json()

  return MetricsResponse.parse(json)
}
