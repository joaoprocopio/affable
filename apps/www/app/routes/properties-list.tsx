import { useQuery } from "@tanstack/react-query"
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table"
import { CloudAlert, Home, MoveDown, MoveUp, Plus } from "lucide-react"
import * as React from "react"
import { Link } from "react-router"
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
import { propertiesQueries } from "~/state/properties/query"
import type { TPropertyOut } from "~/state/properties/schemas"
import { formatCurrency, pluralize } from "~/utils/format"
import * as is from "~/utils/is"

export default function PropertiesListRoute() {
  const properties = useQuery(propertiesQueries.list())

  const isLoading = properties.isLoading
  const isEmpty = properties.isSuccess && is.isEmpty(properties.data)

  const hasError = properties.isError
  const hasData = properties.isSuccess && !is.isEmpty(properties.data)

  return (
    <>
      <AppHeader>
        <AppHeaderSidebarTrigger />
        <AppHeaderBreadcrumb />

        {hasData && (
          <Badge variant="secondary" className="tabular-nums">
            {properties.data?.length}
          </Badge>
        )}

        <Button
          className="ml-auto"
          variant="secondary"
          size="sm"
          nativeButton={false}
          render={<Link to="/add" />}>
          <Plus />
          <span>Add a property</span>
        </Button>
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
                {is.isFn(properties.error.toString)
                  ? properties.error.toString()
                  : String(properties.error.message)}
              </code>
            </EmptyDescription>
          </EmptyContent>
        </Empty>
      )}

      {isEmpty && (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Home />
            </EmptyMedia>

            <EmptyTitle>No properties yet</EmptyTitle>
            <EmptyDescription>
              You haven&apos;t created any properties yet. Get started by creating your first
              project.
            </EmptyDescription>
          </EmptyHeader>

          <EmptyContent>
            <Button variant="secondary" nativeButton={false} render={<Link to="/add" />}>
              <Plus />
              <span>Add a property</span>
            </Button>
          </EmptyContent>
        </Empty>
      )}

      {hasData && <PropertiesTable />}
    </>
  )
}

function PropertiesTable() {
  const properties = useQuery(propertiesQueries.list())

  const [sorting, setSorting] = React.useState<SortingState>([])

  const table = useReactTable({
    columns: columns,
    data: properties.data!,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
  })

  const rowsCount = table.getRowModel().rows.length

  return (
    <TableContainer>
      <Table className="[&_tr>:first-child]:pl-container [&_tr>:last-child]:pr-container [&_tr>:nth-child(1)]:min-max-w-28 [&_tr]:hover:bg-[unset]">
        <TableCaption>{`${rowsCount} ${pluralize(rowsCount, { one: "row", other: "rows" })}`}</TableCaption>

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
          {!properties.isLoading &&
            properties.isSuccess &&
            table.getRowModel().rows.map((row) => (
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

const columns = [
  {
    id: "thumbnail",
    header: "",
    accessorKey: "coverPhotoUrl",
    enableSorting: false,
    cell: (props) => (
      <div className="relative size-16 overflow-hidden rounded-lg border">
        <img className="absolute inset-0 size-full" src={props.getValue<string>()} />
      </div>
    ),
  },
  {
    id: "name",
    header: "Name",
    accessorKey: "name",
  },
  {
    id: "baseRate",
    header: "Base rate",
    accessorKey: "baseRate",
    cell: (props) => formatCurrency(props.getValue<number>()),
  },
  {
    id: "country",
    header: "Country",
    accessorKey: "country",
  },
  {
    id: "state",
    header: "State",
    accessorKey: "state",
  },
  {
    id: "city",
    header: "City",
    accessorKey: "city",
  },
  {
    id: "street",
    header: "Street",
    accessorKey: "street",
  },
  {
    id: "unit",
    header: "Unit",
    accessorKey: "unit",
  },
] as const satisfies ColumnDef<TPropertyOut>[]
