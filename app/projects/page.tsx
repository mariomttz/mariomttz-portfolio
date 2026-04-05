import { Navbar } from "@/components/navbar"
import { ProjectsHero } from "@/components/projects-hero"
import { ProjectsGrid } from "@/components/projects-grid"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Projects",
  description:
    "Explore my data science and machine learning projects including predictive analytics, computer vision, NLP, and automation solutions.",
  openGraph: {
    title: "Data Science & ML Projects - Mario Martinez",
    description:
      "Explore my portfolio of data science and machine learning projects including predictive analytics, computer vision, and NLP.",
    url: "https://mariomttz.me/projects",
    images: [
      {
        url: "/neural-network-optimization-graphs-charts.jpg",
        width: 1200,
        height: 630,
        alt: "Data Science Projects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Science & ML Projects - Mario Martinez",
    description:
      "Explore my portfolio of data science and machine learning projects including predictive analytics, computer vision, and NLP.",
    images: ["/neural-network-optimization-graphs-charts.jpg"],
  },
}

export default function ProjectsPage() {
  return (
    <main id="main-content" className="min-h-screen bg-background">
      <Navbar />
      <ProjectsHero />
      <ProjectsGrid />
      <Footer />
    </main>
  )
}
