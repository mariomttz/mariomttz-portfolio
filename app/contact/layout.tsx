import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch for data science consulting, machine learning projects, or AI automation services. Let's discuss how I can help your business.",
  openGraph: {
    title: "Contact Mario Martinez - Data Science Consulting",
    description:
      "Get in touch for data science consulting, machine learning projects, or AI automation services.",
    url: "https://mariomttz.me/contact",
    images: [
      {
        url: "/futuristic-ai-visualization.png",
        width: 1200,
        height: 630,
        alt: "Contact Mario Martinez",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Mario Martinez - Data Science Consulting",
    description:
      "Get in touch for data science consulting, machine learning projects, or AI automation services.",
    images: ["/futuristic-ai-visualization.png"],
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
