import { useQuery } from "@tanstack/react-query"
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table"
import { DoorOpen, Mail, MoveDown, MoveUp, Search } from "lucide-react"
import * as React from "react"
import { AppHeader, AppHeaderBreadcrumb, AppHeaderSidebarTrigger } from "~/components/app-header"
import { getQueryClient } from "~/lib/query/client"
import { Alert, AlertDescription, AlertTitle } from "~/lib/ui/alert"
import { Badge } from "~/lib/ui/badge"
import { Button } from "~/lib/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "~/lib/ui/empty"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "~/lib/ui/input-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/lib/ui/select"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from "~/lib/ui/table"
import { reservationsQueries } from "~/state/reservations/query"
import type { TReservationOut } from "~/state/reservations/schemas"
import { formatCurrency, formatDateRange, formatDateTime } from "~/utils/format"
import { isEmpty } from "~/utils/is"

export async function clientLoader() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(reservationsQueries.list())
}

export const handle: Handle = {
  breadcrumb: "Reservations",
}

export default function ReservationsRoute() {
  const reservations = useQuery(reservationsQueries.list())

  const [search, setSearch] = React.useState("")
  const [provider, setProvider] = React.useState("all")
  const [status, setStatus] = React.useState("all")

  const reservationData = reservations.data ?? []

  const providers = React.useMemo(() => {
    return Array.from(
      new Set(
        reservationData
          .map((item) => normalizeFilterValue(item.provider))
          .filter(Boolean),
      ),
    ).sort()
  }, [reservationData])

  const statuses = React.useMemo(() => {
    return Array.from(
      new Set(reservationData.map((item) => normalizeFilterValue(item.status)).filter(Boolean)),
    ).sort()
  }, [reservationData])

  const filteredReservations = React.useMemo(() => {
    if (isEmpty(reservationData)) {
      return []
    }

    const query = search.trim().toLowerCase()

    return reservationData.filter((item) => {
      const matchesProvider =
        provider === "all" || normalizeFilterValue(item.provider) === provider
      const matchesStatus = status === "all" || normalizeFilterValue(item.status) === status

      if (!matchesProvider || !matchesStatus) {
        return false
      }

      if (!query.length) {
        return true
      }

      const reference = getReservationReference(item)
      const propertyName = item.property?.name ?? ""
      const guestName = item.guest?.name ?? ""

      return [reference, item.id, propertyName, guestName]
        .filter(Boolean)
        .some((value) => value.toString().toLowerCase().includes(query))
    })
  }, [reservationData, provider, status, search])

  const hasData = !isEmpty(reservationData)
  const hasResults = !isEmpty(filteredReservations)
  const hasFilters = Boolean(search.trim().length || provider !== "all" || status !== "all")

  return (
    <>
      <AppHeader>
        <AppHeaderSidebarTrigger />
        <AppHeaderBreadcrumb />
        {hasData && (
          <Badge variant="secondary" className="tabular-nums">
            {filteredReservations.length}
          </Badge>
        )}
      </AppHeader>

      <div className="px-container mx-auto flex w-full max-w-6xl flex-col gap-6 py-6 pb-16">
        <Alert>
          <Mail className="text-muted-foreground" />
          <AlertTitle>Queue-driven ingestion</AlertTitle>
          <AlertDescription>
            New reservations are fetched by the scheduler and queued for email delivery. Once a
            reservation is acknowledged, it will show as synced in the status column.
          </AlertDescription>
        </Alert>

        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <InputGroup className="md:max-w-sm">
            <InputGroupAddon align="inline-start">
              <InputGroupText>
                <Search />
              </InputGroupText>
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Search by reservation, guest, or property"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </InputGroup>

          <div className="flex flex-wrap items-center gap-2">
            <Select value={provider} onValueChange={setProvider}>
              <SelectTrigger size="sm">
                <SelectValue placeholder="Provider" />
              </SelectTrigger>
              <SelectContent align="end">
                <SelectItem value="all">All providers</SelectItem>
                {providers.map((value) => (
                  <SelectItem key={value} value={value}>
                    {formatProvider(value)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger size="sm">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent align="end">
                <SelectItem value="all">All statuses</SelectItem>
                {statuses.map((value) => (
                  <SelectItem key={value} value={value}>
                    {formatStatus(value)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {!hasData ? (
          <ReservationsEmpty />
        ) : hasResults ? (
          <ReservationsTable data={filteredReservations} />
        ) : (
          <ReservationsNoResults
            onReset={() => {
              setSearch("")
              setProvider("all")
              setStatus("all")
            }}
            showReset={hasFilters}
          />
        )}
      </div>
    </>
  )
}

function ReservationsTable({ data }: { data: TReservationOut[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([])

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
  })

  return (
    <TableContainer>
      <Table className="[&_tr>:first-child]:pl-container [&_tr>:last-child]:pr-container [&_tr>*]:truncate">
        <TableCaption>{`${table.getRowModel().rows.length.toLocaleString()} rows`}</TableCaption>

        <TableHeader className="bg-background backdrop-blue sticky inset-x-0 z-1">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const canSort = header.column.getCanSort()
                const isSorted = header.column.getIsSorted()
                const sortingOrder = header.column.getNextSortingOrder()
                const title = canSort
                  ? sortingOrder === "asc"
                    ? "Sort ascending"
                    : sortingOrder === "desc"
                      ? "Sort descending"
                      : "Clear sort"
                  : undefined

                return (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    <Button
                      disabled={!canSort}
                      className="[&_svg]:text-muted-foreground"
                      variant="ghost"
                      size="sm"
                      title={title}
                      onClick={header.column.getToggleSortingHandler()}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}

                      {isSorted === "asc" ? (
                        <MoveUp />
                      ) : isSorted === "desc" ? (
                        <MoveDown />
                      ) : undefined}
                    </Button>
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} data-state={row.getIsSelected() ? "selected" : undefined}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

function ReservationsEmpty() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <DoorOpen />
        </EmptyMedia>
        <EmptyTitle>No reservations yet</EmptyTitle>
        <EmptyDescription>
          Your queue will start populating once the scheduler fetches new bookings.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}

function ReservationsNoResults({ onReset, showReset }: { onReset: () => void; showReset: boolean }) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <DoorOpen />
        </EmptyMedia>
        <EmptyTitle>No matches</EmptyTitle>
        <EmptyDescription>Try adjusting your search or filter selections.</EmptyDescription>
      </EmptyHeader>
      {showReset && (
        <EmptyContent>
          <Button variant="secondary" size="sm" onClick={onReset}>
            Reset filters
          </Button>
        </EmptyContent>
      )}
    </Empty>
  )
}

const columns = [
  {
    id: "reservation",
    header: "Reservation",
    accessorFn: (row) => getReservationReference(row),
    cell: ({ row }) => {
      const reservation = row.original
      const reference = getReservationReference(reservation)
      const secondaryId = reference !== reservation.id ? reservation.id : undefined

      return (
        <div className="flex flex-col gap-1">
          <span className="font-medium tabular-nums">{reference}</span>
          {secondaryId ? (
            <span className="text-muted-foreground font-mono text-xs">{secondaryId}</span>
          ) : null}
        </div>
      )
    },
  },
  {
    id: "property",
    header: "Property",
    accessorFn: (row) => row.property?.name ?? row.property?.id ?? "",
    cell: ({ row }) => {
      const propertyName = row.original.property?.name
      const propertyId = row.original.property?.id

      if (!propertyName && !propertyId) {
        return <span className="text-muted-foreground">Unlinked</span>
      }

      return (
        <div className="flex flex-col gap-1">
          <span className="font-medium">{propertyName ?? propertyId}</span>
          {propertyName && propertyId ? (
            <span className="text-muted-foreground font-mono text-xs">{propertyId}</span>
          ) : null}
        </div>
      )
    },
  },
  {
    id: "provider",
    header: "Provider",
    accessorFn: (row) => row.provider,
    cell: ({ row }) => (
      <Badge variant="outline">{formatProvider(row.original.provider)}</Badge>
    ),
  },
  {
    id: "stay",
    header: "Stay",
    accessorFn: (row) => row.checkIn ?? "",
    cell: ({ row }) => {
      const reservation = row.original
      const nights = getReservationNights(reservation)

      return (
        <div className="flex flex-col gap-1">
          <span className="font-medium">
            {formatDateRange(reservation.checkIn, reservation.checkOut, {
              month: "short",
              day: "2-digit",
            })}
          </span>
          {typeof nights === "number" ? (
            <span className="text-muted-foreground text-xs">{`${nights} night${
              nights === 1 ? "" : "s"
            }`}</span>
          ) : null}
        </div>
      )
    },
  },
  {
    id: "guest",
    header: "Guest",
    accessorFn: (row) => row.guest?.name ?? "",
    cell: ({ row }) => {
      const guestName = row.original.guest?.name
      const guests = row.original.guests

      return (
        <div className="flex flex-col gap-1">
          <span className="font-medium">{guestName || "Guest"}</span>
          {typeof guests === "number" ? (
            <span className="text-muted-foreground text-xs">{`${guests} guest${
              guests === 1 ? "" : "s"
            }`}</span>
          ) : null}
        </div>
      )
    },
  },
  {
    id: "total",
    header: "Total",
    accessorFn: (row) => row.total ?? 0,
    cell: ({ row }) => {
      const total = row.original.total
      const currency = row.original.currency ?? "USD"

      if (typeof total !== "number") {
        return <span className="text-muted-foreground">-</span>
      }

      return <span className="font-medium">{formatCurrency(total, currency)}</span>
    },
  },
  {
    id: "status",
    header: "Status",
    accessorFn: (row) => row.status,
    cell: ({ row }) => {
      const reservation = row.original
      const status = normalizeFilterValue(reservation.status)
      const acknowledgedAt = reservation.acknowledgedAt

      return (
        <div className="flex flex-col gap-1">
          <Badge variant={statusVariant(status)}>{formatStatus(reservation.status)}</Badge>
          {acknowledgedAt ? (
            <span className="text-muted-foreground text-xs">
              Acked {formatDateTime(acknowledgedAt)}
            </span>
          ) : null}
        </div>
      )
    },
  },
  {
    id: "received",
    header: "Received",
    accessorFn: (row) => row.createdAt ?? row.bookedAt ?? "",
    cell: ({ row }) => {
      const value = row.original.createdAt ?? row.original.bookedAt

      if (!value) {
        return <span className="text-muted-foreground">-</span>
      }

      return <span className="font-medium">{formatDateTime(value)}</span>
    },
  },
] as const satisfies ColumnDef<TReservationOut>[]

function normalizeFilterValue(value?: string | null) {
  return value?.toLowerCase().trim() ?? ""
}

function getReservationReference(reservation: TReservationOut) {
  return reservation.externalId ?? reservation.channelReservationId ?? reservation.id
}

function getReservationNights(reservation: TReservationOut) {
  if (typeof reservation.nights === "number") {
    return reservation.nights
  }

  if (!reservation.checkIn || !reservation.checkOut) {
    return undefined
  }

  const checkIn = new Date(reservation.checkIn)
  const checkOut = new Date(reservation.checkOut)

  if (Number.isNaN(checkIn.getTime()) || Number.isNaN(checkOut.getTime())) {
    return undefined
  }

  const diff = (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)

  if (!Number.isFinite(diff)) {
    return undefined
  }

  return Math.max(0, Math.round(diff))
}

const providerLabels: Record<string, string> = {
  airbnb: "Airbnb",
  vrbo: "Vrbo",
  booking: "Booking.com",
  "booking.com": "Booking.com",
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

const statusLabels: Record<string, string> = {
  new: "New",
  modified: "Modified",
  cancelled: "Cancelled",
  canceled: "Cancelled",
  confirmed: "Confirmed",
  acknowledged: "Acknowledged",
  pending: "Pending",
  "no_show": "No show",
  noshow: "No show",
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

function statusVariant(value?: string | null) {
  switch (value) {
    case "new":
      return "default"
    case "modified":
      return "secondary"
    case "cancelled":
    case "canceled":
    case "no_show":
    case "noshow":
      return "destructive"
    case "confirmed":
      return "outline"
    case "acknowledged":
      return "ghost"
    default:
      return "secondary"
  }
}

function toTitleCase(value: string) {
  return value
    .replace(/[_-]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}
