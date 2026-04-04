"use client"

import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Github, ExternalLink, MapPin, Calendar } from "lucide-react"
import { motion } from "framer-motion"

const articles = [
  {
    title: "Exploring Gender Bias in Machine Learning Models",
    titleEs: "Explorando el Sesgo de Género en Modelos de Machine Learning",
    description:
      "A comprehensive study analyzing gender bias patterns in popular machine learning models and proposing mitigation strategies for fairer AI systems.",
    descriptionEs:
      "Un estudio exhaustivo que analiza patrones de sesgo de género en modelos populares de machine learning y propone estrategias de mitigación para sistemas de IA más justos.",
    date: "October 2025",
    dateEs: "Octubre 2025",
    conference: "MICAI 2025",
    conferenceEs: "MICAI 2025",
    workshop: "ECSI Workshop",
    workshopEs: "Workshop ECSI",
    articleUrl: "#",
    githubUrl: "https://github.com/mariomttz",
  },
]

export function AboutArticles() {
  const { language } = useLanguage()

  const content = {
    en: {
      title: "Research & Publications",
      subtitle: "Academic contributions and upcoming publications in AI and machine learning",
      readArticle: "Read Article",
      viewCode: "View Code",
    },
    es: {
      title: "Investigación y Publicaciones",
      subtitle: "Contribuciones académicas y publicaciones próximas en IA y machine learning",
      readArticle: "Leer Artículo",
      viewCode: "Ver Código",
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
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 gradient-text">{currentContent.title}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">{currentContent.subtitle}</p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-6">
          {articles.map((article, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="hover:shadow-lg transition-all duration-300 border-border/50 hover:border-accent/30 overflow-hidden">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg sm:text-xl leading-tight mb-2">
                          {language === "en" ? article.title : article.titleEs}
                        </CardTitle>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <div className="flex flex-col">
                              <span className="font-medium">
                                {language === "en" ? article.conference : article.conferenceEs}
                              </span>
                              <span className="text-xs">
                                {language === "en" ? article.workshop : article.workshopEs}
                              </span>
                            </div>
                          </div>
                          <div className="hidden sm:block text-muted-foreground/30">•</div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{language === "en" ? article.date : article.dateEs}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                    {language === "en" ? article.description : article.descriptionEs}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border/50">
                    <Button
                      size="lg"
                      variant="outline"
                      className="group bg-transparent hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all duration-300 flex-1 sm:flex-initial cursor-pointer"
                      onClick={() => window.open(article.articleUrl, "_blank")}
                    >
                      <ExternalLink className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      {currentContent.readArticle}
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="group bg-transparent hover:bg-accent/5 hover:text-accent hover:border-accent/30 flex-1 sm:flex-initial cursor-pointer"
                      onClick={() => window.open(article.githubUrl, "_blank")}
                    >
                      <Github className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                      {currentContent.viewCode}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
