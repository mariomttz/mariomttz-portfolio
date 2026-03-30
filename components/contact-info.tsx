"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mail, MapPin, Clock, Globe, Linkedin, Github, Calendar, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

const workingHours = [
  { day: "Monday - Friday", dayEs: "Lunes - Viernes", hours: "9:00 AM - 6:00 PM CST" },
  { day: "Saturday", dayEs: "Sábado", hours: "10:00 AM - 2:00 PM CST" },
  { day: "Sunday", dayEs: "Domingo", hours: "Closed", hoursEs: "Cerrado" },
]

const services = [
  { name: "Machine Learning Consulting", nameEs: "Consultoría en Machine Learning" },
  { name: "Data Pipeline Development", nameEs: "Desarrollo de Pipelines de Datos" },
  { name: "Custom Analytics Dashboards", nameEs: "Dashboards de Analítica Personalizados" },
  { name: "AI Model Training & Optimization", nameEs: "Entrenamiento y Optimización de Modelos IA" },
  { name: "Process Automation", nameEs: "Automatización de Procesos" },
  { name: "Data Science Training", nameEs: "Capacitación en Ciencia de Datos" },
]

export function ContactInfo() {
  const [language, setLanguage] = useState("en")

  const content = {
    en: {
      title: "Contact Information",
      subtitle: "Multiple ways to reach me",
      location: "",
      timezone: "Central Standard Time (CST)",
      email: "contact@mariomttz.me",
      availability: "Available for Projects",
      workingHours: "Working Hours",
      servicesTitle: "Services Available",
      responseTime: "Response Time",
      responseTimeValue: "Within 24 hours",
      languages: "Languages",
      languagesList: "Spanish (Native), English (B2), Italian (A1)",
      scheduleCall: "Schedule a Call",
      emailMe: "Send Email",
      viewLinkedIn: "View LinkedIn",
      viewGitHub: "View GitHub",
    },
    es: {
      title: "Información de Contacto",
      subtitle: "Múltiples formas de contactarme",
      location: "",
      timezone: "Hora Estándar Central (CST)",
      email: "contact@mariomttz.me",
      availability: "Disponible para Proyectos",
      workingHours: "Horario de Trabajo",
      servicesTitle: "Servicios Disponibles",
      responseTime: "Tiempo de Respuesta",
      responseTimeValue: "Dentro de 24 horas",
      languages: "Idiomas",
      languagesList: "Español (Nativo), Inglés (B2), Italiano (A1)",
      scheduleCall: "Agendar Llamada",
      emailMe: "Enviar Email",
      viewLinkedIn: "Ver LinkedIn",
      viewGitHub: "Ver GitHub",
    },
  }

  const currentContent = content[language as keyof typeof content]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="border-border/50 hover:border-accent/30 transition-colors">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">{currentContent.title}</CardTitle>
              <p className="text-muted-foreground">{currentContent.subtitle}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Contact Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium">{currentContent.location}</p>
                    <p className="text-sm text-muted-foreground">{currentContent.timezone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Mail className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium">{currentContent.email}</p>
                    <Badge variant="secondary" className="mt-1 bg-success/10 text-success border-success/20">
                      {currentContent.availability}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Clock className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium">{currentContent.responseTime}</p>
                    <p className="text-sm text-muted-foreground">{currentContent.responseTimeValue}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Globe className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium">{currentContent.languages}</p>
                    <p className="text-sm text-muted-foreground">{currentContent.languagesList}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  asChild
                  size="lg"
                  className="w-full gradient-primary hover:opacity-90 text-white border-0 shadow-lg glow-primary"
                >
                  <a href="mailto:contact@mariomttz.me">
                    <Mail className="mr-2 h-4 w-4" />
                    {currentContent.emailMe}
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="w-full group bg-transparent hover:bg-accent/10 hover:text-accent hover:border-accent transition-all"
                >
                  <a href="https://calendly.com/mariomttz" target="_blank" rel="noopener noreferrer">
                    <Calendar className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                    {currentContent.scheduleCall}
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="w-full group bg-transparent hover:bg-accent/10 hover:text-accent hover:border-accent transition-all"
                >
                  <a href="https://linkedin.com/in/mariomttz" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                    {currentContent.viewLinkedIn}
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="w-full group bg-transparent hover:bg-accent/10 hover:text-accent hover:border-accent transition-all"
                >
                  <a href="https://github.com/mariomttz" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                    {currentContent.viewGitHub}
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Working Hours */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <Card className="border-border/50 hover:border-accent/30 transition-colors">
            <CardHeader>
              <CardTitle className="text-lg text-primary">{currentContent.workingHours}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {workingHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm font-medium">{language === "en" ? schedule.day : schedule.dayEs}</span>
                    <span className="text-sm text-muted-foreground">
                      {language === "es" && schedule.hoursEs ? schedule.hoursEs : schedule.hours}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Services Available */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Card className="border-border/50 hover:border-accent/30 transition-colors">
            <CardHeader>
              <CardTitle className="text-lg text-primary">{currentContent.servicesTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {services.map((service, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                    <span className="text-sm">{language === "en" ? service.name : service.nameEs}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
