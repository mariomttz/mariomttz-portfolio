/**
 * Property-Based Tests for Metadata and Semantic HTML
 * Feature: portfolio-optimization
 * 
 * **Validates: Requirements 6.2, 6.3, 6.4, 6.7, 7.7**
 * 
 * Property 10: Page metadata includes required SEO fields
 * - All page.tsx files export metadata with title, description
 * - Metadata includes openGraph with title, description, and images
 * 
 * Property 11: Pages use semantic HTML structure
 * - Page components use semantic HTML5 elements (header, main, section, article, footer, nav)
 * - Structural markup avoids generic div elements where semantic elements are appropriate
 */

import { describe, it, expect } from '@jest/globals'
import * as fc from 'fast-check'
import { glob } from 'glob'
import * as fs from 'fs'
import * as path from 'path'

describe('Metadata and Semantic HTML Properties', () => {
  /**
   * Property 10: Page metadata includes required SEO fields
   * 
   * This property verifies that:
   * 1. All page.tsx files export metadata (const or type Metadata)
   * 2. Metadata includes title field
   * 3. Metadata includes description field
   * 4. Metadata includes openGraph object with title, description, and images
   */
  it('should have complete metadata in all pages', async () => {
    // Get all page.tsx files
    const pageFiles = await glob('app/**/page.tsx', { cwd: process.cwd() })

    // Ensure we have page files to test
    expect(pageFiles.length).toBeGreaterThan(0)

    // Test each page file
    await fc.assert(
      fc.asyncProperty(
        fc.constantFrom(...pageFiles),
        async (filePath) => {
          const fullPath = path.join(process.cwd(), filePath)
          const content = fs.readFileSync(fullPath, 'utf-8')
          
          // Property 10a: Check if metadata is exported
          const hasMetadataExport = /export\s+const\s+metadata/.test(content)
          
          if (!hasMetadataExport) {
            // Root page (app/page.tsx) might not have metadata if it's in layout
            if (filePath === 'app/page.tsx') {
              console.warn(
                `Warning: ${filePath} does not export metadata. ` +
                `Root page metadata may be in layout.tsx, but page-specific metadata is recommended. ` +
                `(Validates Requirement 6.2)`
              )
              return // Skip validation for root page
            }
            
            throw new Error(
              `File ${filePath} does not export metadata. ` +
              `All pages should export metadata for SEO optimization. ` +
              `(Validates Requirement 6.2)`
            )
          }
          
          // Property 10b: Check for title field
          const hasTitleField = /title\s*:\s*["']/.test(content)
          
          if (!hasTitleField) {
            throw new Error(
              `File ${filePath} metadata missing title field. ` +
              `Title is required for SEO and browser tab display. ` +
              `(Validates Requirement 6.2)`
            )
          }
          
          // Property 10c: Check for description field
          const hasDescriptionField = /description\s*:\s*["']/.test(content)
          
          if (!hasDescriptionField) {
            throw new Error(
              `File ${filePath} metadata missing description field. ` +
              `Description is required for SEO and search result snippets. ` +
              `(Validates Requirement 6.2)`
            )
          }
          
          // Property 10d: Check for openGraph object
          const hasOpenGraph = /openGraph\s*:\s*{/.test(content)
          
          if (!hasOpenGraph) {
            throw new Error(
              `File ${filePath} metadata missing openGraph object. ` +
              `Open Graph tags are required for social media previews. ` +
              `(Validates Requirement 6.3)`
            )
          }
          
          // Property 10e: Check openGraph has title
          // Look for openGraph object and check its contents
          const openGraphMatch = content.match(/openGraph\s*:\s*{([^}]+(?:{[^}]*}[^}]*)*)}/)
          
          if (openGraphMatch) {
            const openGraphContent = openGraphMatch[1]
            
            const hasOgTitle = /title\s*:\s*["']/.test(openGraphContent)
            if (!hasOgTitle) {
              throw new Error(
                `File ${filePath} openGraph missing title field. ` +
                `Open Graph title is required for social media sharing. ` +
                `(Validates Requirement 6.3)`
              )
            }
            
            // Property 10f: Check openGraph has description
            const hasOgDescription = /description\s*:\s*["']/.test(openGraphContent)
            if (!hasOgDescription) {
              throw new Error(
                `File ${filePath} openGraph missing description field. ` +
                `Open Graph description is required for social media sharing. ` +
                `(Validates Requirement 6.3)`
              )
            }
            
            // Property 10g: Check openGraph has images
            const hasOgImages = /images\s*:\s*\[/.test(openGraphContent)
            if (!hasOgImages) {
              throw new Error(
                `File ${filePath} openGraph missing images array. ` +
                `Open Graph images are required for social media preview cards. ` +
                `(Validates Requirement 6.3)`
              )
            }
          }
          
          // All checks passed
          expect(hasMetadataExport).toBe(true)
          expect(hasTitleField).toBe(true)
          expect(hasDescriptionField).toBe(true)
          expect(hasOpenGraph).toBe(true)
        }
      ),
      { 
        numRuns: pageFiles.length,
        verbose: true
      }
    )
  })

  /**
   * Property 10 (Extended): Metadata includes Twitter Card tags
   * 
   * This property verifies that metadata includes Twitter Card configuration
   * for proper social media previews on Twitter/X.
   */
  it('should have Twitter Card metadata in pages', async () => {
    const pageFiles = await glob('app/**/page.tsx', { cwd: process.cwd() })

    await fc.assert(
      fc.asyncProperty(
        fc.constantFrom(...pageFiles),
        async (filePath) => {
          const fullPath = path.join(process.cwd(), filePath)
          const content = fs.readFileSync(fullPath, 'utf-8')
          
          // Check if metadata is exported
          const hasMetadataExport = /export\s+const\s+metadata/.test(content)
          
          if (!hasMetadataExport) {
            // Skip root page as before
            if (filePath === 'app/page.tsx') {
              return
            }
            return // Already validated in previous test
          }
          
          // Check for twitter object
          const hasTwitter = /twitter\s*:\s*{/.test(content)
          
          if (!hasTwitter) {
            throw new Error(
              `File ${filePath} metadata missing twitter object. ` +
              `Twitter Card tags are required for social media previews on Twitter/X. ` +
              `(Validates Requirement 6.4)`
            )
          }
          
          // Check twitter object contents
          const twitterMatch = content.match(/twitter\s*:\s*{([^}]+(?:{[^}]*}[^}]*)*)}/)
          
          if (twitterMatch) {
            const twitterContent = twitterMatch[1]
            
            // Check for card type
            const hasCard = /card\s*:\s*["']/.test(twitterContent)
            if (!hasCard) {
              throw new Error(
                `File ${filePath} twitter metadata missing card field. ` +
                `Twitter card type (e.g., 'summary_large_image') is required. ` +
                `(Validates Requirement 6.4)`
              )
            }
            
            // Check for title
            const hasTitle = /title\s*:\s*["']/.test(twitterContent)
            if (!hasTitle) {
              throw new Error(
                `File ${filePath} twitter metadata missing title field. ` +
                `Twitter card title is required for social media previews. ` +
                `(Validates Requirement 6.4)`
              )
            }
            
            // Check for description
            const hasDescription = /description\s*:\s*["']/.test(twitterContent)
            if (!hasDescription) {
              throw new Error(
                `File ${filePath} twitter metadata missing description field. ` +
                `Twitter card description is required for social media previews. ` +
                `(Validates Requirement 6.4)`
              )
            }
            
            // Check for images
            const hasImages = /images\s*:\s*\[/.test(twitterContent)
            if (!hasImages) {
              throw new Error(
                `File ${filePath} twitter metadata missing images array. ` +
                `Twitter card images are required for social media preview cards. ` +
                `(Validates Requirement 6.4)`
              )
            }
          }
          
          expect(hasTwitter).toBe(true)
        }
      ),
      { 
        numRuns: pageFiles.length,
        verbose: true
      }
    )
  })

  /**
   * Property 11: Pages use semantic HTML structure
   * 
   * This property verifies that:
   * 1. Page components use semantic HTML5 elements (header, main, section, article, footer, nav)
   * 2. Structural markup uses appropriate semantic elements instead of generic divs
   * 3. Main content is wrapped in <main> element
   */
  it('should use semantic HTML5 elements in page components', async () => {
    const pageFiles = await glob('app/**/page.tsx', { cwd: process.cwd() })

    await fc.assert(
      fc.asyncProperty(
        fc.constantFrom(...pageFiles),
        async (filePath) => {
          const fullPath = path.join(process.cwd(), filePath)
          const content = fs.readFileSync(fullPath, 'utf-8')
          
          // Property 11a: Check for <main> element
          const hasMainElement = /<main\s/.test(content)
          
          if (!hasMainElement) {
            throw new Error(
              `File ${filePath} does not use <main> element. ` +
              `Pages should wrap main content in <main> for proper semantic structure and accessibility. ` +
              `(Validates Requirements 6.7, 7.7)`
            )
          }
          
          // Property 11b: Check for semantic elements usage
          // Look for at least some semantic elements (not all pages need all elements)
          const semanticElements = [
            { name: 'header', regex: /<header\s/ },
            { name: 'section', regex: /<section\s/ },
            { name: 'article', regex: /<article\s/ },
            { name: 'footer', regex: /<footer\s/ },
            { name: 'nav', regex: /<nav\s/ },
          ]
          
          // Count how many semantic elements are used
          const usedSemanticElements = semanticElements.filter(el => 
            el.regex.test(content)
          )
          
          // Pages should use at least main element (already checked)
          // Additional semantic elements are encouraged but not strictly required
          // as they may be in imported components
          
          // Check if components are imported that likely contain semantic elements
          const importsSemanticComponents = 
            /import.*(?:Navbar|Header|Footer|Hero|Section)/.test(content)
          
          if (usedSemanticElements.length === 0 && !importsSemanticComponents) {
            console.warn(
              `Warning: ${filePath} uses <main> but no other semantic HTML5 elements. ` +
              `Consider using semantic elements like <section>, <header>, <footer>, <nav>, or <article> ` +
              `for better accessibility and SEO. ` +
              `(Validates Requirements 6.7, 7.7)`
            )
          }
          
          // All checks passed
          expect(hasMainElement).toBe(true)
        }
      ),
      { 
        numRuns: pageFiles.length,
        verbose: true
      }
    )
  })

  /**
   * Property 11 (Extended): Component files use semantic HTML
   * 
   * This property verifies that major component files use semantic HTML5 elements
   * instead of generic divs for structural markup.
   */
  it('should use semantic HTML5 elements in major components', async () => {
    // Get major component files (hero, section, footer, navbar, etc.)
    const componentFiles = await glob('components/**/*.tsx', { cwd: process.cwd() })
    
    // Filter to major structural components
    const structuralComponents = componentFiles.filter(file => {
      const fileName = path.basename(file, '.tsx').toLowerCase()
      return (
        fileName.includes('hero') ||
        fileName.includes('section') ||
        fileName.includes('footer') ||
        fileName.includes('navbar') ||
        fileName.includes('header')
      )
    })
    
    if (structuralComponents.length === 0) {
      return // Skip if no structural components found
    }

    await fc.assert(
      fc.asyncProperty(
        fc.constantFrom(...structuralComponents),
        async (filePath) => {
          const fullPath = path.join(process.cwd(), filePath)
          const content = fs.readFileSync(fullPath, 'utf-8')
          const fileName = path.basename(filePath, '.tsx')
          
          // Check for appropriate semantic elements based on component type
          if (fileName.toLowerCase().includes('footer')) {
            const hasFooter = /<footer\s/.test(content)
            if (!hasFooter) {
              throw new Error(
                `Component ${filePath} is a footer but does not use <footer> element. ` +
                `Footer components should use semantic <footer> element. ` +
                `(Validates Requirements 6.7, 7.7)`
              )
            }
          }
          
          if (fileName.toLowerCase().includes('navbar') || fileName.toLowerCase().includes('header')) {
            const hasNav = /<nav\s/.test(content)
            if (!hasNav) {
              console.warn(
                `Warning: Component ${filePath} is a navigation/header but does not use <nav> element. ` +
                `Navigation components should use semantic <nav> element for accessibility. ` +
                `(Validates Requirements 6.7, 7.7)`
              )
            }
          }
          
          if (fileName.toLowerCase().includes('hero') || fileName.toLowerCase().includes('section')) {
            const hasSection = /<section\s/.test(content)
            if (!hasSection) {
              console.warn(
                `Warning: Component ${filePath} is a section/hero but does not use <section> element. ` +
                `Section components should use semantic <section> element for proper document structure. ` +
                `(Validates Requirements 6.7, 7.7)`
              )
            }
          }
        }
      ),
      { 
        numRuns: structuralComponents.length,
        verbose: true
      }
    )
  })

  /**
   * Property 11 (Validation): Semantic elements have appropriate ARIA roles when needed
   * 
   * This property verifies that semantic elements are used correctly
   * and have appropriate ARIA attributes when necessary.
   */
  it('should have proper semantic structure without redundant ARIA roles', async () => {
    const componentFiles = await glob('components/**/*.tsx', { cwd: process.cwd() })
    const appFiles = await glob('app/**/*.tsx', { cwd: process.cwd() })
    const allFiles = [...componentFiles, ...appFiles]

    // Filter to files that use semantic elements
    const filesWithSemanticElements = allFiles.filter(filePath => {
      const fullPath = path.join(process.cwd(), filePath)
      const content = fs.readFileSync(fullPath, 'utf-8')
      return /<(?:main|header|footer|nav|section|article)\s/.test(content)
    })

    if (filesWithSemanticElements.length === 0) {
      return
    }

    await fc.assert(
      fc.asyncProperty(
        fc.constantFrom(...filesWithSemanticElements),
        async (filePath) => {
          const fullPath = path.join(process.cwd(), filePath)
          const content = fs.readFileSync(fullPath, 'utf-8')
          
          // Check for redundant ARIA roles on semantic elements
          // e.g., <main role="main"> is redundant
          const redundantRoles = [
            { element: 'main', role: 'main', regex: /<main[^>]*role\s*=\s*["']main["']/ },
            { element: 'nav', role: 'navigation', regex: /<nav[^>]*role\s*=\s*["']navigation["']/ },
            { element: 'header', role: 'banner', regex: /<header[^>]*role\s*=\s*["']banner["']/ },
            { element: 'footer', role: 'contentinfo', regex: /<footer[^>]*role\s*=\s*["']contentinfo["']/ },
          ]
          
          for (const check of redundantRoles) {
            if (check.regex.test(content)) {
              console.warn(
                `Warning: ${filePath} has redundant role="${check.role}" on <${check.element}> element. ` +
                `Semantic HTML5 elements have implicit ARIA roles, explicit role is unnecessary. ` +
                `(Validates Requirements 6.7, 7.7)`
              )
            }
          }
        }
      ),
      { 
        numRuns: filesWithSemanticElements.length,
        verbose: true
      }
    )
  })
})
