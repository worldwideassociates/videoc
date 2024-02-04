import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface HeadingProps {
  title: string;
  description: string;
  CallToAction?: React.ComponentType;
}

const Heading: React.FC<HeadingProps> = ({ title, description, CallToAction }) => {
  return (
    <CardHeader className="px-0">
      <div className="flex items-between align-center border-b border-gray-300 pb-5">
        <div className="flex-1">
          <CardTitle className="font-medium">{title}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground ">{description}</CardDescription>
        </div>
        {
          CallToAction && <CallToAction />
        }
      </div>
    </CardHeader>
  );
};


export default Heading;