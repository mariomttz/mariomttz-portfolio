"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Quote, Sparkles } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

const testimonials = {
  en: [
    {
      initials: "SC",
      name: "Sarah Chen",
      title: "VP of Engineering",
      company: "TechFlow",
      quote:
        "Working with Mario was transformative for our ML infrastructure. His deep understanding of both theory and production systems helped us deploy models that not only performed exceptionally but scaled seamlessly.",
      metric: "45% increase in model accuracy",
    },
    {
      initials: "DR",
      name: "David Rodriguez",
      title: "Head of Data Science",
      company: "DataVision",
      quote:
        "Mario's expertise in computer vision and deep learning is outstanding. He delivered a production-ready solution ahead of schedule that exceeded our accuracy targets and reduced inference time significantly.",
      metric: "70% faster processing time",
    },
    {
      initials: "ET",
      name: "Emily Thompson",
      title: "CTO",
      company: "CloudScale",
      quote:
        "Exceptional technical skills combined with clear communication. Mario optimized our recommendation engine, resulting in measurable improvements in user engagement and system performance.",
      metric: "3x improvement in throughput",
    },
  ],
  es: [
    {
      initials: "SC",
      name: "Sarah Chen",
      title: "VP de Ingeniería",
      company: "TechFlow",
      quote:
        "Trabajar con Mario fue transformador para nuestra infraestructura de ML. Su profundo conocimiento tanto de teoría como de sistemas de producción nos ayudó a implementar modelos que no solo funcionaron excepcionalmente sino que escalaron sin problemas.",
      metric: "45% de aumento en precisión del modelo",
    },
    {
      initials: "DR",
      name: "David Rodriguez",
      title: "Director de Ciencia de Datos",
      company: "DataVision",
      quote:
        "La experiencia de Mario en visión por computadora y aprendizaje profundo es sobresaliente. Entregó una solución lista para producción antes de lo previsto que superó nuestros objetivos de precisión y redujo significativamente el tiempo de inferencia.",
      metric: "70% más rápido en procesamiento",
    },
    {
      initials: "ET",
      name: "Emily Thompson",
      title: "CTO",
      company: "CloudScale",
      quote:
        "Habilidades técnicas excepcionales combinadas con comunicación clara. Mario optimizó nuestro motor de recomendaciones, resultando en mejoras medibles en la participación de usuarios y el rendimiento del sistema.",
      metric: "3x mejora en rendimiento",
    },
  ],
}

const content = {
  en: {
    badge: "Client Testimonials",
    title: "Trusted by",
    titleHighlight: "Industry Leaders",
    subtitle: "Real feedback from clients who've experienced measurable results",
  },
  es: {
    badge: "Testimonios de Clientes",
    title: "Confiado por",
    titleHighlight: "Líderes de la Industria",
    subtitle: "Comentarios reales de clientes que han experimentado resultados medibles",
  },
}

export function Testimonials() {
  const { language } = useLanguage()
  const currentContent = content[language as keyof typeof content] || content.en
  const currentTestimonials = testimonials[language as keyof typeof testimonials] || testimonials.en

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge
            variant="secondary"
            className="text-sm px-4 py-2 mb-6 bg-accent/10 text-accent border-accent/20 dark:bg-accent/10 dark:text-accent dark:border-accent/30"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            {currentContent.badge}
          </Badge>

          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            {currentContent.title} <span className="gradient-text">{currentContent.titleHighlight}</span>
          </h2>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{currentContent.subtitle}</p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentTestimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-border/50">
                <CardContent className="p-6 flex flex-col h-full">
                  {/* Header with Avatar and Quote Icon */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center">
                      <span className="text-lg font-bold text-accent">{testimonial.initials}</span>
                    </div>
                    <Quote className="h-8 w-8 text-accent/20" />
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-muted-foreground mb-6 flex-grow leading-relaxed">"{testimonial.quote}"</p>

                  {/* Metric Badge */}
                  <div className="mb-4">
                    <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20 text-xs px-3 py-1">
                      ✦ {testimonial.metric}
                    </Badge>
                  </div>

                  {/* Client Info */}
                  <div className="border-t border-border/50 pt-4">
                    <p className="font-semibold text-foreground mb-1">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground mb-1">{testimonial.title}</p>
                    <p className="text-sm font-medium text-accent">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
