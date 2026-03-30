"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"

export function StatsRibbon() {
  const { language } = useLanguage()

  const content = {
    en: {
      stats: [
        { number: "15+", label: "Projects Completed" },
        { number: "4+", label: "Years of Experience" },
        { number: "20+", label: "Technologies" },
        { number: "100%", label: "Client Satisfaction" },
      ],
    },
    es: {
      stats: [
        { number: "15+", label: "Proyectos Completados" },
        { number: "4+", label: "Años de Experiencia" },
        { number: "20+", label: "Tecnologías" },
        { number: "100%", label: "Satisfacción del Cliente" },
      ],
    },
  }

  const currentContent = content[language as keyof typeof content]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30 dark:bg-muted/10 border-y border-border/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-12"
        >
          {currentContent.stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-2">{stat.number}</div>
              <div className="text-base text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
