"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"

export function CTACard() {
  const { language } = useLanguage()

  const content = {
    en: {
      title: "Have an idea or project in mind?",
      description:
        "I'm available for freelance collaborations and always open to discuss new challenges. If you think I can help take your project to the next level, don't hesitate to reach out.",
      startProject: "Start Project",
      scheduleCall: "Schedule a Call",
    },
    es: {
      title: "¿Tienes una idea o un proyecto en mente?",
      description:
        "Estoy disponible para colaboraciones freelance y siempre abierto a discutir nuevos desafíos. Si crees que puedo ayudarte a llevar tu proyecto al siguiente nivel, no dudes en escribirme.",
      startProject: "Iniciar proyecto",
      scheduleCall: "Agendar llamada",
    },
  }

  const currentContent = content[language as keyof typeof content]

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="relative overflow-hidden rounded-3xl gradient-primary p-12 shadow-2xl glow-primary">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]" />

            <div className="relative z-10 text-center space-y-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-balance">
                {currentContent.title}
              </h2>
              <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto text-pretty leading-relaxed">
                {currentContent.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 shadow-lg group">
                  <Link href="/contact">
                    {currentContent.startProject}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="group bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary shadow-lg transition-all"
                >
                  <Link href="/contact">
                    <Calendar className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                    {currentContent.scheduleCall}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
