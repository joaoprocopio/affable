import { defineKey, defineKeys, defineQueries } from "~/lib/query/utils/define"
import { queryOptions } from "~/lib/query/utils/options"
import * as metricsServices from "~/state/metrics/services"

export type TMetricsNamespace = "metrics"

export const metricsQueryKeys = defineKeys<TMetricsNamespace>()({
  summary: () => defineKey("metrics", "summary"),
})

export const metricsQueries = defineQueries<TMetricsNamespace>()({
  summary: () =>
    queryOptions({
      queryKey: metricsQueryKeys.summary(),
      queryFn: metricsServices.getMetrics,
    }),
})
