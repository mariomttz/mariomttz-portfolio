"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
import { projectsData, getUniqueCategories, getUniqueCategoriesEs } from "@/lib/projects-data"
import { useLanguage } from "@/contexts/language-context"

export function ProjectsGrid() {
  const { language } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState("All")

  const content = {
    en: {
      title: "Featured Projects",
      subtitle: "A showcase of my latest work in data science and machine learning",
      viewCode: "View Code",
      liveDemo: "Live Demo",
      comingSoon: "Coming Soon",
      keyFeatures: "Key Features",
      technologies: "Technologies",
    },
    es: {
      title: "Proyectos Destacados",
      subtitle: "Una muestra de mi trabajo más reciente en ciencia de datos y machine learning",
      viewCode: "Ver Código",
      liveDemo: "Demo en Vivo",
      comingSoon: "Próximamente",
      keyFeatures: "Características Clave",
      technologies: "Tecnologías",
    },
  }

  const currentContent = content[language]
  const currentCategories = language === "en" ? getUniqueCategories() : getUniqueCategoriesEs()

  const filteredProjects = projectsData.filter((project) => {
    if (selectedCategory === "All" || selectedCategory === "Todos") return true
    const projectCategory = language === "en" ? project.category : project.categoryEs
    return projectCategory === selectedCategory
  })

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance text-primary">
            {currentContent.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">{currentContent.subtitle}</p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {currentCategories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="transition-all duration-200 hover:border-accent/50 cursor-pointer"
              aria-label={`${language === "en" ? "Filter by" : "Filtrar por"} ${category}`}
              aria-pressed={selectedCategory === category}
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-border/50 hover:border-accent/30 overflow-hidden flex flex-col">
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={language === "en" ? project.title : project.titleEs}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                        <project.icon className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <Badge variant="outline" className="text-xs border-accent/30 text-accent">
                        {language === "en" ? project.category : project.categoryEs}
                      </Badge>
                    </div>
                    <Badge
                      variant={project.status === "Completed" ? "default" : "secondary"}
                      className={
                        project.status === "Completed"
                          ? "bg-success/10 text-success border-success/20"
                          : "bg-warning/10 text-warning border-warning/20"
                      }
                    >
                      {language === "en" ? project.status : project.statusEs}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg mb-2">{language === "en" ? project.title : project.titleEs}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {language === "en" ? project.description : project.descriptionEs}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 flex-1 flex flex-col">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">{currentContent.keyFeatures}</h4>
                    <div className="space-y-1">
                      {(language === "en" ? project.features : project.featuresEs).map((feature) => (
                        <div key={feature} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                          <span className="text-xs text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm mb-2">{currentContent.technologies}</h4>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2 mt-auto">
                    <Button asChild size="sm" variant="outline" className="flex-1">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4 mr-2" />
                        {currentContent.viewCode}
                      </a>
                    </Button>
                    {project.demo ? (
                      <Button asChild size="sm" className="flex-1">
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          {currentContent.liveDemo}
                        </a>
                      </Button>
                    ) : (
                      <Button size="sm" disabled className="flex-1">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        {currentContent.comingSoon}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
