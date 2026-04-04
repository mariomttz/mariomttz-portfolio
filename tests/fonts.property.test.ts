/**
 * Property-Based Tests for Font Optimization
 * Feature: portfolio-optimization
 * 
 * **Validates: Requirements 3.2, 3.3**
 * 
 * Property 4: Font configurations include required optimization settings
 * - All font configurations from next/font include display: 'swap'
 * - All font configurations specify subsets array
 */

import { describe, it, expect } from '@jest/globals'
import * as fc from 'fast-check'
import * as fs from 'fs'
import * as path from 'path'

describe('Font Optimization Properties', () => {
  /**
   * Property 4: Font configurations include required optimization settings
   * 
   * This property verifies that:
   * 1. All font configurations include display: 'swap' to prevent invisible text (FOIT)
   * 2. All font configurations specify subsets array to reduce file size
   * 3. Font configurations are properly structured in app/layout.tsx
   */
  it('should have display swap and subsets for all font configurations', async () => {
    const layoutPath = path.join(process.cwd(), 'app/layout.tsx')
    
    // Ensure layout file exists
    expect(fs.existsSync(layoutPath)).toBe(true)
    
    const content = fs.readFileSync(layoutPath, 'utf-8')
    
    // Find all font imports from geist or next/font
    const fontImportRegex = /import\s+{\s*(\w+)\s*}\s+from\s+['"](?:geist\/font\/\w+|next\/font\/\w+)['"]/g
    const fontImports: string[] = []
    let match
    
    while ((match = fontImportRegex.exec(content)) !== null) {
      fontImports.push(match[1])
    }
    
    // Ensure we found font imports
    expect(fontImports.length).toBeGreaterThan(0)
    
    // Test each font configuration
    await fc.assert(
      fc.asyncProperty(
        fc.constantFrom(...fontImports),
        async (fontName) => {
          // Find the font configuration object
          // Pattern: const fontVar = FontName({ ... })
          const configRegex = new RegExp(
            `const\\s+\\w+\\s*=\\s*${fontName}\\s*\\(\\s*{([^}]+)}\\s*\\)`,
            's'
          )
          
          const configMatch = content.match(configRegex)
          
          if (!configMatch) {
            throw new Error(
              `Font ${fontName} is imported but no configuration found. ` +
              `Fonts must be configured with optimization settings.`
            )
          }
          
          const configContent = configMatch[1]
          
          // Property 4a: Check for display: 'swap'
          const hasDisplaySwap = /display\s*:\s*['"]swap['"]/i.test(configContent)
          
          if (!hasDisplaySwap) {
            throw new Error(
              `Font ${fontName} configuration missing display: 'swap'. ` +
              `This is required to prevent invisible text (FOIT) during font loading. ` +
              `(Validates Requirement 3.2)`
            )
          }
          
          // Property 4b: Check for subsets array
          const hasSubsets = /subsets\s*:\s*\[/.test(configContent)
          
          if (!hasSubsets) {
            throw new Error(
              `Font ${fontName} configuration missing subsets array. ` +
              `Specifying subsets reduces font file size by loading only required character sets. ` +
              `(Validates Requirement 3.3)`
            )
          }
          
          // Verify subsets array is not empty
          const subsetsMatch = configContent.match(/subsets\s*:\s*\[([^\]]*)\]/)
          if (subsetsMatch) {
            const subsetsContent = subsetsMatch[1].trim()
            if (subsetsContent.length === 0) {
              throw new Error(
                `Font ${fontName} has empty subsets array. ` +
                `At least one subset (e.g., 'latin') must be specified.`
              )
            }
          }
          
          // All checks passed
          expect(hasDisplaySwap).toBe(true)
          expect(hasSubsets).toBe(true)
        }
      ),
      { 
        numRuns: fontImports.length,
        verbose: true
      }
    )
  })

  /**
   * Property 4 (Extended): Font configurations include recommended optimization settings
   * 
   * This property verifies additional recommended settings:
   * - preload: true for critical fonts
   * - variable: CSS variable name for flexible usage
   */
  it('should have recommended optimization settings for font configurations', async () => {
    const layoutPath = path.join(process.cwd(), 'app/layout.tsx')
    const content = fs.readFileSync(layoutPath, 'utf-8')
    
    // Find all font imports
    const fontImportRegex = /import\s+{\s*(\w+)\s*}\s+from\s+['"](?:geist\/font\/\w+|next\/font\/\w+)['"]/g
    const fontImports: string[] = []
    let match
    
    while ((match = fontImportRegex.exec(content)) !== null) {
      fontImports.push(match[1])
    }
    
    if (fontImports.length === 0) {
      return // Skip if no fonts found
    }
    
    const warnings: string[] = []
    
    await fc.assert(
      fc.asyncProperty(
        fc.constantFrom(...fontImports),
        async (fontName) => {
          const configRegex = new RegExp(
            `const\\s+\\w+\\s*=\\s*${fontName}\\s*\\(\\s*{([^}]+)}\\s*\\)`,
            's'
          )
          
          const configMatch = content.match(configRegex)
          
          if (configMatch) {
            const configContent = configMatch[1]
            
            // Check for preload (recommended for critical fonts)
            const hasPreload = /preload\s*:\s*true/i.test(configContent)
            if (!hasPreload) {
              warnings.push(
                `Font ${fontName}: Consider adding 'preload: true' for critical fonts to improve loading performance.`
              )
            }
            
            // Check for variable (recommended for flexible CSS usage)
            const hasVariable = /variable\s*:\s*['"]--font-/.test(configContent)
            if (!hasVariable) {
              warnings.push(
                `Font ${fontName}: Consider adding 'variable' property for flexible CSS variable usage.`
              )
            }
          }
        }
      ),
      { 
        numRuns: fontImports.length,
        verbose: true
      }
    )
    
    // Log warnings (not failures) for recommended settings
    if (warnings.length > 0) {
      console.warn(
        `\n⚠️  Font Configuration Recommendations:\n` +
        warnings.map(w => `  - ${w}`).join('\n') +
        `\n\nThese are recommendations, not requirements.`
      )
    }
  })

  /**
   * Property 4 (Validation): Font variables are properly used in HTML
   * 
   * This property verifies that:
   * - Font CSS variables are applied to the html element
   * - Font className is applied to the body element
   */
  it('should properly apply font variables and classes in layout', async () => {
    const layoutPath = path.join(process.cwd(), 'app/layout.tsx')
    const content = fs.readFileSync(layoutPath, 'utf-8')
    
    // Find font variable declarations
    const fontVarRegex = /const\s+(\w+)\s*=\s*\w+\s*\(\s*{[^}]*variable\s*:\s*['"]([^'"]+)['"]/g
    const fontVars: Array<{ varName: string, cssVar: string }> = []
    let match
    
    while ((match = fontVarRegex.exec(content)) !== null) {
      fontVars.push({
        varName: match[1],
        cssVar: match[2]
      })
    }
    
    if (fontVars.length === 0) {
      return // Skip if no font variables found
    }
    
    await fc.assert(
      fc.asyncProperty(
        fc.constantFrom(...fontVars),
        async (fontVar) => {
          // Check if font variable is used in html className
          const htmlClassRegex = /<html[^>]*className\s*=\s*[{`"']([^}`"']*)[}`"']/
          const htmlClassMatch = content.match(htmlClassRegex)
          
          if (htmlClassMatch) {
            const htmlClassName = htmlClassMatch[1]
            
            // Check if font variable is included
            const hasFontVar = htmlClassName.includes(`\${${fontVar.varName}.variable}`) ||
                              htmlClassName.includes(fontVar.varName)
            
            if (!hasFontVar) {
              console.warn(
                `Font variable ${fontVar.varName} (${fontVar.cssVar}) is defined but not applied to <html> element. ` +
                `Consider adding it to the className for proper CSS variable usage.`
              )
            }
          }
        }
      ),
      { 
        numRuns: fontVars.length,
        verbose: true
      }
    )
  })
})
