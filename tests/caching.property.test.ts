/**
 * Property-Based Tests for Caching Strategy
 * Feature: portfolio-optimization
 * 
 * **Validates: Requirements 5.2, 5.5**
 * 
 * Property 8: Static assets have immutable cache headers
 * - All static asset patterns should have Cache-Control with max-age=31536000 and immutable
 * 
 * Property 9: HTML pages have revalidation cache headers
 * - All HTML route patterns should have Cache-Control with max-age=0 and must-revalidate
 */

import { describe, it, expect } from '@jest/globals'
import * as fc from 'fast-check'
import * as fs from 'fs'
import * as path from 'path'

describe('Caching Strategy Properties', () => {
  const headersFilePath = path.join(process.cwd(), 'public', '_headers')

  /**
   * Property 8: Static assets have immutable cache headers
   * 
   * This property verifies that all static asset patterns in the _headers file
   * have proper immutable cache configuration:
   * - Cache-Control header with max-age=31536000 (1 year)
   * - immutable directive
   */
  it('should have immutable cache headers for all static assets', () => {
    // Verify _headers file exists
    expect(fs.existsSync(headersFilePath)).toBe(true)

    const headersContent = fs.readFileSync(headersFilePath, 'utf-8')

    // Define static asset patterns that should have immutable cache
    const staticAssetPatterns = [
      '/_next/static/*',
      '/*.jpg',
      '/*.jpeg',
      '/*.png',
      '/*.webp',
      '/*.avif',
      '/*.svg',
      '/*.gif',
      '/*.woff2',
      '/*.woff',
      '/*.ttf',
      '/*.otf',
      '/*.eot',
      '/*.ico',
      '/*.css',
      '/*.js',
    ]

    fc.assert(
      fc.property(
        fc.constantFrom(...staticAssetPatterns),
        (assetPattern) => {
          // Escape special regex characters in the pattern
          const escapedPattern = assetPattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
          
          // Create regex to find the pattern and its Cache-Control header
          // Pattern should be on its own line, followed by Cache-Control on next line(s)
          const patternRegex = new RegExp(
            `^${escapedPattern}\\s*$[\\s\\S]*?^\\s*Cache-Control:\\s*(.+?)$`,
            'gm'
          )
          
          const match = patternRegex.exec(headersContent)
          
          if (!match) {
            throw new Error(
              `Static asset pattern "${assetPattern}" not found in _headers file or missing Cache-Control header.`
            )
          }
          
          const cacheControlValue = match[1].trim()
          
          // Verify Cache-Control has required directives
          const hasPublic = /\bpublic\b/.test(cacheControlValue)
          const hasMaxAge = /\bmax-age=31536000\b/.test(cacheControlValue)
          const hasImmutable = /\bimmutable\b/.test(cacheControlValue)
          
          if (!hasPublic) {
            throw new Error(
              `Static asset pattern "${assetPattern}" missing "public" directive in Cache-Control.\n` +
              `Found: ${cacheControlValue}`
            )
          }
          
          if (!hasMaxAge) {
            throw new Error(
              `Static asset pattern "${assetPattern}" missing "max-age=31536000" in Cache-Control.\n` +
              `Found: ${cacheControlValue}`
            )
          }
          
          if (!hasImmutable) {
            throw new Error(
              `Static asset pattern "${assetPattern}" missing "immutable" directive in Cache-Control.\n` +
              `Found: ${cacheControlValue}`
            )
          }
          
          // All checks passed
          expect(hasPublic && hasMaxAge && hasImmutable).toBe(true)
        }
      ),
      {
        numRuns: staticAssetPatterns.length,
        verbose: true
      }
    )
  })

  /**
   * Property 9: HTML pages have revalidation cache headers
   * 
   * This property verifies that HTML route patterns in the _headers file
   * have proper revalidation cache configuration:
   * - Cache-Control header with max-age=0
   * - must-revalidate directive
   */
  it('should have revalidation cache headers for HTML pages', () => {
    // Verify _headers file exists
    expect(fs.existsSync(headersFilePath)).toBe(true)

    const headersContent = fs.readFileSync(headersFilePath, 'utf-8')

    // Define HTML route patterns that should have revalidation cache
    const htmlRoutePatterns = [
      '/*.html',
      '/',
      '/*.json', // JSON data should also revalidate
    ]

    fc.assert(
      fc.property(
        fc.constantFrom(...htmlRoutePatterns),
        (routePattern) => {
          // Escape special regex characters in the pattern
          const escapedPattern = routePattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
          
          // Create regex to find the pattern and its Cache-Control header
          const patternRegex = new RegExp(
            `^${escapedPattern}\\s*$[\\s\\S]*?^\\s*Cache-Control:\\s*(.+?)$`,
            'gm'
          )
          
          const match = patternRegex.exec(headersContent)
          
          if (!match) {
            throw new Error(
              `HTML route pattern "${routePattern}" not found in _headers file or missing Cache-Control header.`
            )
          }
          
          const cacheControlValue = match[1].trim()
          
          // Verify Cache-Control has required directives
          const hasPublic = /\bpublic\b/.test(cacheControlValue)
          const hasMaxAgeZero = /\bmax-age=0\b/.test(cacheControlValue)
          const hasMustRevalidate = /\bmust-revalidate\b/.test(cacheControlValue)
          
          if (!hasPublic) {
            throw new Error(
              `HTML route pattern "${routePattern}" missing "public" directive in Cache-Control.\n` +
              `Found: ${cacheControlValue}`
            )
          }
          
          if (!hasMaxAgeZero) {
            throw new Error(
              `HTML route pattern "${routePattern}" missing "max-age=0" in Cache-Control.\n` +
              `Found: ${cacheControlValue}`
            )
          }
          
          if (!hasMustRevalidate) {
            throw new Error(
              `HTML route pattern "${routePattern}" missing "must-revalidate" directive in Cache-Control.\n` +
              `Found: ${cacheControlValue}`
            )
          }
          
          // All checks passed
          expect(hasPublic && hasMaxAgeZero && hasMustRevalidate).toBe(true)
        }
      ),
      {
        numRuns: htmlRoutePatterns.length,
        verbose: true
      }
    )
  })

  /**
   * Property 10: Security headers are present globally
   * 
   * This property verifies that essential security headers are configured
   * in the global section of the _headers file.
   */
  it('should have security headers configured globally', () => {
    expect(fs.existsSync(headersFilePath)).toBe(true)

    const headersContent = fs.readFileSync(headersFilePath, 'utf-8')

    // Define required security headers
    const requiredSecurityHeaders = [
      'X-Frame-Options',
      'X-Content-Type-Options',
      'Referrer-Policy',
      'Permissions-Policy',
      'X-DNS-Prefetch-Control',
      'Strict-Transport-Security',
    ]

    fc.assert(
      fc.property(
        fc.constantFrom(...requiredSecurityHeaders),
        (headerName) => {
          // Parse the _headers file to extract the global section
          // The global section starts with /* and continues until the next path pattern
          const lines = headersContent.split('\n')
          let inGlobalSection = false
          let globalSection = ''
          
          for (const line of lines) {
            const trimmedLine = line.trim()
            
            // Start of global section
            if (trimmedLine === '/*') {
              inGlobalSection = true
              globalSection += line + '\n'
              continue
            }
            
            // End of global section (next path pattern that's not /*)
            if (inGlobalSection && trimmedLine.startsWith('/') && trimmedLine !== '/*') {
              break
            }
            
            // Collect lines in global section
            if (inGlobalSection) {
              globalSection += line + '\n'
            }
          }
          
          if (!globalSection) {
            throw new Error(
              `Global section (/*) not found in _headers file.`
            )
          }
          
          // Check if the security header exists in the global section
          const headerRegex = new RegExp(`^\\s*${headerName}:\\s*(.+?)$`, 'gm')
          const headerMatch = headerRegex.exec(globalSection)
          
          if (!headerMatch) {
            throw new Error(
              `Security header "${headerName}" not found in global section of _headers file.`
            )
          }
          
          const headerValue = headerMatch[1].trim()
          
          // Verify header has a non-empty value
          if (headerValue.length === 0) {
            throw new Error(
              `Security header "${headerName}" has empty value in _headers file.`
            )
          }
          
          // All checks passed
          expect(headerValue.length).toBeGreaterThan(0)
        }
      ),
      {
        numRuns: requiredSecurityHeaders.length,
        verbose: true
      }
    )
  })

  /**
   * Property 11: _headers file has proper structure
   * 
   * This property verifies that the _headers file follows Cloudflare Pages
   * header syntax and structure requirements.
   */
  it('should have proper _headers file structure', () => {
    expect(fs.existsSync(headersFilePath)).toBe(true)

    const headersContent = fs.readFileSync(headersFilePath, 'utf-8')

    // Verify file is not empty
    expect(headersContent.trim().length).toBeGreaterThan(0)

    // Verify global section exists
    const hasGlobalSection = /^\/\*\s*$/gm.test(headersContent)
    expect(hasGlobalSection).toBe(true)

    // Verify at least one path-specific section exists
    const pathSectionRegex = /^\/[^*\s].*$/gm
    const pathSections = headersContent.match(pathSectionRegex)
    expect(pathSections).not.toBeNull()
    expect(pathSections!.length).toBeGreaterThan(0)

    // Verify headers follow proper format (key: value)
    const headerLineRegex = /^\s*[A-Za-z-]+:\s*.+$/gm
    const headerLines = headersContent.match(headerLineRegex)
    expect(headerLines).not.toBeNull()
    expect(headerLines!.length).toBeGreaterThan(0)

    // Verify no invalid characters or syntax errors
    const lines = headersContent.split('\n')
    lines.forEach((line, index) => {
      const trimmedLine = line.trim()
      
      // Skip empty lines and comments
      if (trimmedLine.length === 0 || trimmedLine.startsWith('#')) {
        return
      }
      
      // Line should be either a path pattern or a header
      const isPathPattern = /^\/.*$/.test(trimmedLine)
      const isHeader = /^[A-Za-z-]+:\s*.+$/.test(trimmedLine)
      
      if (!isPathPattern && !isHeader) {
        throw new Error(
          `Invalid line format at line ${index + 1}: "${line}"\n` +
          `Lines must be either path patterns (starting with /) or headers (Key: value format).`
        )
      }
    })
  })
})
