import NextAuth, { Session } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prismadb from "@/lib/prismadb";
import MagicLinkEmail from "@/emails/magic-link-email";
import nodemailer from "nodemailer";
import { getDictionary } from "@/lib/dictionary";
import { Locale } from "@/i18n.config";

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
        const { identifier, url } = params;

        // Check if the user exists in the database
        const user = await prismadb.user.findUnique({
          where: { email: identifier },
        });

        if (!user) {
          // User does not exist, prevent sending the email
          console.log(
            `No user found with email ${identifier}, not sending verification email.`
          );
          return;
        }

        const locale = (process.env.DEFAULT_LOCALE ?? "en") as Locale;

        const { auth: t } = (await getDictionary(locale)) as any;

        const emailContent = MagicLinkEmail({ url, t: t.signInForm });

        const payload = {
          api_key: process.env.SMTP_2GO_API_KEY,
          to: [`<${identifier}>`],
          sender: `My Video Conference <${process.env.SMTP_2GO_SENDER}>`,
          subject: t.emailSubject,
          html_body: emailContent,
          custom_headers: [
            {
              header: "Reply-To",
              value: "Actual Person <info@my-video.gr>",
            },
          ],
        };

        const response = await fetch(process.env.SMTP_2GO_URL!, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        console.log(response);
      },
    }),
  ],
  callbacks: {
    async session({ session, user }: any) {
      session.user.role = user.role;
      session.user.id = user.id;
      session.user.name = user.name;
      return session;
    },
    // Other callbacks
  },
  adapter: PrismaAdapter(prismadb),
  pages: {
    signIn: "/sign-in",
    signOut: "/sign-out",
  },
});
