"use client";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Department } from '@prisma/client';
import { useDepartmentFormModal } from "@/hooks/use-department-form-modal";

interface Props {
  data: Department[];
}

export const DepartmentClient: React.FC<Props> = ({ data }) => {
  const onOpen = useDepartmentFormModal((state) => state.onOpen);

  return (
    <>
      <Heading
        title={`Departments (${data.length})`}
        description="Manage departments of the company"
        CallToAction={() =>
          <Button onClick={onOpen} className="rounded-full">
            <Plus size={24} />
          </Button>}
      />
    </>
  );
};