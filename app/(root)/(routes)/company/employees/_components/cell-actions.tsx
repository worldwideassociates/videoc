"use client";

import { Edit, EyeIcon, MoreHorizontal, Trash, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { EmployeeColumn } from "./columns";
import Link from "next/link";
import { useAlertModal } from "@/hooks/use-alert-modal ";
import { useCurrentUser } from "@/hooks/use-current-user";

interface CellActionsProps {
  data: EmployeeColumn;
}

const CellActions: React.FC<CellActionsProps> = ({ data }) => {

  const onOpen = useAlertModal((state) => state.onOpen);
  const setCurrentUser = useCurrentUser((state) => state.setCurrentUser);


  const onDelete = () => {
    setCurrentUser(data);
    onOpen();
  }


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
          <DropdownMenuItem asChild>
            <Link href={`/company/employees/${data.id}`}>
              <EyeIcon className="h-4 w-4 mr-2" />
              View
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/company/employees/${data.id}/edit`}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onDelete}>
            <Trash className="h-4 w-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellActions;
