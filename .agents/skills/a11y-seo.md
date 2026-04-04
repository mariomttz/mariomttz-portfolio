# Accessibility (A11y) and SEO Best Practices

## SEO Requirements
1. **Metadata API:** Use Next.js App Router `metadata` object in `layout.tsx` and `page.tsx` for all SEO tags (title, description, OpenGraph, Twitter cards).
2. **Semantic HTML:** Strictly use semantic HTML5 elements (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`). Avoid unnecessary `<div>` nesting.
3. **Sitemap & Robots:** Ensure `sitemap.xml` and `robots.txt` are dynamically generated or correctly placed in the `public` directory.

## Accessibility Requirements
1. **Images:** All `next/image` components MUST have meaningful `alt` attributes. Decorative images must have `alt=""`.
2. **Contrast & ARIA:** Ensure all text meets WCAG AAA contrast ratios. Use `aria-label` or `aria-describedby` on interactive elements (buttons, inputs) that lack visible text.
3. **Keyboard Navigation:** All interactive elements must be fully navigable using the `Tab` key and have visible focus states.