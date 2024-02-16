import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { UserCard } from "@/components/user-card";
import { useAlertModal } from "@/hooks/use-alert-modal ";
import { Department, User } from "@prisma/client";
import { Building, Edit2, Plus, PlusCircle, TrashIcon } from "lucide-react";
import Link from "next/link";


interface Props {
  department: Department & { members: User[] }
  setSelectedDepartment: any //TODO: this is a react setState function I dont know its signature right now
}


const DepartmentCard: React.FC<Props> = ({ department, setSelectedDepartment }) => {
  const onOpen = useAlertModal((state) => state.onOpen);

  const handleDelete = () => {
    setSelectedDepartment(() => {
      onOpen()
      return department
    })
  }

  return (
    <Card className="px-4">
      {/* <Heading title={department.name} Icon={Building} CallToAction={() =>
        <Button variant='outline' className="rounded-full p-4">
          <Edit2 size={10} />
        </Button>
      } /> */}
      <CardHeader className="px-0 py-2">
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <Building size={24} />
            <CardTitle className="font-medium">{department.name}</CardTitle>
          </div>
          <div className="flex space-x-2 mt-3">
            <Button asChild variant='outline' className="rounded-full p-4 border-gray-600">
              <Link href={`/company/departments/${department.id}/edit`}>
                <Edit2 size={10} />
              </Link>
            </Button>
            <Button variant='outline' className="rounded-full p-4  border-gray-600" onClick={handleDelete}>
              <TrashIcon size={10} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-0 mt-[-10px] max-w-screen-lg">
        <div className="flex space-x-2 items-center my-2">
          <h1 className="text-gray-600">Department members ({department.members.length})</h1>
          {/* TODO: not priority */}
          {/* <Button variant='ghost' className="p-0 hover:bg-transparent border-gray-600">
            <PlusCircle size={25} color="#aaa" />
          </Button> */}
        </div>
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex w-max space-x-4 px-0 py-4">
            {
              department.members.map((member,) => (
                <UserCard key={`members-${member.id}`} user={member} />
              ))
            }
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

export default DepartmentCard