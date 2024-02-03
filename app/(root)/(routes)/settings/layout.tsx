import { SettingsNav } from "./_components/nav";


interface Props {
  children: React.ReactNode
}



const SettingsLayout: React.FC<Props> = ({ children }) => {

  const isActive = (href: string) => {
    return window.location.pathname === href;
  }

  return (
    <div className="hidden space-y-6 p-10 pb-16 md:block">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <div
        data-orientation="horizontal"
        role="none"
        className="shrink-0 bg-border h-[1px] w-full my-6"
      ></div>

      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <SettingsNav />
      </div>
    </div>
  )
}


export default SettingsLayout;