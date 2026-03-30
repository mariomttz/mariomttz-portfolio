"use client"

import { useLanguage } from "@/contexts/language-context"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Mail, Calendar, Linkedin, Github } from "lucide-react"

export function ContactHero() {
  const { language } = useLanguage()

  const content = {
    en: {
      title: "Let's Build Something Amazing Together",
      subtitle: "Ready to transform your data into actionable insights?",
      description:
        "I'm always excited to discuss new projects and opportunities. Whether you need a custom ML solution, data pipeline, or comprehensive analytics dashboard, let's explore how we can work together to achieve your goals.",
      emailMe: "Send Email",
      scheduleCall: "Schedule a Call",
      viewLinkedIn: "LinkedIn",
      viewGitHub: "GitHub",
    },
    es: {
      title: "Construyamos Algo Increíble Juntos",
      subtitle: "¿Listo para transformar tus datos en insights accionables?",
      description:
        "Siempre estoy emocionado de discutir nuevos proyectos y oportunidades. Ya sea que necesites una solución ML personalizada, pipeline de datos o dashboard de analítica integral, exploremos cómo podemos trabajar juntos para lograr tus objetivos.",
      emailMe: "Enviar Email",
      scheduleCall: "Agendar Llamada",
      viewLinkedIn: "LinkedIn",
      viewGitHub: "GitHub",
    },
  }

  const currentContent = content[language as keyof typeof content]

  return (
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance gradient-text pb-2">
            {currentContent.title}
          </h1>
          <p className="text-xl text-accent font-medium">{currentContent.subtitle}</p>
          <p className="text-lg text-muted-foreground leading-relaxed text-pretty max-w-3xl mx-auto">
            {currentContent.description}
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <Button
              asChild
              size="lg"
              className="group gradient-primary hover:opacity-90 text-white border-0 shadow-lg glow-primary"
            >
              <a href="mailto:contact@mariomttz.me">
                <Mail className="mr-2 h-4 w-4" />
                {currentContent.emailMe}
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="group bg-transparent hover:bg-accent/10 hover:text-accent hover:border-accent transition-all"
            >
              <a href="https://calendly.com/mariomttz" target="_blank" rel="noopener noreferrer">
                <Calendar className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                {currentContent.scheduleCall}
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="group bg-transparent hover:bg-accent/10 hover:text-accent hover:border-accent transition-all"
            >
              <a href="https://linkedin.com/in/mariomttz" target="_blank" rel="noopener noreferrer">
                <Linkedin className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                {currentContent.viewLinkedIn}
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="group bg-transparent hover:bg-accent/10 hover:text-accent hover:border-accent transition-all"
            >
              <a href="https://github.com/mariomttz" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                {currentContent.viewGitHub}
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
