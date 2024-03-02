import { getDictionary } from "@/lib/dictionary";
import { CollaboratorNav } from "./_components/nav";
import { Locale } from "@/i18n.config";


interface Props {
  children: React.ReactNode
  params: { lang: Locale }
}



const CollaboratorLayout: React.FC<Props> = async ({ children, params }) => {


  const { collaborators: t } = await getDictionary(params.lang) as any;

  return (
    <div className="hidden space-y-6 p-10 py-5 md:block">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">{t.header.title}</h2>
        <p className="text-muted-foreground">{t.header.subTitle}</p>
      </div>
      <div
        data-orientation="horizontal"
        role="none"
        className="shrink-0 bg-border h-[1px] w-full my-6"
      ></div>

      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        {/* <CollaboratorNav /> */}

        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  )
}


export default CollaboratorLayout;