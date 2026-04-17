import * as React from "react"
import { cn } from "~/lib/ui/utils"

function TableContainer({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="table-container"
      className={cn("relative w-full overflow-auto", className)}
      {...props}
    />
  )
}

function Table({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="table"
      className={cn(
        "[&_tr>:first-child]:pl-container [&_tr>:last-child]:pr-container w-full text-sm [&_tr>*]:truncate",
        className,
      )}
      {...props}
    />
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="table-header" className={cn("border-b", className)} {...props} />
}

function TableBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="table-footer" className={cn("bg-muted/50 font-medium", className)} {...props} />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="table-row"
      className={cn(
        "has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted transition-colors",
        className,
      )}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="table-head"
      className={cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0",
        className,
      )}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="table-cell"
      className={cn("p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0", className)}
      {...props}
    />
  )
}

function TableCaption({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  )
}

export {
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
