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

export const columns: ColumnDef<CustomerColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
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
    header: "Profession",
  },
  {
    accessorKey: "vatNumber",
    header: "VAT Number",
  },
  {
    header: "Local Tax Office",
    accessorKey: "localTaxOffice",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellActions data={row.original} />,
  },
];
