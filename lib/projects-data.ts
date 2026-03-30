import { Brain, Database, Eye, BarChart3, MessageSquare, Zap, type LucideIcon } from "lucide-react"

export interface Project {
  id: number
  slug: string
  icon: LucideIcon
  title: string
  titleEs: string
  description: string
  descriptionEs: string
  category: string
  categoryEs: string
  technologies: string[]
  features: string[]
  featuresEs: string[]
  image: string
  github: string
  demo: string | null
  status: "Completed" | "In Progress"
  statusEs: "Completado" | "En Progreso"
  date: string // ISO date format for sorting
}

export const projectsData: Project[] = [
  {
    id: 1,
    slug: "customer-churn-prediction",
    icon: Brain,
    title: "Customer Churn Prediction Model",
    titleEs: "Modelo de Predicción de Abandono de Clientes",
    description:
      "Machine learning model to predict customer churn with 94% accuracy, helping businesses retain customers and increase revenue.",
    descriptionEs:
      "Modelo de machine learning para predecir el abandono de clientes con 94% de precisión, ayudando a las empresas a retener clientes y aumentar ingresos.",
    category: "Machine Learning",
    categoryEs: "Machine Learning",
    technologies: ["Python", "Scikit-learn", "Pandas", "XGBoost", "Streamlit"],
    features: [
      "94% prediction accuracy",
      "Real-time scoring API",
      "Interactive dashboard",
      "Feature importance analysis",
    ],
    featuresEs: [
      "94% precisión de predicción",
      "API de puntuación en tiempo real",
      "Dashboard interactivo",
      "Análisis de importancia de características",
    ],
    image: "/customer-churn-prediction-dashboard-with-charts.jpg",
    github: "https://github.com/mariomttz/customer-churn-prediction",
    demo: "https://churn-prediction-demo.streamlit.app",
    status: "Completed",
    statusEs: "Completado",
    date: "2024-12-15",
  },
  {
    id: 2,
    slug: "automated-quality-control",
    icon: Eye,
    title: "Automated Quality Control System",
    titleEs: "Sistema de Control de Calidad Automatizado",
    description:
      "Computer vision system for automated defect detection in manufacturing, reducing inspection time by 80% and improving accuracy.",
    descriptionEs:
      "Sistema de visión por computadora para detección automatizada de defectos en manufactura, reduciendo tiempo de inspección en 80% y mejorando precisión.",
    category: "Computer Vision",
    categoryEs: "Visión por Computadora",
    technologies: ["Python", "OpenCV", "PyTorch", "FastAPI", "Docker"],
    features: ["Real-time defect detection", "99.2% accuracy rate", "80% time reduction", "Automated reporting"],
    featuresEs: [
      "Detección de defectos en tiempo real",
      "99.2% tasa de precisión",
      "80% reducción de tiempo",
      "Reportes automatizados",
    ],
    image: "/computer-vision-quality-control-manufacturing-defe.jpg",
    github: "https://github.com/mariomttz/quality-control-cv",
    demo: "https://quality-control-demo.herokuapp.com",
    status: "Completed",
    statusEs: "Completado",
    date: "2024-11-20",
  },
  {
    id: 3,
    slug: "sales-forecasting-dashboard",
    icon: BarChart3,
    title: "Sales Forecasting Dashboard",
    titleEs: "Dashboard de Pronóstico de Ventas",
    description:
      "Interactive dashboard for sales forecasting using time series analysis, providing accurate predictions for inventory planning.",
    descriptionEs:
      "Dashboard interactivo para pronóstico de ventas usando análisis de series temporales, proporcionando predicciones precisas para planificación de inventario.",
    category: "Data Analytics",
    categoryEs: "Analítica de Datos",
    technologies: ["Python", "Plotly", "Dash", "Prophet", "PostgreSQL"],
    features: [
      "Time series forecasting",
      "Interactive visualizations",
      "Seasonal trend analysis",
      "Automated reporting",
    ],
    featuresEs: [
      "Pronóstico de series temporales",
      "Visualizaciones interactivas",
      "Análisis de tendencias estacionales",
      "Reportes automatizados",
    ],
    image: "/sales-forecasting-dashboard-with-time-series-chart.jpg",
    github: "https://github.com/mariomttz/sales-forecasting",
    demo: "https://sales-forecast-dashboard.herokuapp.com",
    status: "Completed",
    statusEs: "Completado",
    date: "2024-10-05",
  },
  {
    id: 4,
    slug: "sentiment-analysis-social-media",
    icon: MessageSquare,
    title: "Sentiment Analysis for Social Media",
    titleEs: "Análisis de Sentimientos para Redes Sociales",
    description:
      "NLP system to analyze customer sentiment from social media posts, helping brands understand public perception and improve engagement.",
    descriptionEs:
      "Sistema NLP para analizar sentimientos de clientes desde publicaciones en redes sociales, ayudando a marcas a entender percepción pública y mejorar engagement.",
    category: "Natural Language Processing",
    categoryEs: "Procesamiento de Lenguaje Natural",
    technologies: ["Python", "NLTK", "Transformers", "Flask", "MongoDB"],
    features: [
      "Multi-platform analysis",
      "Real-time sentiment tracking",
      "Emotion classification",
      "Trend identification",
    ],
    featuresEs: [
      "Análisis multi-plataforma",
      "Seguimiento de sentimientos en tiempo real",
      "Clasificación de emociones",
      "Identificación de tendencias",
    ],
    image: "/sentiment-analysis-dashboard-social-media-emotions.jpg",
    github: "https://github.com/mariomttz/sentiment-analysis",
    demo: "https://sentiment-analyzer-demo.herokuapp.com",
    status: "Completed",
    statusEs: "Completado",
    date: "2024-09-12",
  },
  {
    id: 5,
    slug: "ecommerce-etl-pipeline",
    icon: Database,
    title: "ETL Pipeline for E-commerce Analytics",
    titleEs: "Pipeline ETL para Analítica de E-commerce",
    description:
      "Automated data pipeline processing millions of transactions daily, providing real-time insights for business decision making.",
    descriptionEs:
      "Pipeline de datos automatizado procesando millones de transacciones diarias, proporcionando insights en tiempo real para toma de decisiones empresariales.",
    category: "Data Engineering",
    categoryEs: "Ingeniería de Datos",
    technologies: ["Python", "Apache Airflow", "PostgreSQL", "Redis", "Docker"],
    features: [
      "Processes 1M+ records daily",
      "Real-time data processing",
      "Automated data quality checks",
      "Scalable architecture",
    ],
    featuresEs: [
      "Procesa 1M+ registros diarios",
      "Procesamiento de datos en tiempo real",
      "Verificaciones automáticas de calidad",
      "Arquitectura escalable",
    ],
    image: "/data-pipeline-architecture-etl-process-flow-diagra.jpg",
    github: "https://github.com/mariomttz/ecommerce-etl",
    demo: null,
    status: "Completed",
    statusEs: "Completado",
    date: "2024-08-22",
  },
  {
    id: 6,
    slug: "automated-report-generation",
    icon: Zap,
    title: "Automated Report Generation System",
    titleEs: "Sistema de Generación Automatizada de Reportes",
    description:
      "Intelligent automation system that generates and distributes weekly business reports, saving 20+ hours of manual work per week.",
    descriptionEs:
      "Sistema de automatización inteligente que genera y distribuye reportes empresariales semanales, ahorrando 20+ horas de trabajo manual por semana.",
    category: "Process Automation",
    categoryEs: "Automatización de Procesos",
    technologies: ["Python", "Pandas", "Selenium", "Jinja2", "Schedule"],
    features: [
      "Automated data collection",
      "Dynamic report generation",
      "Email distribution",
      "20+ hours saved weekly",
    ],
    featuresEs: [
      "Recolección automatizada de datos",
      "Generación dinámica de reportes",
      "Distribución por email",
      "20+ horas ahorradas semanalmente",
    ],
    image: "/automated-report-generation-system-workflow-dashbo.jpg",
    github: "https://github.com/mariomttz/automated-reporting",
    demo: null,
    status: "In Progress",
    statusEs: "En Progreso",
    date: "2024-07-10",
  },
]

// Helper function to get unique categories from projects
export function getUniqueCategories(): string[] {
  const uniqueCategories = new Set<string>()
  projectsData.forEach((project) => {
    uniqueCategories.add(project.category)
  })
  return ["All", ...Array.from(uniqueCategories).sort()]
}

// Helper function to get unique categories in Spanish
export function getUniqueCategoriesEs(): string[] {
  const uniqueCategories = new Set<string>()
  projectsData.forEach((project) => {
    uniqueCategories.add(project.categoryEs)
  })
  return ["Todos", ...Array.from(uniqueCategories).sort()]
}

// Helper function to get the most recent projects
export function getRecentProjects(count = 3): Project[] {
  return [...projectsData].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, count)
}

// Helper function to truncate text
export function truncateText(text: string, maxLength = 100): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + "..."
}
