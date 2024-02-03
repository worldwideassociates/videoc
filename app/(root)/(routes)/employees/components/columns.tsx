"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellActions from "./cell-actions";
import { cn } from "@/lib/utils";
import Link from "next/link";

const StatusColors: Record<string, string> = {
  PENDING: "text-yellow-500",
  APPROVED: "text-green-500",
  DENIED: "text-red-500",
};

export type EmployeeColumn = {
  id: string;
  name: string | null; //TODO: enforce these types
  email: string | null
};

export const columns: ColumnDef<EmployeeColumn>[] = [
  {
    accessorKey: "firstName",
    header: "First name",
    // cell: ({ row }) => (
    //   <Link href={`/employees/${row.original.id}`} className="hover:underline">
    //     {row.original.name}
    //   </Link>
    // ),
  },
  {
    accessorKey: "lastName",
    header: "Last name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "createdAt",
    header: "Joined on",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellActions data={row.original} />,
  },
];
