'use client'

import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CustomAvatar } from "../custom-avatar"




type User = {
  firstName: string
  lastName: string
  profileImageUrl?: string
  role: string
}

interface UserCardProps {
  user: User;
  isModerator: boolean
  isOnline: boolean
}

export default function StatsCard({ user, isOnline, isModerator }: UserCardProps) {
  return (
    <div className="flex space-x-2 justify-between items-center">
      <div className="flex space-x-2 items-center">
        <CustomAvatar image={user.profileImageUrl} isOnline={isOnline} initials={`${user.firstName[0]}${user.lastName[0]}`} />
        <div className="flex flex-col">
          <h1 className="text-bold text-gray-400 text-sm">{user.role}</h1>
          <h1 className="text-bold text-md leading-3 overflow-hidden overflow-ellipsis whitespace-nowrap">{`${user.firstName} ${user.lastName}`}</h1>
        </div>
      </div>
      {isModerator && <Badge className="text-xs rounded-md">Moderator</Badge>}
    </div>
  )
}

