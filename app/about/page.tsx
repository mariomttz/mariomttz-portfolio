import { Navbar } from "@/components/navbar"
import { AboutHero } from "@/components/about-hero"
import { AboutStory } from "@/components/about-story"
import { AboutEducation } from "@/components/about-education"
import { AboutSkills } from "@/components/about-skills"
import { AboutArticles } from "@/components/about-articles"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "About - Mario Martinez | Data Scientist & ML Engineer",
  description:
    "Learn about Mario Martinez's journey in data science, education at ENES Morelia, and expertise in machine learning, AI, and data engineering.",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <AboutHero />
      <AboutStory />
      <AboutEducation />
      <AboutSkills />
      <AboutArticles />
      <Footer />
    </main>
  )
}
