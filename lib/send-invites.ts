import MeetingInviteEmail from "@/emails/meeting-invite-email"
import { Meeting, User } from "@prisma/client"
import nodemailer from "nodemailer"
import { getDictionary } from "./dictionary";
import { Locale } from "@/i18n.config";



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

  participantMeetings.forEach((p) => {

    const emailContent = MeetingInviteEmail({
      meeting: p.meeting,
      participant: p.participant,
      message: message,
      token: p.token,
      t: t
    })
    const result = transporter.sendMail({
      to: p.participant.email,
      from: process.env.SMTP_USER,
      subject: `You're invited to a meeting`,
      html: emailContent,
    })
  })
}