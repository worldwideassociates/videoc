'use client'

import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CustomAvatar } from "../custom-avatar"
import { User } from "@prisma/client"





interface UserCardProps {
  user: User;
  isModerator?: boolean | null
  isManager?: boolean
  isOnline?: boolean
}

export default function StatsCard({ user, isOnline, isModerator }: UserCardProps) {

  const initials = user.name?.split(' ').map((n) => n[0]).join('') || ''

  const truncatedName = user.name?.length! > 15 ? user.name?.slice(0, 15) + '...' : user.name //hack: cant figure out css truncation

  return (
    <div className="flex space-x-2 justify-between items-center">
      <div className="flex space-x-2 items-center">
        <CustomAvatar image={user.image || undefined} isOnline={isOnline} initials={initials} />
        <div className="flex flex-col">
          <h1 className="text-bold text-gray-400 text-sm">{user.role}</h1>
          <h1 className="text-bold text-md leading-3 pt-1 overflow-hidden overflow-ellipsis whitespace-nowrap">{truncatedName}</h1>
        </div>
      </div>
      {isModerator && <Badge className="text-xs rounded-md">Moderator</Badge>}
    </div>
  )
}

