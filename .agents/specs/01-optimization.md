# Spec: Portfolio Performance & SEO Optimization

## 1. Requirements
The objective is to optimize the static Next.js portfolio hosted on Cloudflare Pages to achieve maximum Lighthouse scores (95+) in Performance, Accessibility, Best Practices, and SEO.

* **Performance:** Minimize First Contentful Paint (FCP) and Largest Contentful Paint (LCP). Leverage Cloudflare's global CDN edge caching.
* **Assets:** All images must be optimized in WebP/AVIF formats with correct sizing and lazy loading.
* **Fonts:** Custom fonts must be locally hosted or optimized using `next/font` to prevent layout shifts (CLS).
* **SEO:** Implement dynamic Open Graph tags and structured metadata for the entire portfolio.
* **Constraints:** No backend servers; the optimization must rely entirely on build-time static generation (SSG) and edge caching.

## 2. Design
To meet the requirements without introducing heavy dependencies, the following architectural decisions are made:

* **Image Delivery:** We will utilize the `next/image` component configured with a custom loader compatible with Cloudflare Images (or optimized at build time if using standard static export).
* **Component Architecture:** Strict separation between React Server Components (RSC) and Client Components. Interactive elements (like the Turnstile wrapper) will be explicitly marked with `"use client"`, keeping the rest of the portfolio strictly server-rendered for zero-JS delivery where possible.
* **Caching Strategy:** Implement `Cache-Control: public, max-age=31536000, immutable` headers for static assets in the Cloudflare Pages configuration (`_headers` file).
* **Metadata:** Use the Next.js App Router Metadata API to define global and page-specific SEO tags centrally in `layout.tsx` and `page.tsx`.

## 3. Tasks
- [ ] **Task 1:** Audit and refactor the current component tree to ensure maximum usage of React Server Components. Move `"use client"` directives only to the absolute leaves of the tree.
- [ ] **Task 2:** Replace all standard `<img>` tags with `next/image`, applying appropriate `priority` tags to LCP elements (e.g., hero images).
- [ ] **Task 3:** Implement `next/font` for all typography to eliminate render-blocking web font requests.
- [ ] **Task 4:** Generate and configure `robots.txt`, `sitemap.xml`, and the App Router `metadata` object in the root layout.
- [ ] **Task 5:** Create the Cloudflare `_headers` file to enforce aggressive caching policies for immutable assets.