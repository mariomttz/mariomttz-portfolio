export interface Service {
  id: string
  title: string
  titleEs: string
  icon: string
  isMostRequested?: boolean
  description: string
  descriptionEs: string
  features: string[]
  featuresEs: string[]
}

export const servicesData: Service[] = [
  {
    id: "machine-learning",
    title: "Machine Learning Solutions",
    titleEs: "Soluciones de Machine Learning",
    icon: "Brain",
    isMostRequested: true, // Added most requested flag
    description:
      "Custom ML models for prediction, classification, regression, and clustering. From proof-of-concept to production deployment.",
    descriptionEs:
      "Modelos ML personalizados para predicción, clasificación, regresión y clustering. Desde prueba de concepto hasta despliegue en producción.",
    features: [
      "Predictive Analytics",
      "Classification Models",
      "Regression Analysis",
      "Clustering Algorithms",
      "Model Optimization",
      "A/B Testing",
    ],
    featuresEs: [
      "Analítica Predictiva",
      "Modelos de Clasificación",
      "Análisis de Regresión",
      "Algoritmos de Clustering",
      "Optimización de Modelos",
      "Pruebas A/B",
    ],
  },
  {
    id: "data-engineering",
    title: "Data Engineering & ETL",
    titleEs: "Ingeniería de Datos y ETL",
    icon: "Database",
    description:
      "End-to-end data pipelines, ETL processes, data warehousing, and database optimization for scalable data infrastructure.",
    descriptionEs:
      "Pipelines de datos completos, procesos ETL, almacenamiento de datos y optimización de bases de datos para infraestructura escalable.",
    features: [
      "Data Pipeline Design",
      "ETL Development",
      "Database Optimization",
      "Data Quality Assurance",
      "Real-time Processing",
      "Cloud Integration",
    ],
    featuresEs: [
      "Diseño de Pipelines",
      "Desarrollo ETL",
      "Optimización de BD",
      "Aseguramiento de Calidad",
      "Procesamiento en Tiempo Real",
      "Integración en la Nube",
    ],
  },
  {
    id: "data-visualization",
    title: "Data Visualization & BI",
    titleEs: "Visualización de Datos y BI",
    icon: "BarChart3",
    description:
      "Interactive dashboards, business intelligence solutions, and compelling data visualizations that drive decision-making.",
    descriptionEs:
      "Dashboards interactivos, soluciones de inteligencia empresarial y visualizaciones convincentes que impulsan la toma de decisiones.",
    features: [
      "Interactive Dashboards",
      "KPI Monitoring",
      "Custom Reports",
      "Real-time Analytics",
      "Mobile-Responsive Design",
      "Data Storytelling",
    ],
    featuresEs: [
      "Dashboards Interactivos",
      "Monitoreo de KPIs",
      "Reportes Personalizados",
      "Analítica en Tiempo Real",
      "Diseño Responsivo",
      "Narrativa de Datos",
    ],
  },
  {
    id: "computer-vision",
    title: "Computer Vision",
    titleEs: "Visión por Computadora",
    icon: "Eye",
    description:
      "Image recognition, object detection, facial recognition, and automated visual inspection systems using deep learning.",
    descriptionEs:
      "Reconocimiento de imágenes, detección de objetos, reconocimiento facial y sistemas de inspección visual automatizada usando deep learning.",
    features: [
      "Image Classification",
      "Object Detection",
      "Facial Recognition",
      "OCR Solutions",
      "Quality Inspection",
      "Video Analytics",
    ],
    featuresEs: [
      "Clasificación de Imágenes",
      "Detección de Objetos",
      "Reconocimiento Facial",
      "Soluciones OCR",
      "Inspección de Calidad",
      "Analítica de Video",
    ],
  },
  {
    id: "nlp",
    title: "Natural Language Processing",
    titleEs: "Procesamiento de Lenguaje Natural",
    icon: "MessageSquare",
    description:
      "Text analysis, sentiment analysis, chatbots, document processing, and language understanding solutions.",
    descriptionEs:
      "Análisis de texto, análisis de sentimientos, chatbots, procesamiento de documentos y soluciones de comprensión del lenguaje.",
    features: [
      "Sentiment Analysis",
      "Text Classification",
      "Named Entity Recognition",
      "Chatbot Development",
      "Document Processing",
      "Language Translation",
    ],
    featuresEs: [
      "Análisis de Sentimientos",
      "Clasificación de Texto",
      "Reconocimiento de Entidades",
      "Desarrollo de Chatbots",
      "Procesamiento de Documentos",
      "Traducción de Idiomas",
    ],
  },
  {
    id: "process-automation",
    title: "Process Automation",
    titleEs: "Automatización de Procesos",
    icon: "Zap",
    description:
      "Intelligent automation solutions to streamline workflows, reduce manual tasks, and increase operational efficiency.",
    descriptionEs:
      "Soluciones de automatización inteligente para optimizar flujos de trabajo, reducir tareas manuales y aumentar la eficiencia operacional.",
    features: [
      "Workflow Automation",
      "Web Scraping",
      "Report Generation",
      "Email Automation",
      "Data Entry Automation",
      "API Integration",
    ],
    featuresEs: [
      "Automatización de Flujos",
      "Web Scraping",
      "Generación de Reportes",
      "Automatización de Email",
      "Automatización de Entrada de Datos",
      "Integración de APIs",
    ],
  },
]

export const budgetRanges = {
  en: [
    { value: "under-1500", label: "Less than $1,500 USD" },
    { value: "1500-3000", label: "$1,500 - $3,000 USD" },
    { value: "3000-5000", label: "$3,000 - $5,000 USD" },
    { value: "over-5000", label: "More than $5,000 USD" },
  ],
  es: [
    { value: "under-1500", label: "Menos de $1,500 USD" },
    { value: "1500-3000", label: "$1,500 - $3,000 USD" },
    { value: "3000-5000", label: "$3,000 - $5,000 USD" },
    { value: "over-5000", label: "Más de $5,000 USD" },
  ],
}
