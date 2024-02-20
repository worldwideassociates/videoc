"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellActions from "./cell-actions";

export type EmployeeColumn = {
  id: string;
  name: string | null; //TODO: enforce these types
  email: string | null;
  phone: string | null;
  position: string | null;
  department: string;
};

export const getColumns = (
  t: Record<string, any>
): ColumnDef<EmployeeColumn>[] => {
  return [
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
      accessorKey: "position",
      header: t.form.fields.position.label,
    },

    {
      accessorKey: "department",
      header: t.form.fields.department.label,
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
  ];
};
