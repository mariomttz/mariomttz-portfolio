"use client"

import React, { useState, useEffect, useRef } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, CheckCircle, Clock, Globe, Calendar } from "lucide-react"
import { motion } from "framer-motion"
import { servicesData, budgetRanges } from "@/lib/services-data"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSearchParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"

const SHOW_AVAILABILITY_SCHEDULE = true

interface ContactFormProps {
  preSelectedService?: string
}

export function ContactForm({ preSelectedService }: ContactFormProps) {
  const { language } = useLanguage()
  const nameInputRef = useRef<HTMLInputElement>(null)
  const formContainerRef = useRef<HTMLDivElement>(null)
  const searchParams = useSearchParams()
  const hasAutoFocused = useRef(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: preSelectedService || "",
    budget: "",
    timeline: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [captchaVerified, setCaptchaVerified] = useState(false)

  useEffect(() => {
    if (preSelectedService) {
      setFormData((prev) => ({ ...prev, service: preSelectedService }))
    }
  }, [preSelectedService])

  useEffect(() => {
    // Only auto-focus once when component mounts
    if (!hasAutoFocused.current) {
      const timer = setTimeout(() => {
        const hash = window.location.hash
        // If there's a #form hash, scroll to the form
        if (hash === "#form") {
          formContainerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
        }
        // Always focus on the name input on first load
        nameInputRef.current?.focus()
        hasAutoFocused.current = true
      }, 100)

      return () => clearTimeout(timer)
    }
  }, []) // Empty dependency array - only runs once on mount

  const timelineOptions = {
    en: [
      { value: "urgent", label: "Urgent (Less than 1 month)" },
      { value: "soon", label: "Soon (1-3 months)" },
      { value: "medium", label: "Medium-term (3+ months)" },
      { value: "flexible", label: "Flexible / To be defined" },
    ],
    es: [
      { value: "urgent", label: "Urgente (En menos de 1 mes)" },
      { value: "soon", label: "Próximamente (De 1 a 3 meses)" },
      { value: "medium", label: "A mediano plazo (3+ meses)" },
      { value: "flexible", label: "Flexible / Aún por definir" },
    ],
  }

  const content = {
    en: {
      title: "Send Me a Message",
      subtitle: "Fill out the form below and I'll get back to you soon",
      name: "Full Name",
      email: "Email Address",
      company: "Company (Optional)",
      service: "Service of Interest",
      servicePlaceholder: "Select a service",
      budget: "Estimated Budget (Optional)",
      budgetPlaceholder: "Select a budget range",
      timeline: "Development Timeline (Optional)",
      timelinePlaceholder: "Select a timeline",
      message: "Project Description",
      namePlaceholder: "Your full name",
      emailPlaceholder: "your.email@company.com",
      companyPlaceholder: "Your company name",
      messagePlaceholder: "Tell me about your project, goals, and any specific requirements...",
      captchaLabel: "Please verify you're human",
      captchaButton: "Verify with Cloudflare Turnstile",
      captchaVerified: "Verified ✓",
      submit: "Send Message",
      submitting: "Sending...",
      successTitle: "Message Sent!",
      successMessage: "Thank you for reaching out. I'll get back to you within 24 hours.",
      availabilityTitle: "Availability & Schedule",
      availabilityDescription: "Current working hours and availability for new projects",
      workingDays: "Working Days",
      workingHours: "Working Hours",
      timezone: "Timezone",
      mondayFriday: "Monday - Friday",
      hours: "9:00 AM - 6:00 PM",
      timezoneValue: "EST (UTC-5)",
      communicationTitle: "Communication Preferences",
      communicationDescription:
        "Feel free to reach out via email, video call, or your preferred method. I'm fluent in both English and Spanish, so communicate in whichever language you're most comfortable with.",
      languagesBadge: "English & Spanish",
      methodsBadge: "Email, Video Call, Chat",
    },
    es: {
      title: "Envíame un Mensaje",
      subtitle: "Completa el formulario y te responderé pronto",
      name: "Nombre Completo",
      email: "Correo Electrónico",
      company: "Empresa (Opcional)",
      service: "Servicio de Interés",
      servicePlaceholder: "Selecciona un servicio",
      budget: "Presupuesto Estimado (Opcional)",
      budgetPlaceholder: "Selecciona un rango de presupuesto",
      timeline: "Tiempo de Desarrollo (Opcional)",
      timelinePlaceholder: "Selecciona un tiempo",
      message: "Descripción del Proyecto",
      namePlaceholder: "Tu nombre completo",
      emailPlaceholder: "tu.email@empresa.com",
      companyPlaceholder: "Nombre de tu empresa",
      messagePlaceholder: "Cuéntame sobre tu proyecto, objetivos y cualquier requerimiento específico...",
      captchaLabel: "Por favor verifica que eres humano",
      captchaButton: "Verificar con Cloudflare Turnstile",
      captchaVerified: "Verificado ✓",
      submit: "Enviar Mensaje",
      submitting: "Enviando...",
      successTitle: "¡Mensaje Enviado!",
      successMessage: "Gracias por contactarme. Te responderé dentro de 24 horas.",
      availabilityTitle: "Disponibilidad y Horario",
      availabilityDescription: "Horario de trabajo actual y disponibilidad para nuevos proyectos",
      workingDays: "Días Laborales",
      workingHours: "Horario de Trabajo",
      timezone: "Zona Horaria",
      mondayFriday: "Lunes - Viernes",
      hours: "9:00 AM - 6:00 PM",
      timezoneValue: "EST (UTC-5)",
      communicationTitle: "Preferencias de Comunicación",
      communicationDescription:
        "Siéntete libre de contactarme por correo electrónico, videollamada o tu método preferido. Hablo inglés y español con fluidez, así que comunícate en el idioma con el que te sientas más cómodo.",
      languagesBadge: "Inglés y Español",
      methodsBadge: "Email, Videollamada, Chat",
    },
  }

  const currentContent = content[language as keyof typeof content]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!captchaVerified) {
      alert(language === "en" ? "Please verify the CAPTCHA first" : "Por favor verifica el CAPTCHA primero")
      return
    }

    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: "",
        email: "",
        company: "",
        service: "",
        budget: "",
        timeline: "",
        message: "",
      })
      setCaptchaVerified(false)
    }, 3000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCaptchaVerify = () => {
    // Simulate CAPTCHA verification
    // In production, this would integrate with Cloudflare Turnstile or Google reCAPTCHA
    setCaptchaVerified(true)
  }

  if (isSubmitted) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
            role="status"
            aria-live="polite"
          >
            <Card className="border-success/30 bg-success/5 dark:bg-success/10">
              <CardContent className="pt-8 pb-8">
                <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" aria-hidden="true" />
                <h3 className="text-2xl font-bold text-success mb-2">{currentContent.successTitle}</h3>
                <p className="text-success/80">{currentContent.successMessage}</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section ref={formContainerRef} id="contact-form" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Communication Preferences Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            <Card className="border-accent/30 bg-accent/5 dark:bg-accent/10">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-accent" />
                  <CardTitle className="text-lg">{currentContent.communicationTitle}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                  {currentContent.communicationDescription}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                    {currentContent.languagesBadge}
                  </Badge>
                  <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                    {currentContent.methodsBadge}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Availability Schedule Card - Conditional rendering */}
          {SHOW_AVAILABILITY_SCHEDULE && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="md:col-span-2"
            >
              <Card className="border-primary/30 bg-primary/5 dark:bg-primary/10">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">{currentContent.availabilityTitle}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{currentContent.availabilityDescription}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="flex items-start gap-2">
                      <Calendar className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          {currentContent.workingDays}
                        </p>
                        <p className="text-sm font-semibold">{currentContent.mondayFriday}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          {currentContent.workingHours}
                        </p>
                        <p className="text-sm font-semibold">{currentContent.hours}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Globe className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          {currentContent.timezone}
                        </p>
                        <p className="text-sm font-semibold">{currentContent.timezoneValue}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Card className="border-border/50 hover:border-accent/30 transition-colors">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">{currentContent.title}</CardTitle>
              <p className="text-muted-foreground">{currentContent.subtitle}</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm">
                      {currentContent.name} *
                    </Label>
                    <Input
                      ref={nameInputRef}
                      id="name"
                      type="text"
                      placeholder={currentContent.namePlaceholder}
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                      className="h-11"
                      aria-required="true"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm">
                      {currentContent.email} *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={currentContent.emailPlaceholder}
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                      className="h-11"
                      aria-required="true"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company" className="text-sm">
                    {currentContent.company}
                  </Label>
                  <Input
                    id="company"
                    type="text"
                    placeholder={currentContent.companyPlaceholder}
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    className="h-11"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="service" className="text-sm">
                      {currentContent.service} *
                    </Label>
                    <Select
                      value={formData.service}
                      onValueChange={(value) => handleInputChange("service", value)}
                      required
                    >
                      <SelectTrigger className="h-11 cursor-pointer" aria-required="true">
                        <SelectValue placeholder={currentContent.servicePlaceholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {servicesData.map((service) => (
                          <SelectItem key={service.id} value={service.id}>
                            {language === "en" ? service.title : service.titleEs}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="budget" className="text-sm">
                      {currentContent.budget}
                    </Label>
                    <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                      <SelectTrigger className="h-11 cursor-pointer">
                        <SelectValue placeholder={currentContent.budgetPlaceholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {budgetRanges[language as keyof typeof budgetRanges].map((range) => (
                          <SelectItem key={range.value} value={range.value}>
                            {range.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="timeline" className="text-sm">
                      {currentContent.timeline}
                    </Label>
                    <Select value={formData.timeline} onValueChange={(value) => handleInputChange("timeline", value)}>
                      <SelectTrigger className="h-11 cursor-pointer">
                        <SelectValue placeholder={currentContent.timelinePlaceholder} className="truncate" />
                      </SelectTrigger>
                      <SelectContent>
                        {timelineOptions[language as keyof typeof timelineOptions].map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm">
                    {currentContent.message} *
                  </Label>
                  <Textarea
                    id="message"
                    placeholder={currentContent.messagePlaceholder}
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    rows={10}
                    required
                    className="resize-none"
                    aria-required="true"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-sm">{currentContent.captchaLabel}</Label>
                  <div className="flex items-center gap-3">
                    <Button
                      type="button"
                      variant={captchaVerified ? "secondary" : "outline"}
                      onClick={handleCaptchaVerify}
                      disabled={captchaVerified}
                      className="w-full hover:border-accent/50 transition-colors cursor-pointer disabled:cursor-not-allowed"
                    >
                      {captchaVerified ? (
                        <>
                          <CheckCircle className="mr-2 h-4 w-4 text-success" />
                          {currentContent.captchaVerified}
                        </>
                      ) : (
                        currentContent.captchaButton
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {language === "en"
                      ? "This site is protected by Cloudflare Turnstile"
                      : "Este sitio está protegido por Cloudflare Turnstile"}
                  </p>
                </div>

          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting || !captchaVerified}
            className="w-full gradient-primary hover:opacity-90 text-white border-0 shadow-lg glow-primary disabled:opacity-50 cursor-pointer"
          >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      {currentContent.submitting}
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      {currentContent.submit}
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
