"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Target, Lightbulb, Users } from "lucide-react"
import { motion } from "framer-motion"

const values = [
  {
    icon: Brain,
    title: "Continuous Learning",
    titleEs: "Aprendizaje Continuo",
    description: "Always staying updated with the latest technologies and methodologies in data science and AI.",
    descriptionEs:
      "Siempre manteniéndome actualizado con las últimas tecnologías y metodologías en ciencia de datos e IA.",
  },
  {
    icon: Target,
    title: "Results-Driven",
    titleEs: "Orientado a Resultados",
    description: "Focused on delivering practical solutions that create measurable business value and impact.",
    descriptionEs: "Enfocado en entregar soluciones prácticas que crean valor empresarial medible e impacto.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    titleEs: "Innovación",
    description: "Applying creative approaches to solve complex problems using cutting-edge AI technologies.",
    descriptionEs:
      "Aplicando enfoques creativos para resolver problemas complejos usando tecnologías de IA de vanguardia.",
  },
  {
    icon: Users,
    title: "Collaboration",
    titleEs: "Colaboración",
    description: "Working effectively with teams and stakeholders to achieve common goals and objectives.",
    descriptionEs: "Trabajando efectivamente con equipos y stakeholders para lograr metas y objetivos comunes.",
  },
]

export function AboutStory() {
  const [language, setLanguage] = useState("en")

  const content = {
    en: {
      title: "My Journey in Data Science",
      story: [
        "My passion for data science began during my studies at ENES Morelia, where I discovered the power of transforming raw data into meaningful insights. With a strong foundation in mathematics and computer science, I quickly became fascinated by the potential of machine learning and artificial intelligence.",
        "Throughout my academic journey, I maintained an exceptional GPA of 9.3/10 while actively participating in research projects focused on AI education and gender bias in machine learning. These experiences shaped my understanding of both the technical and ethical aspects of data science.",
        "As a teaching assistant for neural networks and linear algebra courses, I developed strong communication skills and the ability to explain complex concepts in simple terms. This experience reinforced my belief that the best solutions are those that can be understood and implemented by diverse teams.",
        "Today, I combine my academic knowledge with practical experience to help businesses unlock the value hidden in their data. I specialize in creating end-to-end solutions that not only solve technical challenges but also drive real business outcomes.",
      ],
      storyEs: [
        "Mi pasión por la ciencia de datos comenzó durante mis estudios en ENES Morelia, donde descubrí el poder de transformar datos en bruto en insights significativos. Con una base sólida en matemáticas y ciencias de la computación, rápidamente me fasciné por el potencial del machine learning y la inteligencia artificial.",
        "A lo largo de mi trayectoria académica, mantuve un promedio excepcional de 9.3/10 mientras participaba activamente en proyectos de investigación enfocados en educación de IA y sesgo de género en machine learning. Estas experiencias moldearon mi comprensión tanto de los aspectos técnicos como éticos de la ciencia de datos.",
        "Como asistente de cátedra para cursos de redes neuronales y álgebra lineal, desarrollé habilidades de comunicación sólidas y la capacidad de explicar conceptos complejos en términos simples. Esta experiencia reforzó mi creencia de que las mejores soluciones son aquellas que pueden ser entendidas e implementadas por equipos diversos.",
        "Hoy, combino mi conocimiento académico con experiencia práctica para ayudar a las empresas a desbloquear el valor oculto en sus datos. Me especializo en crear soluciones de extremo a extremo que no solo resuelven desafíos técnicos sino que también impulsan resultados empresariales reales.",
      ],
      valuesTitle: "My Core Values",
      valuesTitleEs: "Mis Valores Fundamentales",
    },
    es: {
      title: "Mi Trayectoria en Ciencia de Datos",
      story: [
        "Mi pasión por la ciencia de datos comenzó durante mis estudios en ENES Morelia, donde descubrí el poder de transformar datos en bruto en insights significativos. Con una base sólida en matemáticas y ciencias de la computación, rápidamente me fasciné por el potencial del machine learning y la inteligencia artificial.",
        "A lo largo de mi trayectoria académica, mantuve un promedio excepcional de 9.3/10 mientras participaba activamente en proyectos de investigación enfocados en educación de IA y sesgo de género en machine learning. Estas experiencias moldearon mi comprensión tanto de los aspectos técnicos como éticos de la ciencia de datos.",
        "Como asistente de cátedra para cursos de redes neuronales y álgebra lineal, desarrollé habilidades de comunicación sólidas y la capacidad de explicar conceptos complejos en términos simples. Esta experiencia reforzó mi creencia de que las mejores soluciones son aquellas que pueden ser entendidas e implementadas por equipos diversos.",
        "Hoy, combino mi conocimiento académico con experiencia práctica para ayudar a las empresas a desbloquear el valor oculto en sus datos. Me especializo en crear soluciones de extremo a extremo que no solo resuelven desafíos técnicos sino que también impulsan resultados empresariales reales.",
      ],
      storyEs: [
        "Mi pasión por la ciencia de datos comenzó durante mis estudios en ENES Morelia, donde descubrí el poder de transformar datos en bruto en insights significativos. Con una base sólida en matemáticas y ciencias de la computación, rápidamente me fasciné por el potencial del machine learning y la inteligencia artificial.",
        "A lo largo de mi trayectoria académica, mantuve un promedio excepcional de 9.3/10 mientras participaba activamente en proyectos de investigación enfocados en educación de IA y sesgo de género en machine learning. Estas experiencias moldearon mi comprensión tanto de los aspectos técnicos como éticos de la ciencia de datos.",
        "Como asistente de cátedra para cursos de redes neuronales y álgebra lineal, desarrollé habilidades de comunicación sólidas y la capacidad de explicar conceptos complejos en términos simples. Esta experiencia reforzó mi creencia de que las mejores soluciones son aquellas que pueden ser entendidas e implementadas por equipos diversos.",
        "Hoy, combino mi conocimiento académico con experiencia práctica para ayudar a las empresas a desbloquear el valor oculto en sus datos. Me especializo en crear soluciones de extremo a extremo que no solo resuelven desafíos técnicos sino que también impulsan resultados empresariales reales.",
      ],
      valuesTitle: "Mis Valores Fundamentales",
      valuesTitleEs: "Mis Valores Fundamentales",
    },
  }

  const currentContent = content[language as keyof typeof content]
  const currentStory = language === "en" ? currentContent.story : currentContent.storyEs

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 text-balance gradient-text">
            {currentContent.title}
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {currentStory.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-lg text-muted-foreground leading-relaxed text-pretty"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-12 text-primary">
            {language === "en" ? currentContent.valuesTitle : currentContent.valuesTitleEs}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center border-border/50">
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <value.icon className="h-6 w-6 text-accent" />
                    </div>
                    <CardTitle className="text-lg">{language === "en" ? value.title : value.titleEs}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {language === "en" ? value.description : value.descriptionEs}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
