"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Github, Linkedin, Mail, Calendar, Heart, ArrowUp, ChevronDown } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"
import { servicesData } from "@/lib/services-data"
import { useState } from "react"

const quickLinks = [
  { name: "Home", nameEs: "Inicio", href: "/" },
  { name: "Services", nameEs: "Servicios", href: "/services" },
  { name: "Projects", nameEs: "Proyectos", href: "/projects" },
  { name: "About", nameEs: "Sobre mí", href: "/about" },
  { name: "Contact", nameEs: "Contacto", href: "/contact#form" },
]

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/mariomttz",
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/mariomttz",
    label: "LinkedIn",
  },
  {
    icon: Mail,
    href: "mailto:contact@mariomttz.me",
    label: "Email",
  },
  {
    icon: Calendar,
    href: "https://calendly.com/mariomttz",
    label: "Calendly",
  },
]

export function Footer() {
  const { language } = useLanguage()
  const [openSections, setOpenSections] = useState({
    quickLinks: false,
    services: false,
    availability: false,
  })

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const content = {
    en: {
      tagline: "Transforming Data into Intelligence",
      description:
        "Freelance Data Scientist and Machine Learning Engineer helping businesses unlock the power of their data through innovative AI solutions.",
      quickLinks: "Quick Links",
      services: "Services",
      availability: "Availability",
      availabilityText: "Currently available for freelance projects and consulting. Response time: 24-48 hours.",
      contactMe: "Contact Me",
      contact: "Get in Touch",
      email: "contact@mariomttz.me",
      copyright: "All rights reserved.",
      madeWith: "Made with",
      backToTop: "Back to top",
    },
    es: {
      tagline: "Transformando Datos en Inteligencia",
      description:
        "Científico de Datos e Ingeniero de Machine Learning freelance ayudando a empresas a desbloquear el poder de sus datos a través de soluciones innovadoras de IA.",
      quickLinks: "Enlaces Rápidos",
      services: "Servicios",
      availability: "Disponibilidad",
      availabilityText:
        "Actualmente disponible para proyectos freelance y consultoría. Tiempo de respuesta: 24-48 horas.",
      contactMe: "Contáctame",
      contact: "Contacto",
      email: "contact@mariomttz.me",
      copyright: "Todos los derechos reservados.",
      madeWith: "Hecho con",
      backToTop: "Volver arriba",
    },
  }

  const currentContent = content[language as keyof typeof content]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2 md:col-span-2 space-y-4">
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                  Mario Martinez
                </h3>
                <p className="text-lg text-muted-foreground font-medium mb-4">{currentContent.tagline}</p>
                <p className="text-muted-foreground leading-relaxed text-pretty">{currentContent.description}</p>
              </div>

              {/* Social Links */}
              <div className="flex gap-4 pt-4">
                {socialLinks.map((social, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    asChild
                    className="group bg-transparent hover:bg-accent/10 hover:text-accent hover:border-accent transition-all"
                  >
                    <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                      <social.icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="hidden lg:block">
              <h4 className="font-semibold text-lg mb-4 text-primary">{currentContent.quickLinks}</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-accent transition-colors duration-200 hover:translate-x-1 inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
                    >
                      {language === "en" ? link.name : link.nameEs}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="hidden lg:block">
              <h4 className="font-semibold text-lg mb-4 text-primary">{currentContent.services}</h4>
              <ul className="space-y-3">
                {servicesData.map((service) => (
                  <li key={service.id}>
                    <Link
                      href={`/contact?service=${service.id}`}
                      className="text-muted-foreground hover:text-accent transition-colors duration-200 hover:translate-x-1 inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
                    >
                      {language === "en" ? service.title : service.titleEs}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Availability */}
            <div className="hidden lg:block">
              <h4 className="font-semibold text-lg mb-4 text-primary">{currentContent.availability}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4 text-pretty">
                {currentContent.availabilityText}
              </p>
              <Button
                asChild
                size="lg"
                className="w-full group gradient-primary hover:opacity-90 text-white border-0 shadow-lg glow-primary"
              >
                <Link href="/contact">{currentContent.contactMe}</Link>
              </Button>
            </div>
          </div>

          <div className="lg:hidden mt-8 space-y-4">
            {/* Quick Links Dropdown */}
            <div className="overflow-hidden">
              <button 
                onClick={() => toggleSection("quickLinks")} 
                className="w-full flex items-center justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded p-2"
                aria-expanded={openSections.quickLinks}
                aria-label={openSections.quickLinks ? (language === "en" ? "Collapse quick links" : "Contraer enlaces rápidos") : (language === "en" ? "Expand quick links" : "Expandir enlaces rápidos")}
              >
                <h4 className="font-semibold text-lg text-primary">{currentContent.quickLinks}</h4>
                <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${openSections.quickLinks ? 'rotate-180' : ''}`} />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openSections.quickLinks ? "max-h-96" : "max-h-0"
                }`}
              >
                <ul className="p-4 space-y-3">
                  {quickLinks.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="text-muted-foreground hover:text-accent transition-colors duration-200 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
                      >
                        {language === "en" ? link.name : link.nameEs}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Services Dropdown */}
            <div className="overflow-hidden">
              <button 
                onClick={() => toggleSection("services")} 
                className="w-full flex items-center justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded p-2"
                aria-expanded={openSections.services}
                aria-label={openSections.services ? (language === "en" ? "Collapse services" : "Contraer servicios") : (language === "en" ? "Expand services" : "Expandir servicios")}
              >
                <h4 className="font-semibold text-lg text-primary">{currentContent.services}</h4>
                <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${openSections.services ? 'rotate-180' : ''}`} />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openSections.services ? "max-h-96" : "max-h-0"
                }`}
              >
                <ul className="p-4 space-y-3">
                  {servicesData.map((service) => (
                    <li key={service.id}>
                      <Link
                        href={`/contact?service=${service.id}`}
                        className="text-muted-foreground hover:text-accent transition-colors duration-200 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
                      >
                        {language === "en" ? service.title : service.titleEs}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Availability Dropdown */}
            <div className="overflow-hidden">
              <button
                onClick={() => toggleSection("availability")}
                className="w-full flex items-center justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded p-2"
                aria-expanded={openSections.availability}
                aria-label={openSections.availability ? (language === "en" ? "Collapse availability" : "Contraer disponibilidad") : (language === "en" ? "Expand availability" : "Expandir disponibilidad")}
              >
                <h4 className="font-semibold text-lg text-primary">{currentContent.availability}</h4>
                <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${openSections.availability ? 'rotate-180' : ''}`} />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openSections.availability ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="p-4 space-y-4">
                  <p className="text-muted-foreground text-sm leading-relaxed text-pretty">
                    {currentContent.availabilityText}
                  </p>
                  <Button
                    asChild
                    size="lg"
                    className="w-full group gradient-primary hover:opacity-90 text-white border-0 shadow-lg glow-primary"
                  >
                    <Link href="/contact">{currentContent.contactMe}</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Bottom Footer */}
        <div className="py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>© {new Date().getFullYear()} Mario Martinez.</span>
              <span>{currentContent.copyright}</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <span>{currentContent.madeWith}</span>
                <Heart className="h-4 w-4 text-error fill-current animate-pulse" />
                <span>in Mexico</span>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={scrollToTop}
                className="group hover:bg-accent/10 hover:text-accent transition-all cursor-pointer"
                aria-label={currentContent.backToTop}
              >
                <ArrowUp className="h-4 w-4 mr-2 transition-transform group-hover:-translate-y-1" />
                {currentContent.backToTop}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
