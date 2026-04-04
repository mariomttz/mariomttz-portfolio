"use client"

import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"
import Image from "next/image"
import { getRecentProjects, truncateText } from "@/lib/projects-data"

export function FeaturedProjects() {
  const { language } = useLanguage()
  const featuredProjects = getRecentProjects(3)

  const content = {
    en: {
      title: "Featured",
      titleHighlight: "Projects",
      subtitle: "Recent work showcasing my expertise in data science",
      viewAll: "View All Projects",
      viewCode: "View Code",
      liveDemo: "Live Demo",
      comingSoon: "Coming Soon",
    },
    es: {
      title: "Proyectos",
      titleHighlight: "Destacados",
      subtitle: "Trabajo reciente mostrando mi experiencia en ciencia de datos",
      viewAll: "Ver Todos los Proyectos",
      viewCode: "Ver Código",
      liveDemo: "Demo en Vivo",
      comingSoon: "Próximamente",
    },
  }

  const currentContent = content[language]

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 pb-2">
            {currentContent.title} <span className="gradient-text">{currentContent.titleHighlight}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">{currentContent.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-border/50 hover:border-accent/30 overflow-hidden group flex flex-col">
                <Link href={`/projects#project-${project.slug}`} className="relative block h-56 overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={language === "en" ? project.title : project.titleEs}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 left-4">
                    <div className="w-10 h-10 bg-background/90 backdrop-blur-sm rounded-lg flex items-center justify-center border border-accent/20">
                      <project.icon className="h-5 w-5 text-accent" />
                    </div>
                  </div>
                </Link>

                <CardHeader className="flex-1 flex flex-col">
                  <Badge variant="outline" className="w-fit mb-2 border-accent/30 text-accent">
                    {language === "en" ? project.category : project.categoryEs}
                  </Badge>
                  <CardTitle className="text-lg text-foreground mb-2">
                    {language === "en" ? project.title : project.titleEs}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {truncateText(language === "en" ? project.description : project.descriptionEs, 100)}
                  </CardDescription>
                </CardHeader>

                <CardContent className="mt-auto">
                  <div className="flex gap-2">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center h-9 px-4 text-sm font-medium rounded-md border border-border bg-transparent hover:bg-accent/10 hover:text-accent hover:border-accent/50 dark:border-border dark:hover:bg-accent/10 dark:hover:text-accent dark:hover:border-accent/50 transition-colors cursor-pointer"
                    >
                      <Github className="h-4 w-4 mr-2" />
                      {currentContent.viewCode}
                    </a>
                    {project.demo ? (
                      <Button asChild size="sm" className="flex-1">
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          {currentContent.liveDemo}
                        </a>
                      </Button>
                    ) : (
                      <Button asChild size="sm" className="flex-1 opacity-50 cursor-not-allowed">
                        <span>
                          <ExternalLink className="h-4 w-4 mr-2" />
                          {currentContent.comingSoon}
                        </span>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button
            asChild
            size="lg"
            className="group gradient-primary hover:opacity-90 text-white border-0 shadow-lg glow-primary"
          >
            <Link href="/projects">
              {currentContent.viewAll}
              <ArrowRight className="ml-2 h-6 w-6 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
