"use client";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { BuildingIcon, Plus } from "lucide-react";
import { Department, User } from "@prisma/client";
import { DepartmentCard } from "./_components/department-card";
import { AlertModal } from "@/components/modals/alert-modal";
import { useAlertModal } from "@/hooks/use-alert-modal ";
import { useEffect, useState } from "react";
import { deleteDepartment } from "@/actions/departments";
import { useToast } from "@/components/ui/use-toast";
import { LocaleProvider } from "@/providers/locale-provider";
import { useModal } from "@/hooks/use-modal";
import { Modal } from "@/components/ui/modal";
import { getUsersWithoutDepartment } from "@/actions/users";
import { DepartmentForm } from "./_components/department-form";
import { Separator } from "@/components/ui/separator";

interface Props {
  data: (Department & { members: User[] })[];
  t: Record<string, any>;
}

export const DepartmentClient: React.FC<Props> = ({ data, t }) => {
  const [deleting, setDeleting] = useState(false);
  const [selectedDepartment, setSelectedDepartment] =
    useState<Department | null>(null);
  const [userOptions, setUserOptions] = useState<User[]>([]);

  const { toast } = useToast();

  const isOpen = useAlertModal((state) => state.isOpen);
  const onClose = useAlertModal((state) => state.onClose);

  const modal = useModal();

  const onDelete = async () => {
    setDeleting(true);

    const result = await deleteDepartment(selectedDepartment?.id as string);
    if (result.success) {
      toast({
        title: "Success",
        description: "Department deleted successfully",
      });
    } else {
      toast({
        title: "Oops",
        description: result.message,
      });
    }

    setSelectedDepartment(null);
    setDeleting(false);
    onClose();
    location.reload();
  };

  const fetchUserOptions = async () => {
    const users = await getUsersWithoutDepartment();
    setUserOptions(users);
  };

  useEffect(() => {
    fetchUserOptions();
  }, []);

  return (
    <LocaleProvider dictionary={t}>
      <AlertModal
        loading={deleting}
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={onDelete}
      />
      <Modal
        title={t.formModal.title}
        Icon={BuildingIcon}
        isOpen={modal.isOpen}
        onClose={modal.onClose}
      >
        <Separator className="mb-5" />
        <DepartmentForm usersOptions={userOptions} t={t} />
      </Modal>
      <Heading
        title={`${t.header.title} (${data.length})`}
        description={t.header.subTitle}
        CallToAction={() => (
          <Button
            onClick={modal.onOpen}
            variant="ghost"
            className="rounded-full"
          >
            <Plus size={20} />
          </Button>
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        {data.map((department) => (
          <DepartmentCard
            key={department.id}
            department={department}
            setSelectedDepartment={setSelectedDepartment}
          />
        ))}
      </div>
    </LocaleProvider>
  );
};
