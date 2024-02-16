"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellActions from "./cell-actions";

export type EmployeeColumn = {
  id: string;
  name: string | null; //TODO: enforce these types
  email: string | null
  phone: string | null
  position: string | null
  department: string
};

export const columns: ColumnDef<EmployeeColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    header: "Department",
    accessorKey: "department",
  },
  {
    accessorKey: "position",
    header: "Position",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellActions data={row.original} />,
  },
];
