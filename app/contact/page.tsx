"use client"

import { Navbar } from "@/components/navbar"
import { ContactHero } from "@/components/contact-hero"
import { ContactForm } from "@/components/contact-form"
import { Footer } from "@/components/footer"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

function ContactPageContent() {
  const searchParams = useSearchParams()
  const preSelectedService = searchParams.get("service") || undefined

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <ContactHero />
      <ContactForm preSelectedService={preSelectedService} />
      <Footer />
    </main>
  )
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContactPageContent />
    </Suspense>
  )
}
