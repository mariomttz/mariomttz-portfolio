"use client"

import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GraduationCap, Award, BookOpen, Calendar, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"

const education = [
  {
    degree: "Bachelor's in Information Technologies in Sciences",
    degreeEs: "Licenciatura en Tecnologías para la Información en Ciencias",
    institution: "ENES Morelia, UNAM",
    period: "2021 - 2025",
    gpa: "9.3/10",
    description:
      "Comprehensive program covering data science, machine learning, software engineering, and computational sciences with focus on practical applications.",
    descriptionEs:
      "Programa integral cubriendo ciencia de datos, machine learning, ingeniería de software y ciencias computacionales con enfoque en aplicaciones prácticas.",
    highlights: [
      "Graduated with honors (9.3/10 GPA)",
      "Research in AI education methodologies",
      "Teaching assistant for neural networks",
      "Gender bias research in ML",
    ],
    highlightsEs: [
      "Graduado con honores (promedio 9.3/10)",
      "Investigación en metodologías de educación en IA",
      "Asistente de cátedra en redes neuronales",
      "Investigación de sesgo de género en ML",
    ],
  },
]

const certifications = [
  {
    title: "Docker Course",
    titleEs: "Curso de Docker",
    provider: "Udemy",
    date: "January 2025",
    dateEs: "Enero 2025",
    linkedinUrl: "https://www.linkedin.com/in/mariomttz",
  },
  {
    title: "Web Development (HTML5, CSS3, JS)",
    titleEs: "Desarrollo Web (HTML5, CSS3, JS)",
    provider: "Udemy",
    date: "January 2025",
    dateEs: "Enero 2025",
    linkedinUrl: "https://www.linkedin.com/in/mariomttz",
  },
  {
    title: "Financial Education Diploma",
    titleEs: "Diplomado en Educación Financiera",
    provider: "CONDUSEF",
    date: "June - August 2024",
    dateEs: "Junio - Agosto 2024",
    linkedinUrl: "https://www.linkedin.com/in/mariomttz",
  },
  {
    title: "AI and Productivity Course",
    titleEs: "Curso de IA y Productividad",
    provider: "Google",
    date: "July 2024",
    dateEs: "Julio 2024",
    linkedinUrl: "https://www.linkedin.com/in/mariomttz",
  },
  {
    title: "Internet of Things Course",
    titleEs: "Curso de Internet de las Cosas",
    provider: "MIT Professional Education",
    date: "July 2024",
    dateEs: "Julio 2024",
    linkedinUrl: "https://www.linkedin.com/in/mariomttz",
  },
  {
    title: "Introduction to Data Science",
    titleEs: "Introducción a la Ciencia de Datos",
    provider: "IE University",
    date: "June 2024",
    dateEs: "Junio 2024",
    linkedinUrl: "https://www.linkedin.com/in/mariomttz",
  },
]

const experience = [
  {
    role: "Coordination Assistant",
    roleEs: "Asistente en la Coordinación",
    company: "ENES Morelia, UNAM",
    period: "January - May 2025",
    periodEs: "Enero - Mayo 2025",
    description:
      "Assisted in coordinating the Information Technologies in Sciences program, organizing workshops and events for prospective students.",
    descriptionEs:
      "Asistí en la coordinación del programa de Tecnologías para la Información en Ciencias, organizando talleres y eventos para estudiantes prospecto.",
    achievements: [
      "Organized informational workshops",
      "Developed program website",
      "Created promotional strategies",
      "Managed student outreach",
    ],
    achievementsEs: [
      "Organicé talleres informativos",
      "Desarrollé sitio web del programa",
      "Creé estrategias promocionales",
      "Gestioné alcance estudiantil",
    ],
  },
  {
    role: "Teaching Assistant - Linear Algebra",
    roleEs: "Docente Adjunto - Álgebra Lineal",
    company: "ENES Morelia, UNAM",
    period: "January - May 2025",
    periodEs: "Enero - Mayo 2025",
    description:
      "Assisted in teaching linear algebra course, providing academic support and helping students with practical applications using Python.",
    descriptionEs:
      "Asistí en la enseñanza del curso de álgebra lineal, proporcionando apoyo académico y ayudando a estudiantes con aplicaciones prácticas usando Python.",
    achievements: [
      "Supported 50+ students",
      "Led study sessions",
      "Configured Python environments",
      "Evaluated assignments",
    ],
    achievementsEs: [
      "Apoyé a 50+ estudiantes",
      "Dirigí sesiones de estudio",
      "Configuré entornos Python",
      "Evalué tareas",
    ],
  },
  {
    role: "Teaching Assistant - Neural Networks",
    roleEs: "Docente Adjunto - Redes Neuronales",
    company: "ENES Morelia, UNAM",
    period: "August - December 2024",
    periodEs: "Agosto - Diciembre 2024",
    description:
      "Assisted in neural networks course, helping students understand deep learning concepts and implement practical solutions.",
    descriptionEs:
      "Asistí en el curso de redes neuronales, ayudando a estudiantes a entender conceptos de deep learning e implementar soluciones prácticas.",
    achievements: [
      "Taught PyTorch and FastAI",
      "Guided practical projects",
      "Resolved technical issues",
      "Mentored student research",
    ],
    achievementsEs: [
      "Enseñé PyTorch y FastAI",
      "Guié proyectos prácticos",
      "Resolví problemas técnicos",
      "Mentoré investigación estudiantil",
    ],
  },
  {
    role: "Research Scholar",
    roleEs: "Becario de Investigación",
    company: "ENES Morelia, UNAM",
    period: "January - December 2024",
    periodEs: "Enero - Diciembre 2024",
    description:
      "Contributed to AI education research project, developing educational materials and studying mathematical modeling methodologies.",
    descriptionEs:
      "Contribuí al proyecto de investigación en educación de IA, desarrollando materiales educativos y estudiando metodologías de modelación matemática.",
    achievements: [
      "Created LaTeX manuals",
      "Developed Jupyter notebooks",
      "Conducted literature review",
      "Designed AI exercises",
    ],
    achievementsEs: [
      "Creé manuales en LaTeX",
      "Desarrollé notebooks Jupyter",
      "Realicé revisión bibliográfica",
      "Diseñé ejercicios de IA",
    ],
  },
]

export function AboutEducation() {
  const { language } = useLanguage()

  const content = {
    en: {
      educationTitle: "Education",
      experienceTitle: "Professional Experience",
      certificationsTitle: "Certifications & Courses",
      gpa: "GPA",
      highlights: "Key Highlights",
      achievements: "Key Achievements",
      viewCertificate: "View on LinkedIn",
    },
    es: {
      educationTitle: "Educación",
      experienceTitle: "Experiencia Profesional",
      certificationsTitle: "Certificaciones y Cursos",
      gpa: "Promedio",
      highlights: "Aspectos Destacados",
      achievements: "Logros Clave",
      viewCertificate: "Ver en LinkedIn",
    },
  }

  const currentContent = content[language as keyof typeof content]

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 gradient-text">
            {currentContent.educationTitle}
          </h2>
          <div className="max-w-4xl mx-auto">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-border/50">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                          <GraduationCap className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-lg sm:text-xl leading-tight">
                            {language === "en" ? edu.degree : edu.degreeEs}
                          </CardTitle>
                          <p className="text-muted-foreground text-sm sm:text-base">{edu.institution}</p>
                        </div>
                      </div>
                      <div className="flex sm:flex-col items-start gap-2 sm:text-right">
                        <Badge variant="outline" className="flex-shrink-0">
                          {edu.period}
                        </Badge>
                        <div className="flex items-center gap-2">
                          <Award className="h-4 w-4 text-accent flex-shrink-0" />
                          <span className="text-sm font-medium whitespace-nowrap">
                            {currentContent.gpa}: {edu.gpa}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                      {language === "en" ? edu.description : edu.descriptionEs}
                    </p>
                    <div>
                      <h4 className="font-semibold mb-3 text-sm sm:text-base">{currentContent.highlights}</h4>
                      <div className="grid gap-2">
                        {(language === "en" ? edu.highlights : edu.highlightsEs).map((highlight, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0 mt-2" />
                            <span className="text-sm text-muted-foreground">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Experience Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 gradient-text">
            {currentContent.experienceTitle}
          </h2>
          <div className="max-w-6xl mx-auto space-y-6">
            {experience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-border/50">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                          <BookOpen className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-base sm:text-lg leading-tight">
                            {language === "en" ? exp.role : exp.roleEs}
                          </CardTitle>
                          <p className="text-muted-foreground text-sm">{exp.company}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="flex items-center gap-2 flex-shrink-0 self-start">
                        <Calendar className="h-3 w-3" />
                        <span className="text-xs">{language === "en" ? exp.period : exp.periodEs}</span>
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                      {language === "en" ? exp.description : exp.descriptionEs}
                    </p>
                    <div>
                      <h4 className="font-semibold mb-3 text-sm sm:text-base">{currentContent.achievements}</h4>
                      <div className="grid gap-2">
                        {(language === "en" ? exp.achievements : exp.achievementsEs).map((achievement, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0 mt-2" />
                            <span className="text-sm text-muted-foreground">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 gradient-text">
            {currentContent.certificationsTitle}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 hover:border-accent/30">
                  <CardHeader className="pb-4">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mb-3">
                      <Award className="h-5 w-5 text-accent" />
                    </div>
                    <CardTitle className="text-sm sm:text-base leading-tight">
                      {language === "en" ? cert.title : cert.titleEs}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-accent">{cert.provider}</p>
                      <p className="text-xs text-muted-foreground">{language === "en" ? cert.date : cert.dateEs}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full group bg-transparent hover:bg-accent/5 hover:text-accent hover:border-accent/30 cursor-pointer"
                      onClick={() => window.open(cert.linkedinUrl, "_blank")}
                    >
                      <ExternalLink className="mr-2 h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                      <span className="text-xs sm:text-sm">{currentContent.viewCertificate}</span>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
