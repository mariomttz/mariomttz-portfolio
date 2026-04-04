import { Navbar } from "@/components/navbar"
import { ServicesHero } from "@/components/services-hero"
import { ServicesGrid } from "@/components/services-grid"
import { ProcessSection } from "@/components/process-section"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Services",
  description:
    "Professional data science and machine learning services including custom ML solutions, data engineering, analytics, and AI automation.",
  openGraph: {
    title: "Data Science & ML Engineering Services - Mario Martinez",
    description:
      "Custom ML solutions, data engineering, analytics, and AI automation services for your business.",
    url: "https://mariomttz.me/services",
    images: [
      {
        url: "/data-science-workflow-pipeline-visualization.jpg",
        width: 1200,
        height: 630,
        alt: "Data Science Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Science & ML Engineering Services - Mario Martinez",
    description:
      "Custom ML solutions, data engineering, analytics, and AI automation services for your business.",
    images: ["/data-science-workflow-pipeline-visualization.jpg"],
  },
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
