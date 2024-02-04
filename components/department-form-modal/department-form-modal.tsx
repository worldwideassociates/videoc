'use client'

import { useDepartmentFormModal } from "@/hooks/use-department-form-modal";
import { Modal } from "@/components/ui/modal";
import { BuildingIcon } from "lucide-react";
import { DepartmentForm } from "../department-form";
import { useEffect, useState } from "react";
import { User } from "@prisma/client";
import { getEmployees } from "@/actions/users";



interface Props {

}

const DepartmentFormModal: React.FC<Props> = (props) => {
  const departmentFormModal = useDepartmentFormModal();
  const [employees, setEmployees] = useState<User[]>([])

  const fetchEmployees = async () => {
    const result = await getEmployees();
    setEmployees(result);
  }

  useEffect(() => {
    fetchEmployees()
  }, [employees])


  return (
    <>
      <Modal
        title="Create Department"
        description="add a new company department."
        isOpen={departmentFormModal.isOpen}
        onClose={departmentFormModal.onClose}
        Icon={BuildingIcon}
      >
        <DepartmentForm usersOptions={employees} />
      </Modal >
    </>
  )
}


export default DepartmentFormModal;