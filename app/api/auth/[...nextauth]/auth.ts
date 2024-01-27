import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from "@auth/prisma-adapter"
import prismadb from '@/lib/prismadb';

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [
    Google,
    EmailProvider({
      server: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      from: process.env.SMTP_FROM,
    }),
  ],
  adapter: PrismaAdapter(prismadb),
  pages: {
    signIn: '/auth',
    signOut: '/auth',
  },
});