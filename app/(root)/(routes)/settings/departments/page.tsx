



interface Props {

}


const DepartmentsPage: React.FC<Props> = () => {

  const departments = []
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <DepartmentClient />
      </div>
    </div>
  )
}