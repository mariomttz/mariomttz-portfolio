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
import { SkipNav } from "@/components/skip-nav"
import { Suspense } from "react"

export const metadata: Metadata = {
  metadataBase: new URL("https://mariomttz.me"),
  title: {
    default: "Mario Martinez - Data Scientist & ML Engineer",
    template: "%s | Mario Martinez",
  },
  description:
    "Freelance Data Scientist and Machine Learning Engineer specializing in AI solutions, optimization, and automation. Available for consulting and project work.",
  keywords: [
    "Data Science",
    "Machine Learning",
    "AI",
    "Python",
    "Freelance",
    "Consulting",
    "Next.js",
    "React",
    "Deep Learning",
    "NLP",
    "Computer Vision",
  ],
  authors: [{ name: "Mario Martinez", url: "https://mariomttz.me" }],
  creator: "Mario Martinez",
  publisher: "Mario Martinez",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["es_ES"],
    url: "https://mariomttz.me",
    title: "Mario Martinez - Data Scientist & ML Engineer",
    description:
      "Freelance Data Scientist and Machine Learning Engineer specializing in AI solutions, optimization, and automation.",
    siteName: "Mario Martinez Portfolio",
    images: [
      {
        url: "/futuristic-ai-visualization.png",
        width: 1200,
        height: 630,
        alt: "Mario Martinez - Data Scientist & ML Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mario Martinez - Data Scientist & ML Engineer",
    description:
      "Freelance Data Scientist and Machine Learning Engineer specializing in AI solutions, optimization, and automation.",
    images: ["/futuristic-ai-visualization.png"],
  },
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
  manifest: "/site.webmanifest",
  generator: "v0.app",
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
              <SkipNav />
              <ScrollToTop />
              {children}
            </LanguageProvider>
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  )
}
