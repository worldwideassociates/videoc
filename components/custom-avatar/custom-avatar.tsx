"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface Props extends React.HTMLAttributes<HTMLElement> {
  image?: string;
  isOnline?: boolean;
  initials: string;
}

const CustomAvatar: React.FC<Props> = ({
  image,
  isOnline,
  initials,
  ...props
}) => {
  const placeholder = `${process.env.NEXT_PUBLIC_BUNNY_CDN_BASE_URL}/assets/profile-placeholder.png`;

  //set an image placeholder if the is no image and there is not initials
  image = image
    ? image
    : initials.trim().length === 0
      ? placeholder
      : undefined;

  return (
    <div className="relative mb-2">
      <Avatar className="w-[50px] h-[50px]" {...props}>
        <AvatarImage src={image} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      {/*
      <div className={`absolute bottom-0 right-0 w-3 h-3 ${isOnline ? 'bg-green-500' : 'bg-red-500'} rounded-full border-2 border-white`}></div>
      */}
    </div>
  );
};

export default CustomAvatar;
