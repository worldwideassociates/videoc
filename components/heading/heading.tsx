import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface HeadingProps {
  title: string;
  description: string;
}

const Heading: React.FC<HeadingProps> = ({ title, description }) => {
  return (


    <CardHeader className="px-0">
      <CardTitle className="font-medium">{title}</CardTitle>
      <CardDescription className="text-sm text-muted-foreground border-b border-gray-300 pb-5">{description}</CardDescription>
    </CardHeader>
  );
};


export default Heading;