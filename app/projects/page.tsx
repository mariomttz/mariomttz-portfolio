import { Navbar } from "@/components/navbar"
import { ProjectsHero } from "@/components/projects-hero"
import { ProjectsGrid } from "@/components/projects-grid"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Projects - Mario Martinez | Data Science Portfolio",
  description:
    "Explore my data science and machine learning projects including predictive analytics, computer vision, NLP, and automation solutions.",
}

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <ProjectsHero />
      <ProjectsGrid />
      <Footer />
    </main>
  )
}
