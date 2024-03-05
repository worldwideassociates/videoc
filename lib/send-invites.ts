import MeetingInviteEmail from "@/emails/meeting-invite-email"
import { Meeting, User } from "@prisma/client"
import nodemailer from "nodemailer"
import { getDictionary } from "./dictionary";
import { Locale } from "@/i18n.config";
import prismadb from "./prismadb";



const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  // secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});


export const sendInvites = async (participantMeetings: { meeting: Meeting, participant: User, token: string }[], message: string) => {
  console.log('-----------------------------------------------------------')
  console.log('sending invites to participants')


  const locale = (process.env.DEFAULT_LOCALE ?? 'en') as Locale
  const { email: t } = await getDictionary(locale) as any
  const company = await prismadb.company.findFirst({})

  participantMeetings.forEach((p) => {

    const emailContent = MeetingInviteEmail({
      meeting: p.meeting,
      participant: p.participant,
      t: t,
      company: company!,
    })
    const result = transporter.sendMail({
      to: p.participant.email,
      from: process.env.SMTP_USER,
      subject: t.inviteMessage.subject,
      html: emailContent,
    })
  })
}