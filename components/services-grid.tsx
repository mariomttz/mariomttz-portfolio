"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Brain, Database, BarChart3, Zap, Eye, MessageSquare, Flame } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"
import { useRouter } from "next/navigation"
import { servicesData } from "@/lib/services-data"
import { useEffect } from "react"

const iconMap = {
  Brain,
  Database,
  BarChart3,
  Eye,
  MessageSquare,
  Zap,
}

export function ServicesGrid() {
  const { language } = useLanguage()
  const router = useRouter()

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash)
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" })
          // Add a highlight effect
          element.classList.add("ring-2", "ring-primary", "ring-offset-2")
          setTimeout(() => {
            element.classList.remove("ring-2", "ring-primary", "ring-offset-2")
          }, 2000)
        }
      }, 100)
    }
  }, [])

  const content = {
    en: {
      title: "Comprehensive Data Science Services",
      subtitle: "Choose from a range of specialized services tailored to your business needs",
      getQuote: "Get Quote",
      keyFeatures: "Key Features",
      mostRequested: "Most Requested",
    },
    es: {
      title: "Servicios Integrales de Ciencia de Datos",
      subtitle: "Elige entre una gama de servicios especializados adaptados a las necesidades de tu negocio",
      getQuote: "Obtener Cotización",
      keyFeatures: "Características Clave",
      mostRequested: "Más Solicitado",
    },
  }

  const currentContent = content[language as keyof typeof content]

  const handleGetQuote = (serviceId: string) => {
    router.push(`/contact?service=${serviceId}`)
  }

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance text-primary">
            {currentContent.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">{currentContent.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap]
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  id={service.id}
                  className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-border/50 hover:border-primary/30 flex flex-col"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                        <Icon className="h-6 w-6 text-accent" />
                      </div>
                      {service.isMostRequested && (
                        <Badge className="bg-accent/10 text-accent border-accent/20 hover:bg-accent/20">
                          <Flame className="h-3 w-3 mr-1" />
                          {currentContent.mostRequested}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl mb-2 text-primary">
                      {language === "en" ? service.title : service.titleEs}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      {language === "en" ? service.description : service.descriptionEs}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 flex-1 flex flex-col">
                    <div>
                      <h4 className="font-semibold text-sm mb-3 text-primary">{currentContent.keyFeatures}</h4>
                      <div className="space-y-2">
                        {(language === "en" ? service.features : service.featuresEs).map((feature) => (
                          <div key={feature} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button
                      onClick={() => handleGetQuote(service.id)}
                      className="w-full bg-transparent hover:bg-accent/10 hover:text-accent hover:border-accent/50 transition-all duration-300 mt-auto dark:bg-transparent dark:hover:bg-accent/10 dark:hover:text-accent dark:hover:border-accent/50 cursor-pointer"
                      variant="outline"
                      size="lg"
                    >
                      {currentContent.getQuote}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
