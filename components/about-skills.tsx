"use client"

import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, Database, Brain, BarChart3, Globe, Users, BookOpen, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

const skillCategories = [
  {
    id: "programming",
    icon: Code,
    title: "Programming",
    titleEs: "Programación",
    skills: [
      {
        name: "Python",
        level: 95,
        category: "Expert",
        years: 4,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      },
      {
        name: "R",
        level: 85,
        category: "Advanced",
        years: 3,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg",
      },
      {
        name: "SQL",
        level: 90,
        category: "Expert",
        years: 4,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      },
      {
        name: "JavaScript",
        level: 75,
        category: "Intermediate",
        years: 2,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      },
      {
        name: "HTML/CSS",
        level: 80,
        category: "Advanced",
        years: 3,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      },
      {
        name: "Bash",
        level: 70,
        category: "Intermediate",
        years: 2,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg",
      },
      {
        name: "LaTeX",
        level: 85,
        category: "Advanced",
        years: 3,
        logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg",
      },
      {
        name: "C/C++",
        level: 60,
        category: "Basic",
        years: 1,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
      },
    ],
  },
  {
    id: "ml-ai",
    icon: Brain,
    title: "ML & AI",
    titleEs: "ML e IA",
    skills: [
      {
        name: "Machine Learning",
        level: 95,
        category: "Expert",
        years: 4,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      },
      {
        name: "Deep Learning",
        level: 90,
        category: "Expert",
        years: 3,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
      },
      {
        name: "PyTorch",
        level: 90,
        category: "Expert",
        years: 3,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
      },
      {
        name: "TensorFlow",
        level: 85,
        category: "Advanced",
        years: 2,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
      },
      {
        name: "Scikit-learn",
        level: 95,
        category: "Expert",
        years: 4,
        logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg",
      },
      {
        name: "Computer Vision",
        level: 85,
        category: "Advanced",
        years: 3,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg",
      },
      {
        name: "NLP",
        level: 80,
        category: "Advanced",
        years: 2,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      },
      {
        name: "MLOps",
        level: 75,
        category: "Intermediate",
        years: 2,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      },
    ],
  },
  {
    id: "data",
    icon: Database,
    title: "Data & Analytics",
    titleEs: "Datos y Analítica",
    skills: [
      {
        name: "Pandas",
        level: 95,
        category: "Expert",
        years: 4,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
      },
      {
        name: "NumPy",
        level: 95,
        category: "Expert",
        years: 4,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
      },
      {
        name: "Matplotlib",
        level: 90,
        category: "Expert",
        years: 4,
        logo: "https://upload.wikimedia.org/wikipedia/commons/8/84/Matplotlib_icon.svg",
      },
      {
        name: "Seaborn",
        level: 90,
        category: "Expert",
        years: 3,
        logo: "https://seaborn.pydata.org/_images/logo-mark-lightbg.svg",
      },
      {
        name: "Plotly",
        level: 85,
        category: "Advanced",
        years: 3,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/plotly/plotly-original.svg",
      },
      {
        name: "PostgreSQL",
        level: 85,
        category: "Advanced",
        years: 3,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      },
      {
        name: "MongoDB",
        level: 70,
        category: "Intermediate",
        years: 2,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      },
      {
        name: "Apache Spark",
        level: 65,
        category: "Basic",
        years: 1,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachespark/apachespark-original.svg",
      },
    ],
  },
  {
    id: "tools",
    icon: BarChart3,
    title: "Tools & Platforms",
    titleEs: "Herramientas y Plataformas",
    skills: [
      {
        name: "Git/GitHub",
        level: 90,
        category: "Expert",
        years: 4,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      },
      {
        name: "Docker",
        level: 80,
        category: "Advanced",
        years: 2,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      },
      {
        name: "Jupyter",
        level: 95,
        category: "Expert",
        years: 4,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg",
      },
      {
        name: "VS Code",
        level: 90,
        category: "Expert",
        years: 4,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
      },
      {
        name: "Linux",
        level: 85,
        category: "Advanced",
        years: 3,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
      },
      {
        name: "PowerBI",
        level: 80,
        category: "Advanced",
        years: 2,
        logo: "https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg",
      },
      {
        name: "Streamlit",
        level: 85,
        category: "Advanced",
        years: 2,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/streamlit/streamlit-original.svg",
      },
      {
        name: "FastAPI",
        level: 75,
        category: "Intermediate",
        years: 2,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
      },
    ],
  },
  {
    id: "ai-tools",
    icon: Sparkles,
    title: "AI Tools",
    titleEs: "Herramientas de IA",
    skills: [
      {
        name: "ChatGPT",
        level: 95,
        category: "Expert",
        years: 2,
        logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
      },
      {
        name: "Claude",
        level: 90,
        category: "Expert",
        years: 1,
        logo: "https://www.anthropic.com/_next/image?url=%2Fimages%2Ficons%2Fclaude-app-icon.png&w=96&q=75",
      },
      {
        name: "Gemini",
        level: 85,
        category: "Advanced",
        years: 1,
        logo: "https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg",
      },
      {
        name: "v0",
        level: 90,
        category: "Expert",
        years: 1,
        logo: "https://v0.dev/v0.svg",
      },
      {
        name: "GitHub Copilot",
        level: 85,
        category: "Advanced",
        years: 2,
        logo: "https://github.githubassets.com/assets/copilot-8a7f0bf0b5d1.svg",
      },
      {
        name: "Midjourney",
        level: 75,
        category: "Intermediate",
        years: 1,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/midjourney/midjourney-original.svg",
      },
      {
        name: "Perplexity",
        level: 80,
        category: "Advanced",
        years: 1,
        logo: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/perplexity-ai-icon.png",
      },
      {
        name: "Cursor",
        level: 85,
        category: "Advanced",
        years: 1,
        logo: "https://www.cursor.com/brand/icon.svg",
      },
    ],
  },
  {
    id: "knowledge",
    icon: BookOpen,
    title: "Knowledge",
    titleEs: "Conocimientos",
    skills: [
      {
        name: "Algorithms & Data Structures",
        nameEs: "Algoritmos y Estructuras de Datos",
        level: 90,
        category: "Expert",
        years: 4,
        logo: "🧮",
      },
      {
        name: "Databases",
        nameEs: "Bases de Datos",
        level: 85,
        category: "Advanced",
        years: 3,
        logo: "🗄️",
      },
      {
        name: "Software Engineering",
        nameEs: "Ingeniería de Software",
        level: 80,
        category: "Advanced",
        years: 3,
        logo: "⚙️",
      },
      {
        name: "Statistics & Probability",
        nameEs: "Estadística y Probabilidad",
        level: 95,
        category: "Expert",
        years: 4,
        logo: "📊",
      },
      {
        name: "Linear Algebra",
        nameEs: "Álgebra Lineal",
        level: 90,
        category: "Expert",
        years: 4,
        logo: "📐",
      },
      {
        name: "Calculus",
        nameEs: "Cálculo",
        level: 85,
        category: "Advanced",
        years: 4,
        logo: "∫",
      },
      {
        name: "Computer Networks",
        nameEs: "Redes de Computadoras",
        level: 70,
        category: "Intermediate",
        years: 2,
        logo: "🌐",
      },
      {
        name: "Operating Systems",
        nameEs: "Sistemas Operativos",
        level: 75,
        category: "Intermediate",
        years: 3,
        logo: "💻",
      },
    ],
  },
  {
    id: "languages",
    icon: Globe,
    title: "Languages",
    titleEs: "Idiomas",
    skills: [
      { name: "Spanish", level: 100, category: "Native", nameEs: "Español", logo: "🇪🇸" },
      { name: "English", level: 85, category: "B2", nameEs: "Inglés", logo: "🇺🇸" },
      { name: "Italian", level: 30, category: "A1", nameEs: "Italiano", logo: "🇮🇹" },
    ],
  },
  {
    id: "soft",
    icon: Users,
    title: "Soft Skills",
    titleEs: "Habilidades Blandas",
    skills: [
      { name: "Problem Solving", level: 95, category: "Expert", nameEs: "Resolución de Problemas", logo: "🧩" },
      { name: "Communication", level: 90, category: "Expert", nameEs: "Comunicación", logo: "💬" },
      { name: "Team Leadership", level: 85, category: "Advanced", nameEs: "Liderazgo de Equipo", logo: "👥" },
      { name: "Project Management", level: 80, category: "Advanced", nameEs: "Gestión de Proyectos", logo: "📊" },
      { name: "Critical Thinking", level: 95, category: "Expert", nameEs: "Pensamiento Crítico", logo: "🧠" },
      { name: "Adaptability", level: 90, category: "Expert", nameEs: "Adaptabilidad", logo: "🔄" },
    ],
  },
]

const getLevelColor = (level: number) => {
  if (level >= 90) return "bg-gradient-to-r from-primary to-accent"
  if (level >= 75) return "bg-accent"
  if (level >= 60) return "bg-accent/70"
  return "bg-muted-foreground/50"
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Expert":
    case "Native":
      return "bg-accent/15 text-accent border-accent/40 dark:bg-accent/20 dark:text-accent dark:border-accent/50"
    case "Advanced":
    case "B2":
      return "bg-primary/15 text-primary border-primary/40 dark:bg-primary/20 dark:text-primary dark:border-primary/50"
    case "Intermediate":
    case "A1":
      return "bg-success/15 text-success border-success/40 dark:bg-success/20 dark:text-success dark:border-success/50"
    case "Basic":
      return "bg-muted/80 text-foreground border-border dark:bg-muted dark:text-foreground dark:border-border"
    default:
      return "bg-muted text-muted-foreground border-border dark:bg-muted/80 dark:text-muted-foreground"
  }
}

export function AboutSkills() {
  const { language } = useLanguage()

  const content = {
    en: {
      title: "Skills & Expertise",
      subtitle: "Technical proficiencies and core competencies developed through education and experience",
      proficiency: "Proficiency",
      experience: "Experience",
      years: "years",
      year: "year",
    },
    es: {
      title: "Habilidades y Experiencia",
      subtitle: "Competencias técnicas y fundamentales desarrolladas a través de educación y experiencia",
      proficiency: "Competencia",
      experience: "Experiencia",
      years: "años",
      year: "año",
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance gradient-text">
            {currentContent.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">{currentContent.subtitle}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Tabs defaultValue="programming" className="w-full">
            <TabsList className="flex flex-wrap justify-center gap-2 h-auto mb-8 p-2 mx-auto max-w-fit">
              {skillCategories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-3 sm:py-2 data-[state=active]:bg-accent/10 data-[state=active]:text-accent dark:data-[state=active]:bg-accent/10 dark:data-[state=active]:text-accent text-xs sm:text-sm cursor-pointer transition-all"
                >
                  <category.icon className="h-4 w-4 flex-shrink-0" />
                  <span className="text-center">{language === "en" ? category.title : category.titleEs}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {skillCategories.map((category, categoryIndex) => (
              <TabsContent key={category.id} value={category.id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {category.skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Card className="h-full border-border/50">
                        <CardHeader className="pb-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              {skill.logo && (
                                <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                                  {skill.logo.startsWith("http") ? (
                                    <Image
                                      src={skill.logo || "/placeholder.svg"}
                                      alt={skill.name}
                                      width={32}
                                      height={32}
                                      className="w-full h-full object-contain"
                                    />
                                  ) : (
                                    <span className="text-2xl">{skill.logo}</span>
                                  )}
                                </div>
                              )}
                              <CardTitle className="text-base">
                                {language === "es" && skill.nameEs ? skill.nameEs : skill.name}
                              </CardTitle>
                            </div>
                            <Badge variant="outline" className={`${getCategoryColor(skill.category)} flex-shrink-0`}>
                              {skill.category}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">{currentContent.proficiency}</span>
                              <span className="font-medium">{skill.level}%</span>
                            </div>
                            <Progress value={skill.level} className="h-2">
                              <div
                                className={`h-full rounded-full transition-all duration-1000 ${getLevelColor(
                                  skill.level,
                                )}`}
                                style={{ width: `${skill.level}%` }}
                              />
                            </Progress>
                            {skill.years && (
                              <div className="flex items-center justify-between text-sm pt-2 border-t border-border/50">
                                <span className="text-muted-foreground">{currentContent.experience}</span>
                                <span className="font-medium text-accent">
                                  {skill.years} {skill.years === 1 ? currentContent.year : currentContent.years}
                                </span>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
}
