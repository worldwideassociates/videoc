import NextAuth, { Session } from 'next-auth';
import Google from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from "@auth/prisma-adapter"
import prismadb from '@/lib/prismadb';
import { User as NextAuthUser, Account as NextAuthAccount, Profile as NextAuthProfile } from 'next-auth';
import { User as PrismaUser } from '@prisma/client';



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
    },
    ),
  ],
  callbacks: {
    async signIn(params: { user: NextAuthUser | PrismaUser }) {
      const { user } = params;
      const superAdminExists = await prismadb.user.findFirst({
        where: {
          role: 'SUPER_ADMIN',
        },
      });

      if (!superAdminExists) {
        (user as PrismaUser).role = 'SUPER_ADMIN';
      }

      return true;
    },
    async session({ session, user }: any) {  //TODO: types here drove me crazy
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