import MeetingInviteEmail from "@/emails/meeting-invite-email";
import { Meeting, User } from "@prisma/client";
import { getDictionary } from "./dictionary";
import { Locale } from "@/i18n.config";
import prismadb from "./prismadb";

export const sendInvites = async (
  participantMeetings: { meeting: Meeting; participant: User; token: string }[],
  message: string
) => {
  console.log("-------------------------------------------------------------");
  console.log("sending invites to participants", participantMeetings.length);

  const locale = (process.env.DEFAULT_LOCALE ?? "en") as Locale;
  const { email: t } = (await getDictionary(locale)) as any;
  const company = await prismadb.company.findFirst({});

  participantMeetings.forEach(async (p) => {
    const emailContent = MeetingInviteEmail({
      meeting: p.meeting,
      participant: p.participant,
      t: t,
      company: company!,
    });

    console.log("sending email to", p.participant.email);

    const payload = {
      api_key: process.env.SMTP_2GO_API_KEY,
      to: [`<${p.participant.email}>`],
      sender: `My Video Conference <${process.env.SMTP_2GO_SENDER}>`,
      subject: t.inviteMessage.subject,
      html_body: emailContent,
      custom_headers: [
        {
          header: "Reply-To",
          value: "Actual Person <info@my-video.gr>",
        },
      ],
    };

    await fetch(process.env.SMTP_2GO_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  });
};
