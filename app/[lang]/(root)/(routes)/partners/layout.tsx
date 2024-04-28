import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import Sidebar from "./_components/sidebar";

interface Props {
  children: React.ReactNode;
  params: { lang: Locale };
}

const CompanyLayout: React.FC<Props> = async ({ children, params }) => {
  const { partners: t } = (await getDictionary(params.lang)) as any;

  return (
    <main className="relative">
      <div className="flex">
        <Sidebar t={t} locale={params.lang} />
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-16 max-md:pb-14 sm:px-14">
          <div className="w-full">{children}</div>
        </section>
      </div>
    </main>
  );
};

export default CompanyLayout;
