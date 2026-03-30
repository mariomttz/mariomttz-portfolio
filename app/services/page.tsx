import { Navbar } from "@/components/navbar"
import { ServicesHero } from "@/components/services-hero"
import { ServicesGrid } from "@/components/services-grid"
import { ProcessSection } from "@/components/process-section"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Services - Mario Martinez | Data Science & ML Engineering",
  description:
    "Professional data science and machine learning services including custom ML solutions, data engineering, analytics, and AI automation.",
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <ServicesHero />
      <ServicesGrid />
      <ProcessSection />
      <Footer />
    </main>
  )
}
