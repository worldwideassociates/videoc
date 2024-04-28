import { Locale } from "@/i18n.config";

interface Props {
  children: React.ReactNode;
  params: { lang: Locale };
}

const CollaboratorLayout: React.FC<Props> = async ({ children }) => {
  return (
    <div className="hidden space-y-6  md:block">
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default CollaboratorLayout;
