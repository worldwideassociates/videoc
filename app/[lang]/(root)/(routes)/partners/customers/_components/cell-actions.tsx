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
import { CustomerColumn } from "./columns";
import Link from "next/link";
import { useAlertModal } from "@/hooks/use-alert-modal ";
import { useCurrentUser } from "@/hooks/use-current-user";
import { User } from "@prisma/client";
import { LocaleContext } from "@/providers/locale-provider";
import { use } from "react";

interface CellActionsProps {
  data: CustomerColumn;
}

const CellActions: React.FC<CellActionsProps> = ({ data }) => {
  const onOpen = useAlertModal((state) => state.onOpen);
  const setCurrentuser = useCurrentUser((state) => state.setCurrentUser);

  const onDelete = () => {
    setCurrentuser(data as User);
    onOpen();
  };

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

  const { dictionary: t } = use(LocaleContext);
  const { locale } = use(LocaleContext);

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
          <DropdownMenuLabel>{t.table.actions.title}</DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <Link href={`/${locale}/partners/customers/${data.id}/details`}>
              <EyeIcon className="h-4 w-4 mr-2" />
              {t.table.actions.view}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/${locale}/partners/customers/${data.id}/edit`}>
              <Edit className="h-4 w-4 mr-2" />
              {t.table.actions.edit}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onDelete}>
            <Trash className="h-4 w-4 mr-2" />
            {t.table.actions.delete}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellActions;
