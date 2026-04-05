#!/usr/bin/env node

/**
 * WCAG AAA Contrast Ratio Verification Script
 * 
 * This script verifies that all color combinations in the portfolio
 * meet WCAG AAA standards (7:1 for normal text, 4.5:1 for large text)
 */

// OKLCH to RGB conversion (accurate conversion using proper matrix)
function oklchToRgb(l, c, h) {
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

// Color definitions from globals.css (WCAG AAA compliant values)
const lightTheme = {
  background: { l: 0.99, c: 0.003, h: 250 },
  foreground: { l: 0.15, c: 0.015, h: 250 }, // 19.11:1 ratio
  card: { l: 1, c: 0, h: 0 },
  'card-foreground': { l: 0.15, c: 0.015, h: 250 }, // 19.11:1 ratio
  primary: { l: 0.45, c: 0.2, h: 264 }, // 7.64:1 ratio
  'primary-foreground': { l: 0.99, c: 0.003, h: 250 },
  secondary: { l: 0.95, c: 0.008, h: 250 },
  'secondary-foreground': { l: 0.15, c: 0.015, h: 250 }, // 19.11:1 ratio
  muted: { l: 0.96, c: 0.006, h: 250 },
  'muted-foreground': { l: 0.35, c: 0.015, h: 250 }, // 10.97:1 ratio
  accent: { l: 0.48, c: 0.22, h: 295 }, // 7.0:1 ratio
  'accent-foreground': { l: 0.99, c: 0.003, h: 250 },
};

const darkTheme = {
  background: { l: 0.15, c: 0.015, h: 250 },
  foreground: { l: 0.98, c: 0.008, h: 250 }, // 18.58:1 ratio
  card: { l: 0.18, c: 0.015, h: 250 },
  'card-foreground': { l: 0.98, c: 0.008, h: 250 }, // 17.76:1 ratio
  primary: { l: 0.72, c: 0.22, h: 264 }, // 7.02:1 ratio
  'primary-foreground': { l: 0.15, c: 0.015, h: 250 },
  secondary: { l: 0.25, c: 0.015, h: 250 },
  'secondary-foreground': { l: 0.98, c: 0.008, h: 250 }, // 18.58:1 ratio
  muted: { l: 0.25, c: 0.015, h: 250 },
  'muted-foreground': { l: 0.78, c: 0.015, h: 250 }, // 9.84:1 ratio
  accent: { l: 0.75, c: 0.24, h: 295 }, // 7.39:1 ratio
  'accent-foreground': { l: 0.15, c: 0.015, h: 250 },
};

// Test combinations
const testCombinations = [
  // Light theme
  { theme: 'light', fg: 'foreground', bg: 'background', desc: 'Body text' },
  { theme: 'light', fg: 'card-foreground', bg: 'card', desc: 'Card text' },
  { theme: 'light', fg: 'primary-foreground', bg: 'primary', desc: 'Primary button' },
  { theme: 'light', fg: 'accent-foreground', bg: 'accent', desc: 'Accent button' },
  { theme: 'light', fg: 'muted-foreground', bg: 'background', desc: 'Muted text on background' },
  { theme: 'light', fg: 'muted-foreground', bg: 'muted', desc: 'Muted text on muted bg' },
  { theme: 'light', fg: 'secondary-foreground', bg: 'secondary', desc: 'Secondary text' },
  
  // Dark theme
  { theme: 'dark', fg: 'foreground', bg: 'background', desc: 'Body text' },
  { theme: 'dark', fg: 'card-foreground', bg: 'card', desc: 'Card text' },
  { theme: 'dark', fg: 'primary-foreground', bg: 'primary', desc: 'Primary button' },
  { theme: 'dark', fg: 'accent-foreground', bg: 'accent', desc: 'Accent button' },
  { theme: 'dark', fg: 'muted-foreground', bg: 'background', desc: 'Muted text on background' },
  { theme: 'dark', fg: 'muted-foreground', bg: 'muted', desc: 'Muted text on muted bg' },
  { theme: 'dark', fg: 'secondary-foreground', bg: 'secondary', desc: 'Secondary text' },
];

console.log('\n=== WCAG AAA Contrast Ratio Verification ===\n');
console.log('Requirements:');
console.log('  - Normal text: 7:1 minimum');
console.log('  - Large text: 4.5:1 minimum\n');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

testCombinations.forEach(test => {
  const theme = test.theme === 'light' ? lightTheme : darkTheme;
  const fgColor = theme[test.fg];
  const bgColor = theme[test.bg];
  
  const fgRgb = oklchToRgb(fgColor.l, fgColor.c, fgColor.h);
  const bgRgb = oklchToRgb(bgColor.l, bgColor.c, bgColor.h);
  
  const ratio = getContrastRatio(fgRgb, bgRgb);
  const normalPass = ratio >= 7;
  const largePass = ratio >= 4.5;
  
  totalTests++;
  if (normalPass) passedTests++;
  else failedTests++;
  
  const status = normalPass ? '✅ PASS' : (largePass ? '⚠️  LARGE ONLY' : '❌ FAIL');
  
  console.log(`[${test.theme.toUpperCase()}] ${test.desc}`);
  console.log(`  Ratio: ${ratio.toFixed(2)}:1 ${status}`);
  console.log(`  Normal text (7:1): ${normalPass ? 'PASS' : 'FAIL'}`);
  console.log(`  Large text (4.5:1): ${largePass ? 'PASS' : 'FAIL'}`);
  console.log('');
});

console.log('=== Summary ===');
console.log(`Total tests: ${totalTests}`);
console.log(`Passed (7:1): ${passedTests}`);
console.log(`Failed: ${failedTests}`);
console.log(`Success rate: ${((passedTests / totalTests) * 100).toFixed(1)}%\n`);

if (failedTests === 0) {
  console.log('✅ All color combinations meet WCAG AAA standards!\n');
  process.exit(0);
} else {
  console.log('❌ Some color combinations do not meet WCAG AAA standards.\n');
  process.exit(1);
}
