"use client";


import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table";
import CellActions from "./cell-actions";
import { Button } from "@/components/ui/button";


export type CustomerColumn = {
  id: string;
  name: string | null; //TODO: enforce these types
  // email: string | null
  // phone: string | null
  // position: string | null
  // department: string
  profession: string | null
  vatNumber: string | null
  localTaxOffice: string | null
  address: string | null
};

export const getColumns = (t: Record<string, any>): ColumnDef<CustomerColumn>[] => {
  return ([
    {
      accessorKey: "name",
      header: t.form.fields.name.label,
      // header: ({ column }) => {
      //   return (
      //     <Button
      //       variant="ghost"
      //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      //     >
      //       Email
      //       <ArrowUpDown className="ml-2 h-4 w-4" />
      //     </Button>
      //   )
      // },
    },

    {
      accessorKey: "profession",
      header: t.form.fields.profession.label,
    },
    {
      accessorKey: "vatNumber",
      header: t.form.fields.vatNumber.label,
    },
    {
      accessorKey: "localTaxOffice",
      header: t.form.fields.localTaxOffice.label,
    },
    {
      accessorKey: "address",
      header: t.form.fields.address.label,
    },
    {
      id: "actions",
      cell: ({ row }) => <CellActions data={row.original} />,
    },
  ])
}