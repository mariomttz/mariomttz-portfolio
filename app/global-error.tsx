"use client"

import { ErrorPage } from "@/components/error-page"
import { useEffect } from "react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.error("Global Error:", error)
    }
    // In production, you would send this to an error reporting service
    // Example: Sentry.captureException(error)
  }, [error])

  return (
    <html lang="en">
      <body>
        <ErrorPage errorCode="500" showReset onReset={reset} />
      </body>
    </html>
  )
}
