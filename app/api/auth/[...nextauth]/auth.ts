import NextAuth, { Session } from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from "@auth/prisma-adapter"
import prismadb from '@/lib/prismadb';
import MagicLinkEmail from '@/emails/magic-link-email';
import nodemailer from 'nodemailer';
import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/i18n.config';

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [
    EmailProvider({
      server: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT! as unknown as number,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      async sendVerificationRequest(params) {


        const { identifier, url, provider, theme } = params
        const { host } = new URL(url)

        // Check if the user exists in the database
        const user = await prismadb.user.findUnique({
          where: { email: identifier },
        });

        if (!user) {
          // User does not exist, prevent sending the email
          console.log(`No user found with email ${identifier}, not sending verification email.`);
          return;
        }


        const locale = (process.env.DEFAULT_LOCALE ?? "en") as Locale

        const { auth: t } = await getDictionary(locale) as any


        const emailContent = MagicLinkEmail({ url, t: t.signInForm })

        const transport = nodemailer.createTransport(provider.server)
        const result = await transport.sendMail({
          to: identifier,
          from: provider.from,
          subject: `Sign in to ${host}`,
          html: emailContent,
        })
        const failed = result.rejected.concat(result.pending).filter(Boolean)
        if (failed.length) {
          throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`)
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, user }: any) {
      session.user.role = user.role
      session.user.id = user.id
      session.user.name = user.name
      return session
    }
    // Other callbacks
  },
  adapter: PrismaAdapter(prismadb),
  pages: {
    signIn: '/sign-in',
    signOut: '/sign-in',
  },
});