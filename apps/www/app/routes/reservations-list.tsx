import { useQuery } from "@tanstack/react-query"
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table"
import { useWindowVirtualizer } from "@tanstack/react-virtual"
import { CloudAlert, DoorOpen, MoveDown, MoveUp } from "lucide-react"
import * as React from "react"
import { AppHeader, AppHeaderBreadcrumb, AppHeaderSidebarTrigger } from "~/components/app-header"
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
import { Spinner } from "~/lib/ui/spinner"
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
import { formatCurrency, formatDateRange, formatDateTime, pluralize } from "~/utils/format"
import * as validators from "~/utils/validators"

export default function ReservationsRoute() {
  const reservations = useQuery(reservationsQueries.list())

  const isLoading = reservations.isLoading
  const isEmpty = reservations.isSuccess && validators.isEmpty(reservations.data)

  const hasError = reservations.isError
  const hasData = reservations.isSuccess && !validators.isEmpty(reservations.data)

  return (
    <>
      <AppHeader>
        <AppHeaderSidebarTrigger />
        <AppHeaderBreadcrumb />
        {hasData && (
          <Badge variant="secondary" className="tabular-nums">
            {reservations.data.length}
          </Badge>
        )}
      </AppHeader>

      {isLoading && (
        <Empty>
          <EmptyContent>
            <Spinner className="size-12" />
          </EmptyContent>
        </Empty>
      )}

      {hasError && (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <CloudAlert />
            </EmptyMedia>
          </EmptyHeader>

          <EmptyContent>
            <EmptyTitle>Unexpected error occurred</EmptyTitle>

            <EmptyDescription>
              <code>
                {validators.isFn(reservations.error.toString)
                  ? reservations.error.toString()
                  : String(reservations.error.message)}
              </code>
            </EmptyDescription>
          </EmptyContent>
        </Empty>
      )}

      {isEmpty && (
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
      )}

      {hasData && <ReservationsTable />}
    </>
  )
}

function ReservationsTable() {
  const reservations = useQuery(reservationsQueries.list())

  const [sorting, setSorting] = React.useState<SortingState>([])

  const table = useReactTable({
    columns: columns,
    data: reservations.data!,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
  })

  const { rows } = table.getRowModel()

  const virtualizer = useWindowVirtualizer({
    count: rows.length,
    estimateSize: () => 70,
    overscan: 10,
  })

  return (
    <TableContainer
      className="overflow-y-hidden"
      style={{ height: `${virtualizer.getTotalSize()}px` }}>
      <Table className="[&_tr>:first-child]:pl-container [&_tr>:last-child]:pr-container [&_tr]:hover:bg-[unset]">
        <TableCaption>{`${rows.length} ${pluralize(rows.length, { one: "row", other: "rows" })}`}</TableCaption>

        <TableHeader>
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
          {virtualizer.getVirtualItems().map((vrow, iterindex) => {
            const row = rows[vrow.index]
            const ypos = vrow.start - iterindex * vrow.size
            console.log(ypos)

            return (
              <TableRow
                key={row.id}
                style={{
                  height: `${vrow.size}px`,
                  transform: `translateY(${ypos}px)`,
                }}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
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
    cell: ({ row }) => <Badge variant="outline">{formatProvider(row.original.provider)}</Badge>,
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
  "airbnb": "Airbnb",
  "vrbo": "Vrbo",
  "booking": "Booking.com",
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
  no_show: "No show",
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
