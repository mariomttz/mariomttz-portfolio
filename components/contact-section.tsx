"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send, Github, Linkedin, MessageCircle, Calendar, CheckCircle } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    labelEs: "Correo",
    value: "contact@mariomttz.me",
    href: "mailto:contact@mariomttz.me",
  },
  {
    icon: Phone,
    label: "Phone",
    labelEs: "Teléfono",
    value: "",
    href: "#",
  },
  {
    icon: MapPin,
    label: "Location",
    labelEs: "Ubicación",
    value: "",
    href: "#",
  },
]

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/mariomttz",
    username: "@mariomttz",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/mariomttz",
    username: "mariomttz",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    href: "#",
    username: "",
  },
]

export function ContactSection() {
  const { language } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const content = {
    en: {
      title: "Let's Work Together",
      subtitle: "Ready to Transform Your Data into Insights?",
      description:
        "I'm available for freelance projects and consulting opportunities. Whether you need help with machine learning, data analysis, or AI implementation, I'd love to discuss how we can work together.",
      formTitle: "Send me a message",
      nameLabel: "Name",
      emailLabel: "Email",
      subjectLabel: "Subject",
      messageLabel: "Message",
      namePlaceholder: "Your name",
      emailPlaceholder: "your.email@example.com",
      subjectPlaceholder: "Project inquiry",
      messagePlaceholder: "Tell me about your project...",
      sendButton: "Send Message",
      sendingButton: "Sending...",
      successMessage: "Message sent successfully! I'll get back to you soon.",
      contactInfo: "Contact Information",
      followMe: "Follow Me",
      availability: "Available for freelance projects",
      responseTime: "Usually responds within 24 hours",
    },
    es: {
      title: "Trabajemos Juntos",
      subtitle: "¿Listo para Transformar tus Datos en Insights?",
      description:
        "Estoy disponible para proyectos freelance y oportunidades de consultoría. Ya sea que necesites ayuda con machine learning, análisis de datos o implementación de IA, me encantaría discutir cómo podemos trabajar juntos.",
      formTitle: "Envíame un mensaje",
      nameLabel: "Nombre",
      emailLabel: "Correo",
      subjectLabel: "Asunto",
      messageLabel: "Mensaje",
      namePlaceholder: "Tu nombre",
      emailPlaceholder: "tu.correo@ejemplo.com",
      subjectPlaceholder: "Consulta de proyecto",
      messagePlaceholder: "Cuéntame sobre tu proyecto...",
      sendButton: "Enviar Mensaje",
      sendingButton: "Enviando...",
      successMessage: "¡Mensaje enviado exitosamente! Te responderé pronto.",
      contactInfo: "Información de Contacto",
      followMe: "Sígueme",
      availability: "Disponible para proyectos freelance",
      responseTime: "Usualmente responde en 24 horas",
    },
  }

  const currentContent = content[language as keyof typeof content]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: "", email: "", subject: "", message: "" })

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{currentContent.title}</h2>
          <p className="text-xl text-primary font-medium mb-6">{currentContent.subtitle}</p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">{currentContent.description}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold mb-6">{currentContent.contactInfo}</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="p-4 hover:shadow-md transition-shadow">
                      <CardContent className="p-0">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-primary/10 rounded-lg">
                            <info.icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{language === "en" ? info.label : info.labelEs}</p>
                            {info.href !== "#" ? (
                              <a
                                href={info.href}
                                className="text-muted-foreground hover:text-primary transition-colors"
                              >
                                {info.value}
                              </a>
                            ) : (
                              <p className="text-muted-foreground">{info.value}</p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Availability Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 bg-primary/5 border-primary/20">
                <CardContent className="p-0 space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
                    <span className="font-medium text-success">{currentContent.availability}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{currentContent.responseTime}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Social Links */}
            <div>
              <h3 className="text-xl font-semibold mb-4">{currentContent.followMe}</h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Button variant="outline" size="sm" asChild className="group bg-transparent">
                      <a href={social.href} target="_blank" rel="noopener noreferrer">
                        <social.icon className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                        {social.label}
                      </a>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">{currentContent.formTitle}</CardTitle>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
                    <p className="text-lg font-medium text-success">{currentContent.successMessage}</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">{currentContent.nameLabel}</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder={currentContent.namePlaceholder}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">{currentContent.emailLabel}</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder={currentContent.emailPlaceholder}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">{currentContent.subjectLabel}</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder={currentContent.subjectPlaceholder}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">{currentContent.messageLabel}</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder={currentContent.messagePlaceholder}
                        rows={6}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full group" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          {currentContent.sendingButton}
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          {currentContent.sendButton}
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
