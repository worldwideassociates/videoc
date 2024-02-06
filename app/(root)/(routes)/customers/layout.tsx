import { CustomerNav } from "./_components/nav";


interface Props {
  children: React.ReactNode
}



const CustomerLayout: React.FC<Props> = ({ children }) => {

  return (
    <div className="hidden space-y-6 p-10 py-5 md:block">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Customer Information</h2>
        <p className="text-muted-foreground">
          Manage your customer information here.
        </p>
      </div>
      <div
        data-orientation="horizontal"
        role="none"
        className="shrink-0 bg-border h-[1px] w-full my-6"
      ></div>

      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <CustomerNav />

        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  )
}


export default CustomerLayout;