'use client'

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


interface StatsCardProps {
  title: string;
  description: string;
  footerText: string
}

export default function StatsCard({ title, description, footerText }: StatsCardProps) {
  return (
    <Card className="w-[300px] rounded-2xl p-0">
      <CardHeader className="space-y-0 pb-0">
        <CardTitle className="text-md font-light py-0">{title}</CardTitle>
        <CardDescription className="font-medium text-3xl text-dark">{description}</CardDescription>
      </CardHeader>
      <CardFooter className="text-gray-400">
        {footerText}
      </CardFooter>
    </Card>
  )
}
