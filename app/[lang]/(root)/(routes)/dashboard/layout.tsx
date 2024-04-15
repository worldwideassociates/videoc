import { Metadata } from "next";
import { ReactNode } from "react";
import Sidebar from "./_components/sidebar";
import { getDictionary } from "@/lib/dictionary";
import { Locale } from "@/i18n.config";

export const metadata: Metadata = {};

interface PageProps {
  params: {
    lang: Locale;
  };

  children: ReactNode;
}

const DashboardLayout: React.FC<PageProps> = async ({ children, params }) => {
  const { meetings: t } = (await getDictionary(params.lang)) as any;

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

export default DashboardLayout;
