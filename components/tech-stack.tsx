"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"
import { Sparkles } from "lucide-react"

const techStackRow1 = [
  {
    name: "Python",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "PyTorch",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
  },
  {
    name: "TensorFlow",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
  },
  {
    name: "Scikit-learn",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg",
  },
  {
    name: "Pandas",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
  },
  {
    name: "NumPy",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
  },
]

const techStackRow2 = [
  {
    name: "PostgreSQL",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  {
    name: "Docker",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  {
    name: "Git",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  {
    name: "Jupyter",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg",
  },
  {
    name: "FastAPI",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
  },
  {
    name: "Linux",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
  },
]

export function TechStack() {
  const { language } = useLanguage()

  const content = {
    en: {
      badge: "30+ Technologies Mastered",
      title: "Tech",
      titleHighlight: "Stack",
      subtitle: "Tools and technologies I use to create innovative solutions",
    },
    es: {
      badge: "30+ Tecnologías Dominadas",
      title: "Stack",
      titleHighlight: "Tecnológico",
      subtitle: "Herramientas y tecnologías que utilizo para crear soluciones innovadoras",
    },
  }

  const currentContent = content[language as keyof typeof content]

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge
            variant="secondary"
            className="text-sm px-4 py-2 mb-6 bg-accent/10 text-accent border-accent/20 dark:bg-accent/10 dark:text-accent dark:border-accent/30"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            {currentContent.badge}
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 pb-2">
            {currentContent.title} <span className="gradient-text">{currentContent.titleHighlight}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">{currentContent.subtitle}</p>
        </motion.div>

        <div className="space-y-8">
          {/* First Row - Scrolling Right */}
          <div className="relative">
            <div className="flex gap-6 animate-scroll-right">
              {[...techStackRow1, ...techStackRow1].map((tech, index) => (
                <Card
                  key={`${tech.name}-${index}`}
                  className="flex-shrink-0 w-40 border-border/50 bg-card"
                >
                  <CardContent className="p-6 flex flex-col items-center justify-center space-y-3">
                    <div className="w-16 h-16 flex items-center justify-center">
                      <Image
                        src={tech.logo || "/placeholder.svg"}
                        alt={tech.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p className="text-sm font-medium text-center text-card-foreground">{tech.name}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Second Row - Scrolling Left */}
          <div className="relative">
            <div className="flex gap-6 animate-scroll-left">
              {[...techStackRow2, ...techStackRow2].map((tech, index) => (
                <Card
                  key={`${tech.name}-${index}`}
                  className="flex-shrink-0 w-40 border-border/50 bg-card"
                >
                  <CardContent className="p-6 flex flex-col items-center justify-center space-y-3">
                    <div className="w-16 h-16 flex items-center justify-center">
                      <Image
                        src={tech.logo || "/placeholder.svg"}
                        alt={tech.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p className="text-sm font-medium text-center text-card-foreground">{tech.name}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-right {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scroll-left {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-scroll-right {
          animation: scroll-right 30s linear infinite;
        }

        .animate-scroll-left {
          animation: scroll-left 30s linear infinite;
        }

        .gradient-text {
          background: linear-gradient(to right, #6a11cb, #2575fc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </section>
  )
}
