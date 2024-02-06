"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellActions from "./cell-actions";


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
