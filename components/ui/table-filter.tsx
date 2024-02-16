"use client"

import * as React from "react"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const labels = [
  "feature",
  "bug",
  "enhancement",
  "documentation",
  "design",
  "question",
  "maintenance",
]

export function TableFilter({
  setSearchColumn,
  columns,
  children
}: {
  setSearchColumn: any,
  children: React.ReactNode,
  columns: any[]
}) {

  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex w-[400px] flex-col items-start justify-between rounded-md border p-0 sm:flex-row sm:items-center">
      <p className="text-sm font-medium leading-none">
        {children}
      </p>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <DotsHorizontalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuLabel>Select filter column</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {
              columns.map((column) => (
                <DropdownMenuItem
                  key={column.accessorKey}
                  onSelect={() => setSearchColumn(column)}
                >
                  {column.header}
                </DropdownMenuItem>
              ))
            }
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
