import { StatsCard } from "@/components/stats-card";
import { Button } from "@/components/ui/button";
import { CardHeader } from "@/components/ui/card";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="flex flex-col space-y-">
      <div className="">
        <CardHeader className="px-0">
          <div className="flex space-x-2">
            <div className="">
              <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
              <p className="text-muted-foreground">
                Welcome to your dashboard.
              </p>
            </div>
          </div>
        </CardHeader>
        <div className="flex space-x-2">
          <StatsCard title="Total Minutes" description="1,234 min" footerText="+20% since yesterday" />
        </div>
      </div>
      <div className="">
        <CardHeader className="px-0">
          <div className="flex space-x-2 items-center">
            <div className="">
              <h2 className="text-xl font-bold tracking-tight">Upcoming meetings</h2>
              <p className="text-muted-foreground">
                Meetings scheduled for today.
              </p>
            </div>
            {/* <Button variant="outline" asChild className="rounded-full">
              <Link href='/rooms/new'>
                <Plus size={24} />
              </Link>
            </Button> */}
          </div>
        </CardHeader>
        <div className="flex space-x-2">
        </div>
      </div>
      <div className="">
        <CardHeader className="px-0">
          <div className="flex space-x-2 items-center">
            <div className="">
              <h2 className="text-xl font-bold tracking-tight">Scheduled Meetings</h2>
              <p className="text-muted-foreground">
                All meetings scheduled for the next 7 days.
              </p>
            </div>
            <Button variant="outline" asChild className="rounded-full">
              <Link href='/meetings/schedule'>
                <Plus size={24} />
              </Link>
            </Button>
          </div>
        </CardHeader>
        <div className="flex space-x-2">
        </div>
      </div>
    </div>
  )
}

