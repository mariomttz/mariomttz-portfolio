#!/usr/bin/env node

/**
 * WCAG AAA Color Calculator
 * 
 * This script calculates the exact OKLCH values needed to achieve
 * 7:1 contrast ratio for WCAG AAA compliance.
 * 
 * Uses the proper OKLCH → sRGB conversion formula.
 */

// More accurate OKLCH to sRGB conversion
function oklchToSrgb(l, c, h) {
  // Convert OKLCH to OKLab
  const hRad = (h * Math.PI) / 180;
  const a = c * Math.cos(hRad);
  const b = c * Math.sin(hRad);
  
  // OKLab to linear RGB (using proper matrix)
  const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = l - 0.0894841775 * a - 1.2914855480 * b;
  
  const l3 = l_ * l_ * l_;
  const m3 = m_ * m_ * m_;
  const s3 = s_ * s_ * s_;
  
  let r = +4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3;
  let g = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3;
  let b_rgb = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.7076147010 * s3;
  
  // Linear RGB to sRGB (gamma correction)
  const toSrgb = (c) => {
    if (c <= 0.0031308) return 12.92 * c;
    return 1.055 * Math.pow(c, 1/2.4) - 0.055;
  };
  
  r = toSrgb(r);
  g = toSrgb(g);
  b_rgb = toSrgb(b_rgb);
  
  // Clamp to 0-1 range
  r = Math.max(0, Math.min(1, r));
  g = Math.max(0, Math.min(1, g));
  b_rgb = Math.max(0, Math.min(1, b_rgb));
  
  return { r, g, b: b_rgb };
}

// Calculate relative luminance (WCAG formula)
function getLuminance(rgb) {
  const { r, g, b } = rgb;
  
  // Convert to linear RGB
  const toLinear = (c) => {
    if (c <= 0.03928) return c / 12.92;
    return Math.pow((c + 0.055) / 1.055, 2.4);
  };
  
  const rLin = toLinear(r);
  const gLin = toLinear(g);
  const bLin = toLinear(b);
  
  // Calculate luminance
  return 0.2126 * rLin + 0.7152 * gLin + 0.0722 * bLin;
}

// Calculate contrast ratio
function getContrastRatio(rgb1, rgb2) {
  const lum1 = getLuminance(rgb1);
  const lum2 = getLuminance(rgb2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

// Find optimal lightness value for target contrast
function findOptimalLightness(targetL, targetC, targetH, bgL, bgC, bgH, targetRatio, direction) {
  let bestL = targetL;
  let bestRatio = 0;
  let step = 0.01;
  
  // Binary search for optimal lightness
  let minL = direction === 'darker' ? 0.05 : targetL;
  let maxL = direction === 'darker' ? targetL : 0.99;
  
  for (let i = 0; i < 100; i++) {
    const testL = (minL + maxL) / 2;
    const fgRgb = oklchToSrgb(testL, targetC, targetH);
    const bgRgb = oklchToSrgb(bgL, bgC, bgH);
    const ratio = getContrastRatio(fgRgb, bgRgb);
    
    if (Math.abs(ratio - targetRatio) < 0.1) {
      return { l: testL, ratio };
    }
    
    if (ratio < targetRatio) {
      if (direction === 'darker') {
        maxL = testL;
      } else {
        minL = testL;
      }
    } else {
      if (direction === 'darker') {
        minL = testL;
      } else {
        maxL = testL;
      }
    }
  }
  
  const finalRgb = oklchToSrgb((minL + maxL) / 2, targetC, targetH);
  const finalBgRgb = oklchToSrgb(bgL, bgC, bgH);
  const finalRatio = getContrastRatio(finalRgb, finalBgRgb);
  
  return { l: (minL + maxL) / 2, ratio: finalRatio };
}

console.log('\n=== WCAG AAA Color Calculator ===\n');
console.log('Target: 7:1 contrast ratio minimum\n');

// Light theme calculations
console.log('--- LIGHT THEME ---\n');

const lightBg = { l: 0.99, c: 0.003, h: 250 };

// Foreground (body text)
const lightFg = findOptimalLightness(0.15, 0.015, 250, lightBg.l, lightBg.c, lightBg.h, 7.0, 'darker');
console.log(`Foreground (body text):`);
console.log(`  Current: oklch(0.15 0.015 250)`);
console.log(`  Optimal: oklch(${lightFg.l.toFixed(2)} 0.015 250)`);
console.log(`  Ratio: ${lightFg.ratio.toFixed(2)}:1\n`);

// Primary button
const lightPrimary = findOptimalLightness(0.45, 0.2, 264, 0.99, 0.003, 250, 7.0, 'darker');
console.log(`Primary button background:`);
console.log(`  Current: oklch(0.45 0.2 264)`);
console.log(`  Optimal: oklch(${lightPrimary.l.toFixed(2)} 0.2 264)`);
console.log(`  Ratio: ${lightPrimary.ratio.toFixed(2)}:1\n`);

// Accent button
const lightAccent = findOptimalLightness(0.5, 0.22, 295, 0.99, 0.003, 250, 7.0, 'darker');
console.log(`Accent button background:`);
console.log(`  Current: oklch(0.5 0.22 295)`);
console.log(`  Optimal: oklch(${lightAccent.l.toFixed(2)} 0.22 295)`);
console.log(`  Ratio: ${lightAccent.ratio.toFixed(2)}:1\n`);

// Muted text
const lightMuted = findOptimalLightness(0.35, 0.015, 250, lightBg.l, lightBg.c, lightBg.h, 7.0, 'darker');
console.log(`Muted text:`);
console.log(`  Current: oklch(0.35 0.015 250)`);
console.log(`  Optimal: oklch(${lightMuted.l.toFixed(2)} 0.015 250)`);
console.log(`  Ratio: ${lightMuted.ratio.toFixed(2)}:1\n`);

// Dark theme calculations
console.log('--- DARK THEME ---\n');

const darkBg = { l: 0.15, c: 0.015, h: 250 };

// Foreground (body text)
const darkFg = findOptimalLightness(0.98, 0.008, 250, darkBg.l, darkBg.c, darkBg.h, 7.0, 'lighter');
console.log(`Foreground (body text):`);
console.log(`  Current: oklch(0.98 0.008 250)`);
console.log(`  Optimal: oklch(${darkFg.l.toFixed(2)} 0.008 250)`);
console.log(`  Ratio: ${darkFg.ratio.toFixed(2)}:1\n`);

// Primary button
const darkPrimary = findOptimalLightness(0.7, 0.22, 264, 0.15, 0.015, 250, 7.0, 'lighter');
console.log(`Primary button background:`);
console.log(`  Current: oklch(0.7 0.22 264)`);
console.log(`  Optimal: oklch(${darkPrimary.l.toFixed(2)} 0.22 264)`);
console.log(`  Ratio: ${darkPrimary.ratio.toFixed(2)}:1\n`);

// Accent button
const darkAccent = findOptimalLightness(0.75, 0.24, 295, 0.15, 0.015, 250, 7.0, 'lighter');
console.log(`Accent button background:`);
console.log(`  Current: oklch(0.75 0.24 295)`);
console.log(`  Optimal: oklch(${darkAccent.l.toFixed(2)} 0.24 295)`);
console.log(`  Ratio: ${darkAccent.ratio.toFixed(2)}:1\n`);

// Muted text
const darkMuted = findOptimalLightness(0.78, 0.015, 250, darkBg.l, darkBg.c, darkBg.h, 7.0, 'lighter');
console.log(`Muted text:`);
console.log(`  Current: oklch(0.78 0.015 250)`);
console.log(`  Optimal: oklch(${darkMuted.l.toFixed(2)} 0.015 250)`);
console.log(`  Ratio: ${darkMuted.ratio.toFixed(2)}:1\n`);

// Card on dark theme
const darkCard = { l: 0.18, c: 0.015, h: 250 };
const darkCardFg = findOptimalLightness(0.98, 0.008, 250, darkCard.l, darkCard.c, darkCard.h, 7.0, 'lighter');
console.log(`Card foreground (dark theme):`);
console.log(`  Current: oklch(0.98 0.008 250)`);
console.log(`  Optimal: oklch(${darkCardFg.l.toFixed(2)} 0.008 250)`);
console.log(`  Ratio: ${darkCardFg.ratio.toFixed(2)}:1\n`);

console.log('=== Summary ===\n');
console.log('Apply these values to app/globals.css for WCAG AAA compliance.\n');
