/**
 * Test setup file for property-based testing
 * Configures fast-check with minimum 100 iterations per property test
 */

import * as fc from 'fast-check'
import '@testing-library/jest-dom'

// Mock window.matchMedia for next-themes
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
global.localStorage = localStorageMock as any

// Mock IntersectionObserver for framer-motion
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return []
  }
  unobserve() {}
} as any

// Configure fast-check globally
fc.configureGlobal({
  numRuns: 100, // Minimum 100 iterations as per design document
  verbose: true,
  // Increase timeout for property tests
  interruptAfterTimeLimit: 25000, // 25 seconds
})

// Global test setup
beforeAll(() => {
  console.log('🧪 Property-Based Testing Setup')
  console.log('📊 fast-check configured with minimum 100 runs per property')
})
