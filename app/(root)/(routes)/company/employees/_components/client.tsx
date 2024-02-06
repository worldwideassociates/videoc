"use client";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AlertModal } from "@/components/modals/alert-modal";
import { useAlertModal } from "@/hooks/use-alert-modal ";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { DataTable } from "@/components/ui/data-table";
import { EmployeeColumn, columns } from "./columns";
import { User } from "@prisma/client";
import { deleteUser } from "@/actions/users";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  data: EmployeeColumn[];
}

export const EmployeeClient: React.FC<Props> = ({ data }) => {
  const [deleting, setDeleting] = useState(false)
  const [selectedEmmployee, setSelectedEmployee] = useState<User | null>(null)

  const { toast } = useToast()

  const isOpen = useAlertModal((state) => state.isOpen);
  const onClose = useAlertModal((state) => state.onClose);
  const currentEmployee = useCurrentUser((state) => state.currentUser);

  const onDelete = async () => {
    setDeleting(true)

    const result = await deleteUser(currentEmployee.id)
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

    setSelectedEmployee(null)
    setDeleting(false)
    onClose()
    location.reload()

  }



  return (
    <>
      <AlertModal loading={deleting} isOpen={isOpen} onClose={onClose} onConfirm={onDelete} />

      <Card>
        <CardHeader className="flex space-x-3 flex-row items-center justify-between">
          <div className="">

            <CardTitle className="text-3xl">Employees ({data.length})</CardTitle>

          </div>
          <div className="flex space-x-1">
            {/* TODO: More buttons as needed */}
            <Button variant="link" asChild className="rounded-full border-gray-600 p-4">
              <Link href='/customers/new'>
                <Plus size={25} />
              </Link>
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <DataTable searchKey="name" columns={columns} data={data} />
        </CardContent>

      </Card>
    </>
  );
};