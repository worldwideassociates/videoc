import { SettingsNav } from "./company-profile/_components/nav";


interface Props {
  children: React.ReactNode
}



const SettingsLayout: React.FC<Props> = ({ children }) => {

  return (
    <div className="hidden space-y-6 p-10 py-5 md:block">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Company Information</h2>
        <p className="text-muted-foreground">
          Details about the company, departments, and more
        </p>
      </div>
      <div
        data-orientation="horizontal"
        role="none"
        className="shrink-0 bg-border h-[1px] w-full my-6"
      ></div>

      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <SettingsNav />

        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  )
}


export default SettingsLayout;