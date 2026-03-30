"use client"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

export function ServicesHero() {
  const { language } = useLanguage()

  const content = {
    en: {
      title: "Data Science Solutions That Drive Results",
      subtitle: "Transform your business with cutting-edge AI and machine learning expertise",
      description:
        "I provide end-to-end data science services, from initial data exploration to production-ready ML models. With a focus on practical solutions that deliver measurable business value.",
      cta: "Start Your Project",
    },
    es: {
      title: "Soluciones de Ciencia de Datos que Generan Resultados",
      subtitle: "Transforma tu negocio con experiencia de vanguardia en IA y machine learning",
      description:
        "Proporciono servicios integrales de ciencia de datos, desde la exploración inicial de datos hasta modelos ML listos para producción. Con enfoque en soluciones prácticas que entregan valor empresarial medible.",
      cta: "Iniciar Tu Proyecto",
    },
  }

  const currentContent = content[language as keyof typeof content]

  return (
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-1 gap-12 items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8 max-w-4xl mx-auto"
          >
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance gradient-text pb-2">
                  {currentContent.title}
                </h1>
                <p className="text-xl font-medium gradient-text">{currentContent.subtitle}</p>
                <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                  {currentContent.description}
                </p>
              </div>
            </div>

            <Button
              asChild
              size="lg"
              className="group gradient-primary hover:opacity-90 text-white border-0 shadow-lg glow-primary"
            >
              <Link href="/contact">
                {currentContent.cta}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
