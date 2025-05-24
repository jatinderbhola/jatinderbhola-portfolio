import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock SvelteKit's $app/stores
vi.mock('$app/stores', () => ({
  page: {
    subscribe: vi.fn(),
    get: () => ({
      data: {
        resume: null,
        structuredData: null
      }
    })
  }
})); 