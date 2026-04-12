import { useQuery } from "@tanstack/react-query"
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table"
import { Plus } from "lucide-react"
import * as React from "react"
import { Link } from "react-router"
import { AppHeader, AppHeaderBreadcrumb, AppHeaderSidebarTrigger } from "~/components/app-header"
import { getQueryClient } from "~/lib/query/client"
import { Button } from "~/lib/ui/button"
import { Spinner } from "~/lib/ui/spinner"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from "~/lib/ui/table"
import { propertiesQueries } from "~/state/properties/query"
import type { TPropertyOut } from "~/state/properties/schemas"
import { formatCurrency } from "~/utils/format"

export async function clientLoader() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(propertiesQueries.list())
}

export default function PropertiesListRoute() {
  const properties = useQuery(propertiesQueries.list())

  const [sorting, setSorting] = React.useState<SortingState>([])

  const table = useReactTable({
    columns: columns,
    data: properties.data!,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  })

  return (
    <div>
      <AppHeader>
        <AppHeaderSidebarTrigger />
        <AppHeaderBreadcrumb />

        <Button className="ml-auto" size="sm" nativeButton={false} render={<Link to="/add" />}>
          <Plus />
          <span>Add a property</span>
        </Button>
      </AppHeader>

      <TableContainer>
        <Table>
          <TableHeader className="bg-background backdrop-blue sticky inset-x-0 z-1">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
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

      {properties.isSuccess && <pre>{JSON.stringify(properties.data, null, 4)}</pre>}
    </div>
  )
}

const columns = [
  {
    id: "thumbnail",
    header: "",
    accessorKey: "coverPhotoUrl",
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
    id: "country",
    header: "Country",
    accessorKey: "country",
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
  {
    id: "baseRate",
    header: "Base rate",
    accessorKey: "baseRate",
    cell: (props) => formatCurrency(props.getValue<number>()),
  },
] as const satisfies ColumnDef<TPropertyOut>[]
