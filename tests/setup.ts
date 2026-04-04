/**
 * Test setup file for property-based testing
 * Configures fast-check with minimum 100 iterations per property test
 */

import * as fc from 'fast-check'

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
