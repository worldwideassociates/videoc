import { Locale } from "@/i18n.config";

export const sidebarLinks = (locale: Locale) => [
  {
    imgURL: "/icons/Home.svg",
    lightImgURL: "/icons/HomeLight.svg",
    route: `/${locale}/dashboard`,
    label: "Home",
  },
  {
    imgURL: "/icons/upcoming.svg",
    lightImgURL: "/icons/upcomingLight.svg",
    route: `/${locale}/dashboard/upcoming`,
    label: "Upcoming",
  },
  {
    imgURL: "/icons/previous.svg",
    lightImgURL: "/icons/previousLight.svg",
    route: `/${locale}/dashboard/previous`,
    label: "Previous",
  },
  {
    imgURL: "/icons/Video.svg",
    lightImgURL: "/icons/recordingsLight.svg",
    route: `/${locale}/dashboard/recordings`,
    label: "Recordings",
  },
];

export const avatarImages = [
  "/images/avatar-1.jpeg",
  "/images/avatar-2.jpeg",
  "/images/avatar-3.png",
  "/images/avatar-4.png",
  "/images/avatar-5.png",
];
