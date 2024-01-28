import { Card } from "@/components/ui/card";
import { EmployeeColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

interface Props {
  data: EmployeeColumn[];
}

export const EmployeeClient: React.FC<Props> = ({ data }) => {
  return (
    <>
      <h1 className="text-3xl font-bold">Employees</h1>
      <p className="text-muted-foreground mb-5">
        Manage you employee listing
      </p>

      <DataTable columns={columns} data={data} searchKey="name" />
    </>
  );
};
