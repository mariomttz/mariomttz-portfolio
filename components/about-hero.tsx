"use client"

import { useLanguage } from "@/contexts/language-context"
import { Calendar, GraduationCap } from "lucide-react"
import { motion } from "framer-motion"

export function AboutHero() {
  const { language } = useLanguage()

  const content = {
    en: {
      title: "Passionate Data Scientist & ML Engineer",
      subtitle: "Transforming complex data into actionable business insights",
      description:
        "I'm Mario Martinez, a dedicated data scientist and machine learning engineer with a strong academic background and practical experience in AI, optimization, and automation. I specialize in creating intelligent solutions that solve real-world problems and drive business value.",
      experience: "3+ Years Experience",
      education: "ENES Morelia Graduate",
      gpa: "GPA: 9.3/10",
    },
    es: {
      title: "Científico de Datos e Ingeniero ML Apasionado",
      subtitle: "Transformando datos complejos en insights empresariales accionables",
      description:
        "Soy Mario Martinez, un científico de datos e ingeniero de machine learning dedicado con sólida formación académica y experiencia práctica en IA, optimización y automatización. Me especializo en crear soluciones inteligentes que resuelven problemas del mundo real y generan valor empresarial.",
      experience: "3+ Años de Experiencia",
      education: "Egresado ENES Morelia",
      gpa: "Promedio: 9.3/10",
    },
  }

  const currentContent = content[language as keyof typeof content]

  return (
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance gradient-text pb-2">
                  {currentContent.title}
                </h1>
                <p className="text-xl text-accent font-medium">{currentContent.subtitle}</p>
                <p className="text-lg text-muted-foreground leading-relaxed text-pretty max-w-3xl mx-auto">
                  {currentContent.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 max-w-3xl mx-auto">
              <div className="flex flex-col items-center gap-2 p-4 bg-accent/5 border border-accent/20 rounded-lg">
                <Calendar className="h-6 w-6 text-accent" />
                <div className="text-center">
                  <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Experience</div>
                  <div className="font-semibold text-foreground">{currentContent.experience}</div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 bg-accent/5 border border-accent/20 rounded-lg">
                <GraduationCap className="h-6 w-6 text-accent" />
                <div className="text-center">
                  <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Education</div>
                  <div className="font-semibold text-foreground">{currentContent.education}</div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 bg-accent/5 border border-accent/20 rounded-lg col-span-2 lg:col-span-1">
                <GraduationCap className="h-6 w-6 text-accent" />
                <div className="text-center">
                  <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Academic Performance</div>
                  <div className="font-semibold text-foreground">{currentContent.gpa}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
