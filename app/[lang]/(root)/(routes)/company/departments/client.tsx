"use client";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Department, User } from "@prisma/client";
import { DepartmentCard } from "./_components/department-card";
import { AlertModal } from "@/components/modals/alert-modal";
import { useAlertModal } from "@/hooks/use-alert-modal ";
import { use, useState } from "react";
import { deleteDepartment } from "@/actions/departments";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { LocaleContext, LocaleProvider } from "@/providers/locale-provider";

interface Props {
  data: (Department & { members: User[] })[];
  t: Record<string, any>;
}

export const DepartmentClient: React.FC<Props> = ({ data, t }) => {
  const [deleting, setDeleting] = useState(false);
  const [selectedDepartment, setSelectedDepartment] =
    useState<Department | null>(null);

  const { locale } = use(LocaleContext);

  const { toast } = useToast();

  const isOpen = useAlertModal((state) => state.isOpen);
  const onClose = useAlertModal((state) => state.onClose);

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

  return (
    <LocaleProvider dictionary={t}>
      <AlertModal
        loading={deleting}
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={onDelete}
      />
      <Heading
        title={`${t.header.title} (${data.length})`}
        description={t.header.subTitle}
        CallToAction={() => (
          <Button asChild variant="ghost" className="rounded-full">
            <Link href={`/${locale}/company/departments/new`}>
              <Plus size={20} />
            </Link>
          </Button>
        )}
      />

      <div className="flex flex-col space-y-2">
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
