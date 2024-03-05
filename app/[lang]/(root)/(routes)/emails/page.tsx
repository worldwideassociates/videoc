import { MeetingInviteEmail } from "@/emails/meeting-invite-email";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import prismadb from "@/lib/prismadb";
import React, { FC } from "react";

interface pageProps {
  params: { lang: Locale };
}

const page: FC<pageProps> = async ({ params }) => {
  const { email: t } = (await getDictionary(params.lang)) as any;
  const invite = await prismadb.invite.findFirst({
    include: { meeting: true, user: true },
  });

  const company = await prismadb.company.findFirst({});

  return MeetingInviteEmail({
    meeting: invite?.meeting!,
    participant: invite?.user!,
    t: t,
    company: company!,
  });
};

export default page;
