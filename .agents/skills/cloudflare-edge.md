# Cloudflare Pages & Edge Optimization Skill

## Core Principles
1. **Static First:** Assume the project will be deployed as a static site on Cloudflare Pages. Do not use Node.js specific runtime APIs (e.g., `fs`, `path`) in client or edge code.
2. **Aggressive Caching:** Implement immutable caching for static assets. Create or modify a `public/_headers` file to include `Cache-Control: public, max-age=31536000, immutable` for static routes like fonts and images.
3. **Edge Compatibility:** If server-side logic is needed, ensure it uses the Edge Runtime (`export const runtime = 'edge'`), not the Node.js runtime.
4. **Bundle Size:** Minimize external dependencies to keep the initial JS payload as small as possible.