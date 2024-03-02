import "@/styles/globals.css"
import { Inter as FontSans } from "next/font/google"

import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster";
import { ModalProvider } from "@/providers/modal-provider";
import { SessionProvider } from "next-auth/react";
import { Locale } from "@/i18n.config";



const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});


interface RootLayoutProps {
  children: React.ReactNode
  params: { lang: Locale }
}


export default function RootLayout({ children, params }: RootLayoutProps) {
  return (
    <html lang={params.lang} suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <SessionProvider>
          {children}
          <Toaster />
          <ModalProvider />
        </SessionProvider>
      </body>
    </html>
  )
}
