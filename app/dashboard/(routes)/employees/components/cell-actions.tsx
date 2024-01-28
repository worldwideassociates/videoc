"use client";

import { useState, useTransition } from "react";
import { Check, Copy, Edit, MoreHorizontal, Trash, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { EmployeeColumn } from "./columns";

interface CellActionsProps {
  data: EmployeeColumn;
}

const CellActions: React.FC<CellActionsProps> = ({ data }) => {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const params = useParams();

  // const onCopy = (id: string) => {
  //   navigator.clipboard.writeText(id);
  //   toast.success("Product ID copied to clipboard.");
  // };

  // const handleChangeStatus = (status: AffiliateStatus) => {
  //   startTransition(async () => {
  //     const result = await updateAffiliateStatus(data.id, status);
  //     if (result) {
  //       toast.success("Updated successfully.");
  //     } else {
  //       toast.error("Something went wrong.");
  //     }
  //   });
  // };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="h-8 w-8 p-0" variant={"ghost"}>
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => { }}>
            <Trash className="h-4 w-4 mr-2" />
            Cancel
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellActions;
