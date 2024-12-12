import { vi } from 'vitest'

// Define the uni global type
declare global {
  const uni: {
    showToast: (options: { title: string; icon?: string }) => void;
    navigateTo: (options: { url: string }) => void;
  }
}

// Setup default uni mock
global.uni = {
  showToast: vi.fn(),
  navigateTo: vi.fn(),
} as any

// Reset mocks between tests
beforeEach(() => {
  vi.clearAllMocks()
})
