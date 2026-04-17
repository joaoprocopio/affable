import { useQuery } from "@tanstack/react-query"
import { ChartLine, MailCheck, Timer } from "lucide-react"
import * as React from "react"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { AppHeader, AppHeaderBreadcrumb, AppHeaderSidebarTrigger } from "~/components/app-header"
import { getQueryClient } from "~/lib/query/client"
import { Badge } from "~/lib/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/lib/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "~/lib/ui/chart"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "~/lib/ui/empty"
import { metricsQueries } from "~/state/metrics/query"
import type { TMetricsTimeseriesItemOut } from "~/state/metrics/schemas"
import { formatCurrency, formatDate, formatDateRange, formatDateTime } from "~/utils/format"
import { isEmpty } from "~/utils/validators"

export async function clientLoader() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(metricsQueries.summary())
}

export const handle: Handle = {
  breadcrumb: "Metrics",
}

export default function MetricsRoute() {
  const metrics = useQuery(metricsQueries.summary())
  const data = metrics.data

  const timeseries = data?.timeseries ?? []
  const providers = data?.providers ?? []
  const statuses = data?.statuses ?? []
  const queue = data?.queue
  const email = data?.email

  const derivedTotals = React.useMemo(() => aggregateTotals(timeseries), [timeseries])
  const totals = React.useMemo(
    () => ({ ...derivedTotals, ...(data?.totals ?? {}) }),
    [derivedTotals, data?.totals],
  )

  const rangeLabel = React.useMemo(() => {
    if (data?.range?.start && data?.range?.end) {
      return formatDateRange(data.range.start, data.range.end, {
        month: "short",
        day: "2-digit",
      })
    }

    if (timeseries.length) {
      const first = timeseries[0]
      const last = timeseries[timeseries.length - 1]

      return formatDateRange(first.date, last.date, {
        month: "short",
        day: "2-digit",
      })
    }

    return "All time"
  }, [data?.range, timeseries])

  const lastRunLabel = React.useMemo(() => {
    const lastRun = queue?.lastRunAt ?? queue?.lastSuccessAt

    if (!lastRun) {
      return undefined
    }

    return `Last run ${formatDateTime(lastRun)}`
  }, [queue?.lastRunAt, queue?.lastSuccessAt])

  const hasMetrics =
    Boolean(timeseries.length) ||
    Boolean(providers.length) ||
    Boolean(statuses.length) ||
    Boolean(data?.totals) ||
    Boolean(queue) ||
    Boolean(email)

  return (
    <>
      <AppHeader>
        <AppHeaderSidebarTrigger />
        <AppHeaderBreadcrumb />
        <div className="ml-auto flex items-center gap-2">
          {rangeLabel ? (
            <Badge variant="secondary" className="tabular-nums">
              {rangeLabel}
            </Badge>
          ) : null}
          {lastRunLabel ? (
            <Badge variant="outline" className="tabular-nums">
              {lastRunLabel}
            </Badge>
          ) : null}
        </div>
      </AppHeader>

      <div className="px-container mx-auto flex w-full max-w-6xl flex-col gap-6 py-6 pb-16">
        {!hasMetrics && metrics.isSuccess ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <ChartLine />
              </EmptyMedia>
              <EmptyTitle>No metrics yet</EmptyTitle>
              <EmptyDescription>
                Metrics will appear once the reservation queue starts ingesting data.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <MetricCard
                title="Reservations"
                value={formatMetricValue(totals.reservations)}
                caption="Total in range"
              />
              <MetricCard
                title="Revenue"
                value={formatCurrencyValue(totals.revenue)}
                caption="Gross booking value"
              />
              <MetricCard
                title="Nights"
                value={formatMetricValue(totals.nights)}
                caption="Booked nights"
              />
              <MetricCard
                title="Guests"
                value={formatMetricValue(totals.guests)}
                caption="Total guests"
              />
            </div>

            <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
              <Card>
                <CardHeader>
                  <CardTitle>Reservations over time</CardTitle>
                  <CardDescription>New, modified, and cancelled activity</CardDescription>
                </CardHeader>
                <CardContent>
                  {timeseries.length ? (
                    <ChartContainer config={volumeChartConfig} className="aspect-auto h-72 w-full">
                      <AreaChart data={timeseries} margin={{ left: 0, right: 0, top: 10 }}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                          dataKey="date"
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={formatAxisDate}
                          interval="preserveStartEnd"
                        />
                        <YAxis
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={formatCompactNumber}
                        />
                        <ChartTooltip
                          content={
                            <ChartTooltipContent
                              indicator="line"
                              labelFormatter={(value) => formatDate(String(value))}
                            />
                          }
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Area
                          dataKey="reservations"
                          type="monotone"
                          stroke="var(--color-reservations)"
                          fill="var(--color-reservations)"
                          fillOpacity={0.18}
                        />
                        <Area
                          dataKey="new"
                          type="monotone"
                          stroke="var(--color-new)"
                          fill="var(--color-new)"
                          fillOpacity={0.12}
                        />
                        <Area
                          dataKey="cancelled"
                          type="monotone"
                          stroke="var(--color-cancelled)"
                          fill="var(--color-cancelled)"
                          fillOpacity={0.1}
                        />
                      </AreaChart>
                    </ChartContainer>
                  ) : (
                    <ChartEmptyState label="Awaiting timeseries data" />
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Provider mix</CardTitle>
                  <CardDescription>Reservation volume by channel</CardDescription>
                </CardHeader>
                <CardContent>
                  {providers.length ? (
                    <ChartContainer
                      config={providerChartConfig}
                      className="aspect-auto h-72 w-full">
                      <BarChart data={providers} margin={{ left: 0, right: 0, top: 10 }}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                          dataKey="provider"
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={formatProvider}
                        />
                        <YAxis
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={formatCompactNumber}
                        />
                        <ChartTooltip
                          content={
                            <ChartTooltipContent
                              indicator="dot"
                              labelFormatter={(value) => formatProvider(String(value))}
                            />
                          }
                        />
                        <Bar
                          dataKey="reservations"
                          radius={[6, 6, 0, 0]}
                          fill="var(--color-reservations)"
                        />
                      </BarChart>
                    </ChartContainer>
                  ) : (
                    <ChartEmptyState label="Awaiting provider data" />
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              <Card>
                <CardHeader>
                  <CardTitle>Status breakdown</CardTitle>
                  <CardDescription>Reservation lifecycle mix</CardDescription>
                </CardHeader>
                <CardContent>
                  {statuses.length ? (
                    <ChartContainer config={statusChartConfig} className="aspect-auto h-64 w-full">
                      <BarChart data={statuses} margin={{ left: 0, right: 0, top: 10 }}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                          dataKey="status"
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={formatStatus}
                        />
                        <YAxis
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={formatCompactNumber}
                        />
                        <ChartTooltip
                          content={
                            <ChartTooltipContent
                              indicator="dot"
                              labelFormatter={(value) => formatStatus(String(value))}
                            />
                          }
                        />
                        <Bar dataKey="count" radius={[6, 6, 0, 0]} fill="var(--color-count)" />
                      </BarChart>
                    </ChartContainer>
                  ) : (
                    <ChartEmptyState label="Awaiting status data" />
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Queue and email</CardTitle>
                  <CardDescription>Scheduler, worker, and delivery stats</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="flex flex-col gap-3">
                      <div className="text-muted-foreground flex items-center gap-2 text-xs font-medium uppercase">
                        <Timer className="size-4" />
                        Queue
                      </div>
                      <MetricRow label="Pending" value={queue?.pending} />
                      <MetricRow label="Processing" value={queue?.processing} />
                      <MetricRow label="Failed" value={queue?.failed} />
                      <MetricRow label="Processed" value={queue?.processed} />
                      <MetricRow
                        label="Last run"
                        value={queue?.lastRunAt ? formatDateTime(queue.lastRunAt) : undefined}
                      />
                    </div>

                    <div className="flex flex-col gap-3">
                      <div className="text-muted-foreground flex items-center gap-2 text-xs font-medium uppercase">
                        <MailCheck className="size-4" />
                        Email
                      </div>
                      <MetricRow label="Pending" value={email?.pending} />
                      <MetricRow label="Sent" value={email?.sent} />
                      <MetricRow label="Failed" value={email?.failed} />
                      <MetricRow
                        label="Last sent"
                        value={email?.lastSentAt ? formatDateTime(email.lastSentAt) : undefined}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </>
  )
}

function MetricCard({ title, value, caption }: { title: string; value: string; caption?: string }) {
  return (
    <Card size="sm">
      <CardHeader className="gap-2">
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums">{value}</CardTitle>
        {caption ? <div className="text-muted-foreground text-xs">{caption}</div> : null}
      </CardHeader>
    </Card>
  )
}

function MetricRow({ label, value }: { label: string; value?: number | string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium tabular-nums">{formatMetricValue(value)}</span>
    </div>
  )
}

function ChartEmptyState({ label }: { label: string }) {
  return (
    <div className="text-muted-foreground flex h-56 items-center justify-center rounded-lg border border-dashed text-sm">
      {label}
    </div>
  )
}

function aggregateTotals(timeseries: TMetricsTimeseriesItemOut[]) {
  return timeseries.reduce(
    (acc, item) => {
      acc.reservations += item.reservations ?? 0
      acc.revenue += item.revenue ?? 0
      acc.nights += item.nights ?? 0
      acc.guests += item.guests ?? 0
      acc.new += item.new ?? 0
      acc.modified += item.modified ?? 0
      acc.cancelled += item.cancelled ?? 0
      return acc
    },
    {
      reservations: 0,
      revenue: 0,
      nights: 0,
      guests: 0,
      new: 0,
      modified: 0,
      cancelled: 0,
    },
  )
}

const volumeChartConfig = {
  reservations: { label: "Reservations", color: "var(--chart-1)" },
  new: { label: "New", color: "var(--chart-2)" },
  cancelled: { label: "Cancelled", color: "var(--chart-5)" },
}

const providerChartConfig = {
  reservations: { label: "Reservations", color: "var(--chart-3)" },
}

const statusChartConfig = {
  count: { label: "Reservations", color: "var(--chart-4)" },
}

const providerLabels: Record<string, string> = {
  "airbnb": "Airbnb",
  "vrbo": "Vrbo",
  "booking": "Booking.com",
  "booking.com": "Booking.com",
}

const statusLabels: Record<string, string> = {
  new: "New",
  modified: "Modified",
  cancelled: "Cancelled",
  canceled: "Cancelled",
  confirmed: "Confirmed",
  acknowledged: "Acknowledged",
  pending: "Pending",
  no_show: "No show",
  noshow: "No show",
}

function formatProvider(value?: string | null) {
  if (!value) {
    return "Unknown"
  }

  const normalized = normalizeFilterValue(value)

  if (providerLabels[normalized]) {
    return providerLabels[normalized]
  }

  return toTitleCase(normalized)
}

function formatStatus(value?: string | null) {
  if (!value) {
    return "Unknown"
  }

  const normalized = normalizeFilterValue(value)

  if (statusLabels[normalized]) {
    return statusLabels[normalized]
  }

  return toTitleCase(normalized)
}

function normalizeFilterValue(value?: string | null) {
  return value?.toLowerCase().trim() ?? ""
}

function toTitleCase(value: string) {
  return value
    .replace(/[_-]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

function formatAxisDate(value: string) {
  return formatDate(value, { month: "short", day: "2-digit" })
}

function formatMetricValue(value?: number | string) {
  if (typeof value === "number") {
    return formatNumber(value)
  }

  if (typeof value === "string" && value.length) {
    return value
  }

  return "-"
}

function formatCurrencyValue(value?: number) {
  if (typeof value !== "number") {
    return "-"
  }

  return formatCurrency(value)
}

function formatNumber(value: number) {
  return new Intl.NumberFormat(undefined).format(value)
}

function formatCompactNumber(value: number | string) {
  const numeric = typeof value === "number" ? value : Number(value)

  if (!Number.isFinite(numeric)) {
    return String(value)
  }

  return new Intl.NumberFormat(undefined, { notation: "compact" }).format(numeric)
}
