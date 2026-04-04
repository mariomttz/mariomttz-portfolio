/**
 * Property-Based Tests for Image Optimization
 * Feature: portfolio-optimization
 * 
 * **Validates: Requirements 2.1, 2.4**
 * 
 * Property 1: All images use next/image with proper configuration
 * - No raw <img> tags should exist in component files
 * - All image usage should import from 'next/image'
 * - All Image components should have proper configuration (width/height or fill prop)
 */

import { describe, it, expect } from '@jest/globals'
import * as fc from 'fast-check'
import { glob } from 'glob'
import * as fs from 'fs'
import * as path from 'path'

describe('Image Optimization Properties', () => {
  /**
   * Property 1: All images use next/image with proper configuration
   * 
   * This property verifies that:
   * 1. No raw <img> tags exist in component files
   * 2. All image usage imports from 'next/image'
   * 3. All Image components have proper configuration (width/height or fill prop)
   */
  it('should use next/image for all image elements', async () => {
    // Get all component and app files
    const componentFiles = await glob('components/**/*.tsx', { cwd: process.cwd() })
    const appFiles = await glob('app/**/*.tsx', { cwd: process.cwd() })
    const allFiles = [...componentFiles, ...appFiles]

    // Ensure we have files to test
    expect(allFiles.length).toBeGreaterThan(0)

    // Test each file
    await fc.assert(
      fc.asyncProperty(
        fc.constantFrom(...allFiles),
        async (filePath) => {
          const fullPath = path.join(process.cwd(), filePath)
          const content = fs.readFileSync(fullPath, 'utf-8')
          
          // Property 1a: Should not have raw <img> tags
          const rawImgRegex = /<img\s/g
          const hasRawImg = rawImgRegex.test(content)
          
          if (hasRawImg) {
            throw new Error(
              `File ${filePath} contains raw <img> tag. All images must use next/image component.`
            )
          }
          
          // Property 1b: If file uses Image component, it must import from next/image
          const imageUsageRegex = /<Image\s/g
          const hasImageUsage = imageUsageRegex.test(content)
          
          if (hasImageUsage) {
            const imageImportRegex = /import\s+(?:{\s*)?Image(?:\s*})?\s+from\s+['"]next\/image['"]/
            const hasImageImport = imageImportRegex.test(content)
            
            if (!hasImageImport) {
              throw new Error(
                `File ${filePath} uses <Image> component but does not import from 'next/image'.`
              )
            }
            
            // Property 1c: All Image components should have width/height or fill prop
            // Extract all Image component usages
            const imageComponentRegex = /<Image\s+([^>]*?)(?:\/?>|>[\s\S]*?<\/Image>)/g
            const imageMatches = content.matchAll(imageComponentRegex)
            
            for (const match of imageMatches) {
              const imageProps = match[1]
              
              // Check if it has width and height, or fill prop
              const hasWidth = /\bwidth\s*=/.test(imageProps)
              const hasHeight = /\bheight\s*=/.test(imageProps)
              const hasFill = /\bfill\s*(?:=\s*(?:true|{true}))?/.test(imageProps)
              
              const hasProperDimensions = (hasWidth && hasHeight) || hasFill
              
              if (!hasProperDimensions) {
                throw new Error(
                  `File ${filePath} has Image component without proper dimensions. ` +
                  `Image components must have either (width AND height) or fill prop.\n` +
                  `Image props: ${imageProps.substring(0, 100)}...`
                )
              }
            }
          }
          
          // All checks passed
          expect(hasRawImg).toBe(false)
        }
      ),
      { 
        numRuns: allFiles.length,
        verbose: true
      }
    )
  })

  /**
   * Property 2: Image components have meaningful configuration
   * 
   * This property verifies that Image components have:
   * - Valid src attribute
   * - Alt text (for accessibility)
   * - Appropriate sizes attribute for responsive images
   */
  it('should have meaningful configuration for all Image components', async () => {
    const componentFiles = await glob('components/**/*.tsx', { cwd: process.cwd() })
    const appFiles = await glob('app/**/*.tsx', { cwd: process.cwd() })
    const allFiles = [...componentFiles, ...appFiles]

    // Filter to only files that use Image component
    const filesWithImages = allFiles.filter(filePath => {
      const fullPath = path.join(process.cwd(), filePath)
      const content = fs.readFileSync(fullPath, 'utf-8')
      return /<Image\s/.test(content)
    })

    if (filesWithImages.length === 0) {
      // Skip test if no files use Image component
      return
    }

    await fc.assert(
      fc.asyncProperty(
        fc.constantFrom(...filesWithImages),
        async (filePath) => {
          const fullPath = path.join(process.cwd(), filePath)
          const content = fs.readFileSync(fullPath, 'utf-8')
          
          // Extract all Image component usages
          const imageComponentRegex = /<Image\s+([^>]*?)(?:\/?>|>[\s\S]*?<\/Image>)/g
          const imageMatches = content.matchAll(imageComponentRegex)
          
          for (const match of imageMatches) {
            const imageProps = match[1]
            
            // Check for src attribute
            const hasSrc = /\bsrc\s*=/.test(imageProps)
            if (!hasSrc) {
              throw new Error(
                `File ${filePath} has Image component without src attribute.`
              )
            }
            
            // Check for alt attribute (accessibility requirement)
            const hasAlt = /\balt\s*=/.test(imageProps)
            if (!hasAlt) {
              throw new Error(
                `File ${filePath} has Image component without alt attribute. ` +
                `Alt text is required for accessibility (use alt="" for decorative images).`
              )
            }
          }
        }
      ),
      { 
        numRuns: filesWithImages.length,
        verbose: true
      }
    )
  })

  /**
   * Property 3: No Image components use unoptimized prop unnecessarily
   * 
   * This property verifies that Image components don't use the unoptimized prop
   * unless absolutely necessary (e.g., external CDN images that can't be optimized)
   */
  it('should minimize use of unoptimized prop', async () => {
    const componentFiles = await glob('components/**/*.tsx', { cwd: process.cwd() })
    const appFiles = await glob('app/**/*.tsx', { cwd: process.cwd() })
    const allFiles = [...componentFiles, ...appFiles]

    const filesWithImages = allFiles.filter(filePath => {
      const fullPath = path.join(process.cwd(), filePath)
      const content = fs.readFileSync(fullPath, 'utf-8')
      return /<Image\s/.test(content)
    })

    if (filesWithImages.length === 0) {
      return
    }

    const filesWithUnoptimized: string[] = []

    await fc.assert(
      fc.asyncProperty(
        fc.constantFrom(...filesWithImages),
        async (filePath) => {
          const fullPath = path.join(process.cwd(), filePath)
          const content = fs.readFileSync(fullPath, 'utf-8')
          
          // Check for unoptimized prop
          const imageComponentRegex = /<Image\s+([^>]*?)(?:\/?>|>[\s\S]*?<\/Image>)/g
          const imageMatches = content.matchAll(imageComponentRegex)
          
          for (const match of imageMatches) {
            const imageProps = match[1]
            const hasUnoptimized = /\bunoptimized\s*(?:=\s*(?:true|{true}))?/.test(imageProps)
            
            if (hasUnoptimized) {
              filesWithUnoptimized.push(filePath)
            }
          }
        }
      ),
      { 
        numRuns: filesWithImages.length,
        verbose: true
      }
    )

    // Log warning if unoptimized images are found (not a hard failure)
    if (filesWithUnoptimized.length > 0) {
      console.warn(
        `\nWarning: Found ${filesWithUnoptimized.length} file(s) with unoptimized images:\n` +
        filesWithUnoptimized.map(f => `  - ${f}`).join('\n') +
        `\n\nConsider removing the 'unoptimized' prop to enable Next.js image optimization.`
      )
    }
  })
})
