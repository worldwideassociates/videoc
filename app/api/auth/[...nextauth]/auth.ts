import NextAuth, { Session } from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from "@auth/prisma-adapter"
import prismadb from '@/lib/prismadb';
import MagicLinkEmail from '@/emails/magic-link-email';
import nodemailer from 'nodemailer';

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
      credentials: {
        async authorize(credentials: any) {
          // Check if the user exists in the database
          const user = await prismadb.user.findUnique({
            where: { email: credentials.email }
          });

          if (user) {
            // User exists, allow sign-in
            return true;
          } else {
            // User does not exist, prevent sign-in
            return false;
          }
        }
      },
      async sendVerificationRequest(params) {
        const { identifier, url, provider, theme } = params
        const { host } = new URL(url)
        const emailContent = MagicLinkEmail({ url })

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