import { Navbar } from "@/components/navbar"
import { AboutHero } from "@/components/about-hero"
import { AboutStory } from "@/components/about-story"
import { AboutEducation } from "@/components/about-education"
import { AboutSkills } from "@/components/about-skills"
import { AboutArticles } from "@/components/about-articles"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "About Me",
  description:
    "Learn about Mario Martinez's journey in data science, education at ENES Morelia, and expertise in machine learning, AI, and data engineering.",
  openGraph: {
    title: "About Mario Martinez - Data Scientist & ML Engineer",
    description:
      "Learn about my background, experience, and expertise in Data Science and Machine Learning.",
    url: "https://mariomttz.me/about",
    images: [
      {
        url: "/futuristic-ai-visualization.png",
        width: 1200,
        height: 630,
        alt: "About Mario Martinez",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Mario Martinez - Data Scientist & ML Engineer",
    description:
      "Learn about my background, experience, and expertise in Data Science and Machine Learning.",
    images: ["/futuristic-ai-visualization.png"],
  },
}

export default function AboutPage() {
  return (
    <main id="main-content" className="min-h-screen bg-background">
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
