import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface HeadingProps {
  title: string;
  description?: string;
  CallToAction?: React.ComponentType;
  Icon?: React.ComponentType | React.ElementType;
}

const Heading: React.FC<HeadingProps> = ({
  title,
  description,
  CallToAction,
  Icon,
}) => {
  return (
    <CardHeader className="p-0">
      <div className="flex items-between align-center border-gray-300 pb-5">
        <div className="flex flex-1">
          {Icon && <Icon className="mr-2" size={24} />}
          <div className="flex-1">
            <CardTitle className="font-medium mb-1">{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
        </div>
        {CallToAction && <CallToAction />}
      </div>
    </CardHeader>
  );
};

export default Heading;
