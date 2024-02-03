import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";






interface Props {

}

const CompanyProfileForm: React.FC<Props> = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-medium">Profile</CardTitle>
        <CardDescription className="text-sm text-muted-foreground border-b border-gray-300 pb-5">Company profile information</CardDescription>        {/* <Separator /> */}
      </CardHeader>

    </Card>
  );
}


export default CompanyProfileForm;