"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"
import { Sparkles } from "lucide-react"

export function HeroSection() {
  const { language } = useLanguage()

  const content = {
    en: {
      available: "Available for freelance projects",
      greeting: "Hello, I'm",
      firstName: "Mario",
      lastName: "Martinez",
      title: "Data Scientist & Machine Learning Strategist",
      description:
        "I turn data into strategic decisions and automate complex processes. I specialize in developing Artificial Intelligence and Machine Learning solutions that solve real problems and generate measurable impact for your business.",
      viewProjects: "View My Projects",
      letsTalk: "Let's Talk",
    },
    es: {
      available: "Disponible para proyectos freelance",
      greeting: "Hola, soy",
      firstName: "Mario",
      lastName: "Martinez",
      title: "Científico de Datos y Estratega en Machine Learning",
      description:
        "Convierto datos en decisiones estratégicas y automatizo procesos complejos. Me especializo en el desarrollo de soluciones de Inteligencia Artificial y Machine Learning que resuelven problemas reales y generan un impacto medible para tu negocio.",
      viewProjects: "Ver mis Proyectos",
      letsTalk: "Hablemos",
    },
  }

  const currentContent = content[language as keyof typeof content]

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Badge
              variant="secondary"
              className="text-sm px-4 py-2 bg-accent/10 text-accent border-accent/20 dark:bg-accent/10 dark:text-accent dark:border-accent/30"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              {currentContent.available}
            </Badge>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-lg text-accent mb-4">{currentContent.greeting}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-2"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold">
              <span className="text-foreground">{currentContent.firstName}</span>
              <br />
              <span className="gradient-text">{currentContent.lastName}</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground font-medium">
              {currentContent.title}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <p className="text-base sm:text-lg text-muted-foreground/80 leading-relaxed text-pretty">
              {currentContent.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
          >
            <Button
              size="lg"
              className="group gradient-primary hover:opacity-90 text-white border-0 shadow-lg glow-primary"
              asChild
            >
              <Link href="/projects">
                {currentContent.viewProjects}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="group border-2 border-border hover:bg-accent/10 hover:text-accent hover:border-accent bg-transparent transition-all dark:border-border dark:hover:bg-accent/10 dark:hover:text-accent dark:hover:border-accent"
              asChild
            >
              <Link href="/contact">{currentContent.letsTalk}</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
