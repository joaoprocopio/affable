import * as z from "zod"

export const MetricsRange = z.object({
  start: z.string(),
  end: z.string(),
})

export type TMetricsRangeIn = z.input<typeof MetricsRange>
export type TMetricsRangeOut = z.output<typeof MetricsRange>

export const MetricsTotals = z.object({
  reservations: z.number().optional(),
  revenue: z.number().optional(),
  nights: z.number().optional(),
  guests: z.number().optional(),
  new: z.number().optional(),
  modified: z.number().optional(),
  cancelled: z.number().optional(),
})

export type TMetricsTotalsIn = z.input<typeof MetricsTotals>
export type TMetricsTotalsOut = z.output<typeof MetricsTotals>

export const MetricsTimeseriesItem = z.object({
  date: z.string(),
  reservations: z.number().optional(),
  revenue: z.number().optional(),
  nights: z.number().optional(),
  guests: z.number().optional(),
  new: z.number().optional(),
  modified: z.number().optional(),
  cancelled: z.number().optional(),
})

export type TMetricsTimeseriesItemIn = z.input<typeof MetricsTimeseriesItem>
export type TMetricsTimeseriesItemOut = z.output<typeof MetricsTimeseriesItem>

export const MetricsTimeseries = z.array(MetricsTimeseriesItem)

export type TMetricsTimeseriesIn = z.input<typeof MetricsTimeseries>
export type TMetricsTimeseriesOut = z.output<typeof MetricsTimeseries>

export const MetricsProvider = z.object({
  provider: z.string(),
  reservations: z.number().optional(),
  revenue: z.number().optional(),
})

export type TMetricsProviderIn = z.input<typeof MetricsProvider>
export type TMetricsProviderOut = z.output<typeof MetricsProvider>

export const MetricsProviders = z.array(MetricsProvider)

export type TMetricsProvidersIn = z.input<typeof MetricsProviders>
export type TMetricsProvidersOut = z.output<typeof MetricsProviders>

export const MetricsStatus = z.object({
  status: z.string(),
  count: z.number().optional(),
})

export type TMetricsStatusIn = z.input<typeof MetricsStatus>
export type TMetricsStatusOut = z.output<typeof MetricsStatus>

export const MetricsStatuses = z.array(MetricsStatus)

export type TMetricsStatusesIn = z.input<typeof MetricsStatuses>
export type TMetricsStatusesOut = z.output<typeof MetricsStatuses>

export const MetricsQueue = z.object({
  pending: z.number().optional(),
  processing: z.number().optional(),
  failed: z.number().optional(),
  lastRunAt: z.string().optional(),
  lastSuccessAt: z.string().optional(),
  lastRunDurationMs: z.number().optional(),
  processed: z.number().optional(),
})

export type TMetricsQueueIn = z.input<typeof MetricsQueue>
export type TMetricsQueueOut = z.output<typeof MetricsQueue>

export const MetricsEmail = z.object({
  pending: z.number().optional(),
  sent: z.number().optional(),
  failed: z.number().optional(),
  lastSentAt: z.string().optional(),
})

export type TMetricsEmailIn = z.input<typeof MetricsEmail>
export type TMetricsEmailOut = z.output<typeof MetricsEmail>

export const Metrics = z.object({
  range: MetricsRange.nullable().optional(),
  totals: MetricsTotals.nullable().optional(),
  timeseries: MetricsTimeseries.nullable().optional(),
  providers: MetricsProviders.nullable().optional(),
  statuses: MetricsStatuses.nullable().optional(),
  queue: MetricsQueue.nullable().optional(),
  email: MetricsEmail.nullable().optional(),
})

export type TMetricsIn = z.input<typeof Metrics>
export type TMetricsOut = z.output<typeof Metrics>

export const MetricsResponse = z
  .union([Metrics, z.object({ data: Metrics })])
  .transform((value) => ("data" in value ? value.data : value))

export type TMetricsResponseIn = z.input<typeof MetricsResponse>
export type TMetricsResponseOut = z.output<typeof MetricsResponse>
