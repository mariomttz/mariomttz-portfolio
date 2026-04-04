import { Navbar } from "@/components/navbar"
import { ContactHero } from "@/components/contact-hero"
import { ContactForm } from "@/components/contact-form"
import { Footer } from "@/components/footer"
import { Suspense } from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Mario Martinez for data science consulting, machine learning projects, and AI solutions. Available for freelance work and collaboration.",
  openGraph: {
    title: "Contact Mario Martinez - Data Scientist & ML Engineer",
    description:
      "Get in touch for data science consulting, machine learning projects, and AI solutions.",
    url: "https://mariomttz.me/contact",
    images: [
      {
        url: "/futuristic-ai-visualization.png",
        width: 1200,
        height: 630,
        alt: "Contact Mario Martinez",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Mario Martinez - Data Scientist & ML Engineer",
    description:
      "Get in touch for data science consulting, machine learning projects, and AI solutions.",
    images: ["/futuristic-ai-visualization.png"],
  },
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <ContactHero />
      <Suspense fallback={<div>Loading...</div>}>
        <ContactForm />
      </Suspense>
      <Footer />
    </main>
  )
}
