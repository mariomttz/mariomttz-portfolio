"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Brain, Database, BarChart3, Zap, Eye, MessageSquare, CheckCircle2, Flame } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { servicesData } from "@/lib/services-data"

const iconMap = {
  Brain,
  Database,
  BarChart3,
  Eye,
  MessageSquare,
  Zap,
}

export function ServicesPreview() {
  const { language } = useLanguage()

  const content = {
    en: {
      title: "Services",
      titleHighlight: "I Offer",
      subtitle: "Comprehensive data science solutions for your business",
      cta: "View All Services",
      mostRequested: "Most Requested",
    },
    es: {
      title: "Servicios que",
      titleHighlight: "Ofrezco",
      subtitle: "Soluciones integrales de ciencia de datos para tu negocio",
      cta: "Ver Todos los Servicios",
      mostRequested: "Más Solicitado",
    },
  }

  const currentContent = content[language as keyof typeof content]

  const previewServices = servicesData.slice(0, 4)

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
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 pb-2">
            {currentContent.title} <span className="gradient-text">{currentContent.titleHighlight}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">{currentContent.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {previewServices.map((service, index) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap]
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={`/services#${service.id}`} className="block h-full">
                  <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border/50 hover:border-primary/30 group bg-card cursor-pointer">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <Icon className="h-7 w-7 text-primary" />
                        </div>
                        {service.isMostRequested && (
                          <Badge className="bg-accent/10 text-accent border-accent/20 hover:bg-accent/20">
                            <Flame className="h-3 w-3 mr-1" />
                            {currentContent.mostRequested}
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl text-foreground">
                        {language === "en" ? service.title : service.titleEs}
                      </CardTitle>
                      <CardDescription className="text-sm leading-relaxed mt-2">
                        {language === "en" ? service.description : service.descriptionEs}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        {(language === "en" ? service.features : service.featuresEs).slice(0, 4).map((feature) => (
                          <div key={feature} className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button
            asChild
            size="lg"
            className="group gradient-primary hover:opacity-90 text-white border-0 shadow-lg glow-primary"
          >
            <Link href="/services">
              {currentContent.cta}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
