"use client";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Department, User } from '@prisma/client';
import { useDepartmentFormModal } from "@/hooks/use-department-form-modal";
import { DepartmentCard } from "./_components/department-card";
import { AlertModal } from "@/components/modals/alert-modal";
import { useAlertModal } from "@/hooks/use-alert-modal ";
import { useState } from "react";
import { deleteDepartment } from "@/actions/departments";
import { useToast } from "@/components/ui/use-toast";

interface Props {
  data: (Department & { members: User[] })[];
}

export const DepartmentClient: React.FC<Props> = ({ data }) => {
  const [deleting, setDeleting] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null)

  const { toast } = useToast()

  const onOpen = useDepartmentFormModal((state) => state.onOpen);
  const isOpen = useAlertModal((state) => state.isOpen);
  const onClose = useAlertModal((state) => state.onClose);

  const onDelete = async () => {
    setDeleting(true)

    const result = await deleteDepartment(selectedDepartment?.id as number)
    if (result.success) {
      toast({
        title: 'Success',
        description: 'Department deleted successfully',
      })
    } else {
      toast({
        title: 'Oops',
        description: result.message,
      })
    }

    setSelectedDepartment(null)
    setDeleting(false)
    onClose()
    location.reload()

  }



  return (
    <>
      <AlertModal loading={deleting} isOpen={isOpen} onClose={onClose} onConfirm={onDelete} />
      <Heading
        title={`Departments (${data.length})`}
        description="Manage departments of the company"
        CallToAction={() =>
          <Button onClick={onOpen} className="rounded-full">
            <Plus size={20} />
          </Button>}
      />
      <div className="flex flex-col space-y-2">
        {
          data.map((department) => (
            <DepartmentCard key={department.id} department={department} setSelectedDepartment={setSelectedDepartment} />
          ))
        }
      </div>
    </>
  );
};