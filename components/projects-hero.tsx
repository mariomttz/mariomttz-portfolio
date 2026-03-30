"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export function ProjectsHero() {
  const [language, setLanguage] = useState("en")

  const content = {
    en: {
      title: "Data Science Projects That Make an Impact",
      subtitle: "Real-world solutions using cutting-edge AI and machine learning",
      description:
        "Explore a collection of projects that demonstrate my expertise in data science, machine learning, and AI. Each project showcases practical applications that solve real business problems and deliver measurable results.",
      stats: [
        { number: "15+", label: "Projects Completed" },
        { number: "4+", label: "Years of Experience" },
        { number: "20+", label: "Technologies" },
        { number: "100%", label: "Client Satisfaction" },
      ],
    },
    es: {
      title: "Proyectos de Ciencia de Datos que Generan Impacto",
      subtitle: "Soluciones del mundo real usando IA y machine learning de vanguardia",
      description:
        "Explora una colección de proyectos que demuestran mi experiencia en ciencia de datos, machine learning e IA. Cada proyecto muestra aplicaciones prácticas que resuelven problemas empresariales reales y entregan resultados medibles.",
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
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-balance gradient-text pb-2">
            {currentContent.title}
          </h1>
          <p className="text-xl text-accent font-medium mb-4">{currentContent.subtitle}</p>
          <p className="text-lg text-muted-foreground leading-relaxed text-pretty max-w-4xl mx-auto">
            {currentContent.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          {currentContent.stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">{stat.number}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
