import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { FC } from "react";
import MeetingForm from "../_components/meeting-form";
import prismadb from "@/lib/prismadb";
import { auth } from "@/app/api/auth/[...nextauth]/auth";
import { User } from "@prisma/client";
import { Info } from "lucide-react";
import { getDictionary } from "@/lib/dictionary";
import { Locale } from "@/i18n.config";

interface pageProps {
  params: { lang: Locale };
}

const page: FC<pageProps> = async ({ params }) => {
  const session = await auth();
  const currentUserId = session?.user?.id!;
  const { meetings: t } = (await getDictionary(params.lang)) as any;

  let users: User[] = [];

  if (currentUserId) {
    users = await prismadb.user.findMany({
      where: {
        NOT: {
          id: currentUserId,
        },
      },
    });
  }

  return (
    <div className="flex justify-center items-center min-h-screen py-10">
      <Card className="w-screen-md">
        <CardHeader>
          <CardTitle>{t.form.create.title}</CardTitle>
          <CardDescription className="flex space-x-1">
            <Info size={16} />
            <p>{t.form.create.subTitle}</p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MeetingForm usersOptions={users} t={t} />
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
