import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { StatsRibbon } from "@/components/stats-ribbon"
import { ServicesPreview } from "@/components/services-preview"
import { TechStack } from "@/components/tech-stack"
import { FeaturedProjects } from "@/components/featured-projects"
import { Testimonials } from "@/components/testimonials"
import { CTACard } from "@/components/cta-card"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <StatsRibbon />
      <ServicesPreview />
      <TechStack />
      <FeaturedProjects />
      <Testimonials />
      <CTACard />
      <Footer />
    </main>
  )
}
