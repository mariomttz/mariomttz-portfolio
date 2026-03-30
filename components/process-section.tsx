"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Lightbulb, Code, Rocket, BarChart, Headphones } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"

const processSteps = [
  {
    icon: Search,
    step: "01",
    title: "Discovery & Analysis",
    titleEs: "Descubrimiento y Análisis",
    description:
      "Understanding your business needs, data landscape, and project objectives through detailed consultation.",
    descriptionEs:
      "Entendiendo las necesidades de tu negocio, panorama de datos y objetivos del proyecto a través de consulta detallada.",
  },
  {
    icon: Lightbulb,
    step: "02",
    title: "Strategy & Planning",
    titleEs: "Estrategia y Planificación",
    description: "Developing a comprehensive project roadmap with clear milestones, timelines, and deliverables.",
    descriptionEs: "Desarrollando una hoja de ruta integral del proyecto con hitos claros, cronogramas y entregables.",
  },
  {
    icon: Code,
    step: "03",
    title: "Development & Implementation",
    titleEs: "Desarrollo e Implementación",
    description: "Building and training models, developing pipelines, and creating solutions using best practices.",
    descriptionEs:
      "Construyendo y entrenando modelos, desarrollando pipelines y creando soluciones usando mejores prácticas.",
  },
  {
    icon: BarChart,
    step: "04",
    title: "Testing & Validation",
    titleEs: "Pruebas y Validación",
    description: "Rigorous testing, performance validation, and optimization to ensure reliable results.",
    descriptionEs: "Pruebas rigurosas, validación de rendimiento y optimización para asegurar resultados confiables.",
  },
  {
    icon: Rocket,
    step: "05",
    title: "Deployment & Launch",
    titleEs: "Despliegue y Lanzamiento",
    description: "Seamless deployment to production environment with monitoring and documentation.",
    descriptionEs: "Despliegue sin problemas al entorno de producción con monitoreo y documentación.",
  },
  {
    icon: Headphones,
    step: "06",
    title: "Support & Maintenance",
    titleEs: "Soporte y Mantenimiento",
    description: "Ongoing support, monitoring, updates, and optimization to ensure continued success.",
    descriptionEs: "Soporte continuo, monitoreo, actualizaciones y optimización para asegurar el éxito continuo.",
  },
]

export function ProcessSection() {
  const { language } = useLanguage()

  const content = {
    en: {
      title: "My Development Process",
      subtitle: "A proven methodology that ensures successful project delivery",
    },
    es: {
      title: "Mi Proceso de Desarrollo",
      subtitle: "Una metodología probada que asegura la entrega exitosa de proyectos",
    },
  }

  const currentContent = content[language as keyof typeof content]

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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance text-primary">
            {currentContent.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">{currentContent.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full relative overflow-hidden border-border/50">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center">
                      <step.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl font-bold text-accent/30">{step.step}</span>
                    <CardTitle className="text-lg text-primary">
                      {language === "en" ? step.title : step.titleEs}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {language === "en" ? step.description : step.descriptionEs}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
