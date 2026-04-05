/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for Cloudflare Pages compatibility
  output: 'export',
  
  // Trailing slash for better CDN compatibility
  trailingSlash: true,
  
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'www.anthropic.com',
      },
      {
        protocol: 'https',
        hostname: 'www.gstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'v0.dev',
      },
      {
        protocol: 'https',
        hostname: 'github.githubassets.com',
      },
      {
        protocol: 'https',
        hostname: 'uxwing.com',
      },
      {
        protocol: 'https',
        hostname: 'www.cursor.com',
      },
      {
        protocol: 'https',
        hostname: 'seaborn.pydata.org',
      },
    ],
  },
  reactStrictMode: true,
  poweredByHeader: false,
  
  // Note: headers() function doesn't work with output: 'export'
  // All headers are configured in public/_headers for Cloudflare Pages
}

export default nextConfig
