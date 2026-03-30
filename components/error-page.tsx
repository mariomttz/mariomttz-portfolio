"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"
import { AlertCircle, Home } from "lucide-react"

interface ErrorPageProps {
  errorCode: string
  title?: {
    en: string
    es: string
  }
  description?: {
    en: string
    es: string
  }
  showReset?: boolean
  onReset?: () => void
}

export function ErrorPage({ errorCode, title, description, showReset = false, onReset }: ErrorPageProps) {
  const { language } = useLanguage()

  const defaultTitles: Record<string, { en: string; es: string }> = {
    "404": {
      en: "Page Not Found",
      es: "Página No Encontrada",
    },
    "500": {
      en: "Internal Server Error",
      es: "Error Interno del Servidor",
    },
    "502": {
      en: "Bad Gateway",
      es: "Puerta de Enlace Incorrecta",
    },
    "503": {
      en: "Service Unavailable",
      es: "Servicio No Disponible",
    },
  }

  const defaultDescriptions: Record<string, { en: string; es: string }> = {
    "404": {
      en: "The page you're looking for doesn't exist or has been moved.",
      es: "La página que buscas no existe o ha sido movida.",
    },
    "500": {
      en: "Something went wrong on our end. Please try again later.",
      es: "Algo salió mal de nuestro lado. Por favor, intenta de nuevo más tarde.",
    },
    "502": {
      en: "The server received an invalid response. Please try again.",
      es: "El servidor recibió una respuesta inválida. Por favor, intenta de nuevo.",
    },
    "503": {
      en: "The service is temporarily unavailable. Please try again later.",
      es: "El servicio no está disponible temporalmente. Por favor, intenta de nuevo más tarde.",
    },
  }

  const content = {
    en: {
      backHome: "Back to Home",
      tryAgain: "Try Again",
    },
    es: {
      backHome: "Volver al Inicio",
      tryAgain: "Intentar de Nuevo",
    },
  }

  const currentContent = content[language]
  const currentTitle = title || defaultTitles[errorCode] || defaultTitles["500"]
  const currentDescription = description || defaultDescriptions[errorCode] || defaultDescriptions["500"]

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto"
      >
        {/* Error Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full" />
            <AlertCircle className="relative h-24 w-24 text-accent" />
          </div>
        </motion.div>

        {/* Error Code */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-8xl md:text-9xl font-bold gradient-text mb-4"
        >
          {errorCode}
        </motion.h1>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-2xl md:text-3xl font-bold text-foreground mb-4"
        >
          {currentTitle[language]}
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-muted-foreground text-lg mb-8 max-w-md mx-auto"
        >
          {currentDescription[language]}
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button asChild size="lg" className="gradient-primary text-white hover:opacity-90 transition-opacity">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              {currentContent.backHome}
            </Link>
          </Button>

          {showReset && onReset && (
            <Button
              onClick={onReset}
              size="lg"
              variant="outline"
              className="border-2 border-border hover:bg-accent/10 hover:border-accent/50 transition-colors bg-transparent"
            >
              {currentContent.tryAgain}
            </Button>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}
