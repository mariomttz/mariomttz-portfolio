"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { Brain, Code, Database, BarChart3, Zap, Users, Award, BookOpen } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

const skills = {
  programming: [
    { name: "Python", level: 95, category: "Expert" },
    { name: "R", level: 85, category: "Advanced" },
    { name: "SQL", level: 90, category: "Expert" },
    { name: "JavaScript", level: 75, category: "Intermediate" },
    { name: "HTML/CSS", level: 80, category: "Advanced" },
    { name: "Bash", level: 85, category: "Advanced" },
  ],
  frameworks: [
    { name: "PyTorch", level: 90, category: "Expert" },
    { name: "TensorFlow", level: 85, category: "Advanced" },
    { name: "Scikit-learn", level: 95, category: "Expert" },
    { name: "Pandas", level: 95, category: "Expert" },
    { name: "NumPy", level: 95, category: "Expert" },
    { name: "Matplotlib", level: 90, category: "Expert" },
    { name: "Django", level: 75, category: "Intermediate" },
    { name: "FastAPI", level: 80, category: "Advanced" },
  ],
  tools: [
    { name: "Docker", level: 80, category: "Advanced" },
    { name: "Git/GitHub", level: 90, category: "Expert" },
    { name: "Jupyter", level: 95, category: "Expert" },
    { name: "Anaconda", level: 90, category: "Expert" },
    { name: "Power BI", level: 85, category: "Advanced" },
    { name: "Linux", level: 85, category: "Advanced" },
  ],
}

const specializations = [
  {
    icon: Brain,
    title: "Machine Learning",
    titleEs: "Aprendizaje Automático",
    description: "Advanced algorithms, model optimization, and predictive analytics",
    descriptionEs: "Algoritmos avanzados, optimización de modelos y análisis predictivo",
    technologies: ["Scikit-learn", "XGBoost", "Random Forest", "SVM"],
  },
  {
    icon: Code,
    title: "Deep Learning",
    titleEs: "Aprendizaje Profundo",
    description: "Neural networks, computer vision, and natural language processing",
    descriptionEs: "Redes neuronales, visión por computadora y procesamiento de lenguaje natural",
    technologies: ["PyTorch", "TensorFlow", "Keras", "OpenCV"],
  },
  {
    icon: Database,
    title: "Data Engineering",
    titleEs: "Ingeniería de Datos",
    description: "ETL pipelines, data warehousing, and big data processing",
    descriptionEs: "Pipelines ETL, almacenes de datos y procesamiento de big data",
    technologies: ["SQL", "Pandas", "Dask", "Hadoop"],
  },
  {
    icon: BarChart3,
    title: "Data Visualization",
    titleEs: "Visualización de Datos",
    description: "Interactive dashboards and compelling data storytelling",
    descriptionEs: "Dashboards interactivos y narrativa convincente de datos",
    technologies: ["Matplotlib", "Plotly", "Seaborn", "Power BI"],
  },
]

const achievements = [
  {
    icon: Award,
    title: "Academic Excellence",
    titleEs: "Excelencia Académica",
    description: "9.3 GPA in Information Technologies for Sciences",
    descriptionEs: "Promedio de 9.3 en Tecnologías para la Información en Ciencias",
  },
  {
    icon: BookOpen,
    title: "Research Experience",
    titleEs: "Experiencia en Investigación",
    description: "Published research on AI bias and educational methodologies",
    descriptionEs: "Investigación publicada sobre sesgos de IA y metodologías educativas",
  },
  {
    icon: Users,
    title: "Teaching Assistant",
    titleEs: "Asistente de Docencia",
    description: "Neural Networks and Linear Algebra courses",
    descriptionEs: "Cursos de Redes Neuronales y Álgebra Lineal",
  },
  {
    icon: Zap,
    title: "Automation Expert",
    titleEs: "Experto en Automatización",
    description: "Process optimization and workflow automation",
    descriptionEs: "Optimización de procesos y automatización de flujos de trabajo",
  },
]

export function AboutSection() {
  const { language } = useLanguage()

  const content = {
    en: {
      title: "About Me",
      subtitle: "Transforming Data into Intelligence",
      description: [
        "I'm a passionate Data Scientist and Machine Learning Engineer with a strong academic background and hands-on experience in developing AI solutions. I graduated with a 9.3 GPA from ENES Morelia, specializing in Information Technologies for Sciences.",
        "My expertise spans the entire data science pipeline, from data collection and preprocessing to model deployment and optimization. I have a proven track record in research, having contributed to projects on AI bias detection and educational methodologies.",
        "As a freelancer, I focus on delivering practical, scalable solutions that drive real business value. I combine technical excellence with clear communication to ensure my clients understand and can leverage the insights I provide.",
      ],
      skillsTitle: "Technical Skills",
      specializationsTitle: "Specializations",
      achievementsTitle: "Key Achievements",
      programmingTab: "Programming",
      frameworksTab: "Frameworks",
      toolsTab: "Tools",
    },
    es: {
      title: "Acerca de Mí",
      subtitle: "Transformando Datos en Inteligencia",
      description: [
        "Soy un Científico de Datos e Ingeniero de Machine Learning apasionado con una sólida formación académica y experiencia práctica en el desarrollo de soluciones de IA. Me gradué con promedio de 9.3 de ENES Morelia, especializándome en Tecnologías para la Información en Ciencias.",
        "Mi experiencia abarca todo el pipeline de ciencia de datos, desde la recolección y preprocesamiento de datos hasta el despliegue y optimización de modelos. Tengo un historial comprobado en investigación, habiendo contribuido a proyectos sobre detección de sesgos de IA y metodologías educativas.",
        "Como freelancer, me enfoco en entregar soluciones prácticas y escalables que generen valor real para el negocio. Combino excelencia técnica con comunicación clara para asegurar que mis clientes entiendan y puedan aprovechar los insights que proporciono.",
      ],
      skillsTitle: "Habilidades Técnicas",
      specializationsTitle: "Especializaciones",
      achievementsTitle: "Logros Clave",
      programmingTab: "Programación",
      frameworksTab: "Frameworks",
      toolsTab: "Herramientas",
    },
  }

  const currentContent = content[language as keyof typeof content]

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{currentContent.title}</h2>
          <p className="text-xl text-primary font-medium mb-8">{currentContent.subtitle}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          {/* About Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {currentContent.description.map((paragraph, index) => (
              <p key={index} className="text-lg text-muted-foreground leading-relaxed text-pretty">
                {paragraph}
              </p>
            ))}
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold mb-6">{currentContent.achievementsTitle}</h3>
            <div className="grid gap-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-4 hover:shadow-md transition-shadow">
                    <CardContent className="p-0">
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <achievement.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">
                            {language === "en" ? achievement.title : achievement.titleEs}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {language === "en" ? achievement.description : achievement.descriptionEs}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Specializations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-2xl font-semibold text-center mb-12">{currentContent.specializationsTitle}</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {specializations.map((spec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <spec.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h4 className="font-semibold text-lg mb-2">{language === "en" ? spec.title : spec.titleEs}</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        {language === "en" ? spec.description : spec.descriptionEs}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {spec.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technical Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold text-center mb-12">{currentContent.skillsTitle}</h3>
          <Tabs defaultValue="programming" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="programming">{currentContent.programmingTab}</TabsTrigger>
              <TabsTrigger value="frameworks">{currentContent.frameworksTab}</TabsTrigger>
              <TabsTrigger value="tools">{currentContent.toolsTab}</TabsTrigger>
            </TabsList>

            {Object.entries(skills).map(([category, skillList]) => (
              <TabsContent key={category} value={category} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {skillList.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className="space-y-2"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{skill.name}</span>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {skill.category}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{skill.level}%</span>
                        </div>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
}
