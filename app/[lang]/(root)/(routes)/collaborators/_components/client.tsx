"use client";

import { Button } from "@/components/ui/button";
import { ImportIcon, Plus } from "lucide-react";
import { AlertModal } from "@/components/modals/alert-modal";
import { useAlertModal } from "@/hooks/use-alert-modal ";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { DataTable } from "@/components/ui/data-table";
import { CollaboratorColumn, getColumns } from "./columns";
import { User } from "@prisma/client";
import { deleteUser } from "@/actions/users";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LocaleProvider } from "@/providers/locale-provider";

interface Props {
  data: CollaboratorColumn[];
  t: Record<string, any>;
}

export const CollaboratorClient: React.FC<Props> = ({ data, t }) => {
  const [deleting, setDeleting] = useState(false)

  const { toast } = useToast()

  const isOpen = useAlertModal((state) => state.isOpen);
  const onClose = useAlertModal((state) => state.onClose);
  const currentCollaborator = useCurrentUser((state) => state.currentUser);

  const onDelete = async () => {
    setDeleting(true)

    const result = await deleteUser(currentCollaborator.id)
    if (result.success) {
      toast({
        title: 'Success',
        description: result.message,
      })
    } else {
      toast({
        title: 'Oops',
        description: result.message,
      })
    }

    setDeleting(false)
    onClose()
    location.reload()

  }

  return (
    <LocaleProvider dictionary={t} >
      <AlertModal loading={deleting} isOpen={isOpen} onClose={onClose} onConfirm={onDelete} />
      <Card>
        <CardHeader className="flex space-x-3 flex-row items-center justify-between">
          <div className="">

            <CardTitle className="text-3xl">Collaborators ({data.length})</CardTitle>

          </div>
          <div className="flex space-x-1">
            <Button variant="link" asChild className="rounded-full border-gray-600 p-4">
              <Link href='/collaborators/import'>
                <ImportIcon size={25} />
              </Link>
            </Button>
            <Button variant="link" asChild className="rounded-full border-gray-600 p-4">
              <Link href='/collaborators/new'>
                <Plus size={25} />
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable columns={getColumns(t)} data={data} />
        </CardContent>
      </Card>
    </LocaleProvider>
  );
};