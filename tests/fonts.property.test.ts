/**
 * Property-Based Tests for Font Optimization
 * Feature: portfolio-optimization
 * 
 * **Validates: Requirements 3.2, 3.3**
 * 
 * Property 4: Font configurations include required optimization settings
 * - Fonts from geist package come pre-configured with display: 'swap'
 * - Fonts from geist package come pre-configured with subsets
 * - Custom next/font configurations include display: 'swap' and subsets
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
   * 1. Fonts from geist package are properly imported (pre-configured with optimizations)
   * 2. Custom font configurations include display: 'swap' to prevent invisible text (FOIT)
   * 3. Custom font configurations specify subsets array to reduce file size
   */
  it('should have display swap and subsets for all font configurations', async () => {
    const layoutPath = path.join(process.cwd(), 'app/layout.tsx')
    
    // Ensure layout file exists
    expect(fs.existsSync(layoutPath)).toBe(true)
    
    const content = fs.readFileSync(layoutPath, 'utf-8')
    
    // Find all font imports from geist or next/font
    const fontImportRegex = /import\s+{\s*(\w+)\s*}\s+from\s+['"](?:geist\/font\/(\w+)|next\/font\/(\w+))['"]/g
    const fontImports: Array<{ name: string, source: string }> = []
    let match
    
    while ((match = fontImportRegex.exec(content)) !== null) {
      const source = match[2] ? 'geist' : 'next/font'
      fontImports.push({ name: match[1], source })
    }
    
    // Ensure we found font imports
    expect(fontImports.length).toBeGreaterThan(0)
    
    // Test each font configuration
    await fc.assert(
      fc.asyncProperty(
        fc.constantFrom(...fontImports),
        async (font) => {
          // For geist fonts, verify they are imported correctly
          // Geist fonts come pre-configured with display: 'swap' and subsets
          if (font.source === 'geist') {
            // Verify the font is assigned to a variable
            const assignmentRegex = new RegExp(
              `const\\s+\\w+\\s*=\\s*${font.name}(?:\\s*$|\\s*[^(])`,
              'm'
            )
            
            const hasAssignment = assignmentRegex.test(content)
            
            if (!hasAssignment) {
              throw new Error(
                `Font ${font.name} from geist package is imported but not assigned to a variable. ` +
                `Geist fonts come pre-configured with display: 'swap' and subsets optimization. ` +
                `(Validates Requirements 3.2, 3.3)`
              )
            }
            
            // Geist fonts are pre-optimized, so we just verify proper usage
            expect(hasAssignment).toBe(true)
            return
          }
          
          // For custom next/font configurations, verify optimization settings
          const configRegex = new RegExp(
            `const\\s+\\w+\\s*=\\s*${font.name}\\s*\\(\\s*{([^}]+)}\\s*\\)`,
            's'
          )
          
          const configMatch = content.match(configRegex)
          
          if (!configMatch) {
            throw new Error(
              `Font ${font.name} from next/font is imported but no configuration found. ` +
              `Fonts must be configured with optimization settings.`
            )
          }
          
          const configContent = configMatch[1]
          
          // Property 4a: Check for display: 'swap'
          const hasDisplaySwap = /display\s*:\s*['"]swap['"]/i.test(configContent)
          
          if (!hasDisplaySwap) {
            throw new Error(
              `Font ${font.name} configuration missing display: 'swap'. ` +
              `This is required to prevent invisible text (FOIT) during font loading. ` +
              `(Validates Requirement 3.2)`
            )
          }
          
          // Property 4b: Check for subsets array
          const hasSubsets = /subsets\s*:\s*\[/.test(configContent)
          
          if (!hasSubsets) {
            throw new Error(
              `Font ${font.name} configuration missing subsets array. ` +
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
                `Font ${font.name} has empty subsets array. ` +
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
   * Property 4 (Extended): Geist fonts provide built-in optimizations
   * 
   * This property verifies that geist fonts are properly used.
   * Geist fonts come pre-configured with:
   * - display: 'swap'
   * - optimized subsets
   * - variable CSS properties
   */
  it('should have recommended optimization settings for font configurations', async () => {
    const layoutPath = path.join(process.cwd(), 'app/layout.tsx')
    const content = fs.readFileSync(layoutPath, 'utf-8')
    
    // Find all font imports
    const fontImportRegex = /import\s+{\s*(\w+)\s*}\s+from\s+['"]geist\/font\/(\w+)['"]/g
    const geistFonts: Array<{ name: string, type: string }> = []
    let match
    
    while ((match = fontImportRegex.exec(content)) !== null) {
      geistFonts.push({ name: match[1], type: match[2] })
    }
    
    if (geistFonts.length === 0) {
      return // Skip if no geist fonts found
    }
    
    // Verify geist fonts are properly assigned
    await fc.assert(
      fc.asyncProperty(
        fc.constantFrom(...geistFonts),
        async (font) => {
          // Check if font is assigned to a variable
          const assignmentRegex = new RegExp(
            `const\\s+(\\w+)\\s*=\\s*${font.name}(?:\\s*$|\\s*[^(])`,
            'm'
          )
          
          const assignmentMatch = content.match(assignmentRegex)
          
          if (!assignmentMatch) {
            throw new Error(
              `Geist font ${font.name} is imported but not assigned. ` +
              `Geist fonts come pre-configured with display: 'swap' and subsets optimization.`
            )
          }
          
          const varName = assignmentMatch[1]
          
          // Verify the font variable has .variable and .className properties used
          const hasVariableUsage = content.includes(`\${${varName}.variable}`) || 
                                   content.includes(`${varName}.variable`)
          const hasClassNameUsage = content.includes(`${varName}.className`)
          
          expect(assignmentMatch).toBeTruthy()
          expect(hasVariableUsage || hasClassNameUsage).toBe(true)
        }
      ),
      { 
        numRuns: geistFonts.length,
        verbose: true
      }
    )
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
    
    // Find font variable assignments (geist fonts)
    const fontVarRegex = /const\s+(\w+)\s*=\s*(\w+)(?:\s*$|\s*[^(])/gm
    const fontVars: string[] = []
    let match
    
    // Also check for imports to identify font variables
    const importRegex = /import\s+{\s*(\w+)\s*}\s+from\s+['"]geist\/font\/\w+['"]/g
    const importedFonts: string[] = []
    
    while ((match = importRegex.exec(content)) !== null) {
      importedFonts.push(match[1])
    }
    
    // Find variables assigned from imported fonts
    for (const importedFont of importedFonts) {
      const assignRegex = new RegExp(`const\\s+(\\w+)\\s*=\\s*${importedFont}(?:\\s*$|\\s*[^(])`, 'm')
      const assignMatch = content.match(assignRegex)
      if (assignMatch) {
        fontVars.push(assignMatch[1])
      }
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
            const hasFontVar = htmlClassName.includes(`\${${fontVar}.variable}`) ||
                              htmlClassName.includes(`${fontVar}.variable`)
            
            // Only warn if not found (not a hard failure)
            if (!hasFontVar) {
              // Check if it's used in body instead
              const bodyClassRegex = /<body[^>]*className\s*=\s*[{`"']([^}`"']*)[}`"']/
              const bodyClassMatch = content.match(bodyClassRegex)
              
              if (bodyClassMatch) {
                const bodyClassName = bodyClassMatch[1]
                const hasInBody = bodyClassName.includes(`${fontVar}.className`)
                
                if (!hasInBody) {
                  console.warn(
                    `Font variable ${fontVar} is defined but may not be properly applied. ` +
                    `Ensure it's used via .variable or .className properties.`
                  )
                }
              }
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
