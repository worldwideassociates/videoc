'use client'

import { useDepartmentFormModal } from "@/hooks/use-department-form-modal";
import { Modal } from "@/components/ui/modal";
import { BuildingIcon } from "lucide-react";
import { DepartmentForm } from "../../app/(root)/(routes)/company/departments/_components/department-form";
import { useEffect, useState } from "react";
import { User } from "@prisma/client";
import { getUsersWithoutDepartment } from "@/actions/users";



interface Props {

}

const DepartmentFormModal: React.FC<Props> = (props) => {
  const departmentFormModal = useDepartmentFormModal();
  const [users, setUsers] = useState<User[]>([])

  const fetchUsers = async () => {
    const result = await getUsersWithoutDepartment()
    setUsers(result);
  }

  useEffect(() => {
    fetchUsers()
  }, [users])


  return (
    <>
      <Modal
        title="Create Department"
        description="add a new company department."
        isOpen={departmentFormModal.isOpen}
        onClose={departmentFormModal.onClose}
        Icon={BuildingIcon}
      >
        <DepartmentForm usersOptions={users} />
      </Modal >
    </>
  )
}


export default DepartmentFormModal;