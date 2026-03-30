"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Calendar, MapPin, ExternalLink, Github, ChevronRight } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

const experiences = [
  {
    title: "Coordination Assistant",
    titleEs: "Asistente de Coordinación",
    company: "ENES Morelia, UNAM",
    location: "Morelia, Michoacán",
    period: "Jan 2025 - May 2025",
    periodEs: "Ene 2025 - May 2025",
    type: "Academic",
    typeEs: "Académico",
    description: [
      "Collaborated as coordination assistant for the Information Technologies for Sciences degree program",
      "Organized and managed workshops and informational events for high school students",
      "Coordinated with team members to create and execute outreach strategies",
      "Designed and developed the official degree program website as a communication and promotion tool",
    ],
    descriptionEs: [
      "Colaboré como asistente de coordinación para la licenciatura en Tecnologías para la Información en Ciencias",
      "Organicé y gestioné talleres y eventos informativos para estudiantes de preparatoria",
      "Coordiné con miembros del equipo para crear y ejecutar estrategias de difusión",
      "Diseñé y desarrollé el sitio web oficial de la licenciatura como herramienta de comunicación y promoción",
    ],
    technologies: ["Web Development", "Project Management", "Communication"],
    technologiesEs: ["Desarrollo Web", "Gestión de Proyectos", "Comunicación"],
  },
  {
    title: "Teaching Assistant - Linear Algebra",
    titleEs: "Docente Adjunto - Álgebra Lineal",
    company: "ENES Morelia, UNAM",
    location: "Morelia, Michoacán",
    period: "Jan 2025 - May 2025",
    periodEs: "Ene 2025 - May 2025",
    type: "Teaching",
    typeEs: "Docencia",
    description: [
      "Assisted professor in teaching linear algebra course, facilitating student understanding",
      "Provided academic support for activities, exercises, assignments, and projects",
      "Led study sessions and Q&A spaces to strengthen theoretical understanding",
      "Supported installation and configuration of key tools: Python, Matplotlib, Jupyter, Anaconda, OpenCV",
      "Collaborated in reviewing and evaluating student work throughout the semester",
    ],
    descriptionEs: [
      "Asistí al profesor en la impartición del curso de álgebra lineal, facilitando la comprensión estudiantil",
      "Brindé apoyo académico en actividades, ejercicios, tareas y proyectos",
      "Dirigí sesiones de estudio y espacios de preguntas y respuestas para fortalecer la comprensión teórica",
      "Apoyé en la instalación y configuración de herramientas clave: Python, Matplotlib, Jupyter, Anaconda, OpenCV",
      "Colaboré en la revisión y evaluación del trabajo estudiantil durante el semestre",
    ],
    technologies: ["Python", "Jupyter", "Matplotlib", "OpenCV", "Teaching"],
    technologiesEs: ["Python", "Jupyter", "Matplotlib", "OpenCV", "Docencia"],
  },
  {
    title: "Teaching Assistant - Neural Networks",
    titleEs: "Docente Adjunto - Redes Neuronales",
    company: "ENES Morelia, UNAM",
    location: "Morelia, Michoacán",
    period: "Aug 2024 - Dec 2024",
    periodEs: "Ago 2024 - Dic 2024",
    type: "Teaching",
    typeEs: "Docencia",
    description: [
      "Assisted professor in teaching neural networks course, facilitating understanding of key concepts",
      "Helped students resolve doubts related to activities, exercises, assignments, and projects",
      "Conducted study sessions and doubt clarification to improve topic comprehension",
      "Provided assistance with tool installation: Python, Matplotlib, Pandas, PyTorch, Fastai, Anaconda",
      "Supported students in downloading datasets used for neural network training",
    ],
    descriptionEs: [
      "Asistí al profesor en la impartición de la materia de redes neuronales, facilitando la comprensión de conceptos clave",
      "Ayudé a los alumnos a resolver dudas relacionadas con actividades, ejercicios, tareas y trabajos",
      "Impartí sesiones de estudio y aclaración de dudas para mejorar la comprensión de los temas",
      "Proporcioné asistencia en la instalación de herramientas: Python, Matplotlib, Pandas, PyTorch, Fastai, Anaconda",
      "Apoyé a los estudiantes en la descarga de conjuntos de datos utilizados para entrenar redes neuronales",
    ],
    technologies: ["PyTorch", "Fastai", "Python", "Pandas", "Deep Learning"],
    technologiesEs: ["PyTorch", "Fastai", "Python", "Pandas", "Aprendizaje Profundo"],
  },
  {
    title: "Research Scholar",
    titleEs: "Becario de Investigación",
    company: "ENES Morelia, UNAM",
    location: "Morelia, Michoacán",
    period: "Jan 2024 - Dec 2024",
    periodEs: "Ene 2024 - Dic 2024",
    type: "Research",
    typeEs: "Investigación",
    description: [
      "Developed practice manuals in LaTeX and Jupyter notebooks for AI educational project",
      "Created materials for 'Multi-series Didactic Design to Enhance Mathematical Modeling and Critical Reflection in AI Learning'",
      "Incorporated constraint satisfaction exercises and practical AI materials",
      "Conducted bibliographic review to optimize existing resources and propose new educational content",
    ],
    descriptionEs: [
      "Elaboré manuales de práctica en LaTeX y notebooks en Jupyter para proyecto educativo de IA",
      "Creé materiales para 'Diseño Didáctico Multi-seriado para Potenciar Habilidades de Modelación Matemática y Reflexión Crítica en el Aprendizaje de la IA'",
      "Incorporé ejercicios de satisfacción de restricciones y materiales prácticos de IA",
      "Realicé revisión bibliográfica para optimizar recursos existentes y proponer nuevos contenidos educativos",
    ],
    technologies: ["LaTeX", "Jupyter", "AI Education", "Research"],
    technologiesEs: ["LaTeX", "Jupyter", "Educación en IA", "Investigación"],
  },
  {
    title: "Research Scholar - AI Bias",
    titleEs: "Becario de Investigación - Sesgos de IA",
    company: "ENES Morelia, UNAM",
    location: "Morelia, Michoacán",
    period: "Aug 2023 - Dec 2023",
    periodEs: "Ago 2023 - Dic 2023",
    type: "Research",
    typeEs: "Investigación",
    description: [
      "Contributed to 'AI in the Classroom Case Studies: Didactic Developments with Feminist Methodologies' project",
      "Conducted bibliographic review and prepared Multi-Dimensional Gender Bias Classification dataset",
      "Developed Jupyter notebooks for didactic activities illustrating gender bias",
      "Promoted critical thinking and best practices in Machine Learning",
    ],
    descriptionEs: [
      "Contribuí al proyecto 'Casos de estudio para IA en el aula: desarrollos didácticos con metodologías feministas'",
      "Realicé revisión bibliográfica y preparé el dataset Multi-Dimensional Gender Bias Classification",
      "Desarrollé notebooks en Jupyter para actividades didácticas que ilustran sesgos de género",
      "Promoví el pensamiento crítico y buenas prácticas en Machine Learning",
    ],
    technologies: ["Machine Learning", "Bias Detection", "Jupyter", "Research"],
    technologiesEs: ["Aprendizaje Automático", "Detección de Sesgos", "Jupyter", "Investigación"],
  },
]

const projects = [
  {
    title: "AI Bias Detection System",
    titleEs: "Sistema de Detección de Sesgos de IA",
    description: "Multi-dimensional gender bias classification system for ML models",
    descriptionEs: "Sistema de clasificación de sesgos de género multidimensional para modelos de ML",
    technologies: ["Python", "Scikit-learn", "Pandas", "Jupyter"],
    category: "Research",
    categoryEs: "Investigación",
    status: "Completed",
    statusEs: "Completado",
    github: "#",
    demo: "#",
  },
  {
    title: "Educational AI Platform",
    titleEs: "Plataforma Educativa de IA",
    description: "Interactive learning platform for AI concepts with hands-on exercises",
    descriptionEs: "Plataforma de aprendizaje interactiva para conceptos de IA con ejercicios prácticos",
    technologies: ["Python", "Django", "PyTorch", "JavaScript"],
    category: "Education",
    categoryEs: "Educación",
    status: "In Progress",
    statusEs: "En Progreso",
    github: "#",
    demo: "#",
  },
  {
    title: "Neural Network Optimizer",
    titleEs: "Optimizador de Redes Neuronales",
    description: "Automated hyperparameter optimization tool for deep learning models",
    descriptionEs: "Herramienta de optimización automática de hiperparámetros para modelos de aprendizaje profundo",
    technologies: ["PyTorch", "Optuna", "Python", "MLflow"],
    category: "ML Tools",
    categoryEs: "Herramientas ML",
    status: "Completed",
    statusEs: "Completado",
    github: "#",
    demo: "#",
  },
  {
    title: "Data Visualization Dashboard",
    titleEs: "Dashboard de Visualización de Datos",
    description: "Interactive dashboard for real-time data analysis and visualization",
    descriptionEs: "Dashboard interactivo para análisis y visualización de datos en tiempo real",
    technologies: ["Python", "Plotly", "Dash", "Pandas"],
    category: "Data Viz",
    categoryEs: "Visualización",
    status: "Completed",
    statusEs: "Completado",
    github: "#",
    demo: "#",
  },
]

const content = {
  en: {
    title: "Experience & Projects",
    subtitle: "Building the Future with Data",
    experienceTab: "Experience",
    projectsTab: "Projects",
    viewProject: "View Project",
    viewCode: "View Code",
    present: "Present",
  },
  es: {
    title: "Experiencia y Proyectos",
    subtitle: "Construyendo el Futuro con Datos",
    experienceTab: "Experiencia",
    projectsTab: "Proyectos",
    viewProject: "Ver Proyecto",
    viewCode: "Ver Código",
    present: "Presente",
  },
}

export function ExperienceSection() {
  const { language } = useLanguage()
  const [activeTab, setActiveTab] = useState("experience")

  const currentContent = content[language as keyof typeof content]

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{currentContent.title}</h2>
          <p className="text-xl text-primary font-medium">{currentContent.subtitle}</p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-background rounded-lg p-1 border">
            <Button
              variant={activeTab === "experience" ? "default" : "ghost"}
              onClick={() => setActiveTab("experience")}
              className="px-6"
            >
              {currentContent.experienceTab}
            </Button>
            <Button
              variant={activeTab === "projects" ? "default" : "ghost"}
              onClick={() => setActiveTab("projects")}
              className="px-6"
            >
              {currentContent.projectsTab}
            </Button>
          </div>
        </div>

        {/* Experience Tab */}
        {activeTab === "experience" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="space-y-2">
                        <CardTitle className="text-xl">{language === "en" ? exp.title : exp.titleEs}</CardTitle>
                        <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                          <span className="font-medium">{exp.company}</span>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{exp.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{language === "en" ? exp.period : exp.periodEs}</span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="secondary">{language === "en" ? exp.type : exp.typeEs}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {(language === "en" ? exp.description : exp.descriptionEs).map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-muted-foreground">
                          <ChevronRight className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {(language === "en" ? exp.technologies : exp.technologiesEs).map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-2 gap-8"
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-2">
                        <CardTitle className="text-lg">{language === "en" ? project.title : project.titleEs}</CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {language === "en" ? project.category : project.categoryEs}
                          </Badge>
                          <Badge variant={project.status === "Completed" ? "default" : "outline"} className="text-xs">
                            {language === "en" ? project.status : project.statusEs}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      {language === "en" ? project.description : project.descriptionEs}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button size="sm" variant="outline" asChild>
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-2" />
                          {currentContent.viewCode}
                        </a>
                      </Button>
                      <Button size="sm" asChild>
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          {currentContent.viewProject}
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
