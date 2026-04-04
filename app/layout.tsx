import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"

import "./globals.css"

// Geist fonts are pre-configured with optimization settings
const geistSans = GeistSans
const geistMono = GeistMono
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/contexts/language-context"
import { ScrollToTop } from "@/components/scroll-to-top"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Mario Martinez - Data Scientist & ML Engineer",
  description:
    "Freelance Data Scientist and Machine Learning Engineer specializing in AI solutions, optimization, and automation. Available for consulting and project work.",
  keywords: ["Data Science", "Machine Learning", "AI", "Python", "Freelance", "Consulting"],
  authors: [{ name: "Mario Martinez" }],
  creator: "Mario Martinez",
  icons: {
    icon: [
      { url: "/favicon-16x16.jpg", sizes: "16x16", type: "image/jpeg" },
      { url: "/favicon-32x32.jpg", sizes: "32x32", type: "image/jpeg" },
      { url: "/favicon-96x96.jpg", sizes: "96x96", type: "image/jpeg" },
    ],
    apple: [{ url: "/apple-touch-icon.jpg", sizes: "180x180", type: "image/jpeg" }],
    other: [
      { rel: "icon", url: "/android-chrome-192x192.jpg", sizes: "192x192", type: "image/jpeg" },
      { rel: "icon", url: "/android-chrome-512x512.jpg", sizes: "512x512", type: "image/jpeg" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mariomttz.me",
    title: "Mario Martinez - Data Scientist & ML Engineer",
    description:
      "Freelance Data Scientist and Machine Learning Engineer specializing in AI solutions, optimization, and automation.",
    siteName: "Mario Martinez Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mario Martinez - Data Scientist & ML Engineer",
    description:
      "Freelance Data Scientist and Machine Learning Engineer specializing in AI solutions, optimization, and automation.",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className={`font-sans ${geistSans.className} antialiased`}>
        <Suspense fallback={null}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <LanguageProvider>
              <ScrollToTop />
              {children}
            </LanguageProvider>
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  )
}
