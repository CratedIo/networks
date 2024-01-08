import type { Metadata } from 'next'
import { ThemeProvider } from "@/components/theme-provider"
import { Prata, Poppins } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import { AuthWrapper } from '@/components/context/AuthWrapper'

const primaryFont = Prata({ 
  subsets: ['latin'],
  weight: "400",
  variable: '--font-primary'
 })
const secondaryFont = Poppins({ 
  subsets: ['latin'],
  weight: ["300", "600"],
  variable: '--font-secondary'
 })

const baseUrl = process.env.VERCEL_URL
? `https://${process.env.VERCEL_URL}`
: 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(baseUrl),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <html lang="en" className={`${primaryFont.variable} ${secondaryFont.className} `} /*suppressHydrationWarning*/ >
      <body className="bg-background text-foreground">
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AuthWrapper>
              {children}
            </AuthWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
};