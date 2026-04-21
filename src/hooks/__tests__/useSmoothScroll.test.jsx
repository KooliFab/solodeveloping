import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { useSmoothScroll } from '../useSmoothScroll';

// Mock dynamic imports
vi.mock('lenis', () => ({
  default: class Lenis {
    constructor() {
      this.on = vi.fn();
      this.raf = vi.fn();
      this.destroy = vi.fn();
      this.scrollTo = vi.fn();
    }
  },
}));

vi.mock('gsap', () => ({
  default: {
    registerPlugin: vi.fn(),
    ticker: {
      add: vi.fn(),
      remove: vi.fn(),
      lagSmoothing: vi.fn(),
    },
  },
}));

vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {
    defaults: vi.fn(),
    update: vi.fn(),
    refresh: vi.fn(),
  },
}));

describe('useSmoothScroll', () => {
  beforeEach(() => {
    // Mock window.matchMedia for desktop
    window.matchMedia = vi.fn().mockImplementation(query => ({
      matches: query === '(pointer: fine)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    // Mock window dimensions
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1920,
    });

    // Mock window.lenis
    delete window.lenis;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should not initialize on mobile devices', () => {
    // Mock mobile device
    window.matchMedia = vi.fn().mockImplementation(query => ({
      matches: query === '(pointer: coarse)',
      media: query,
    }));

    const wrapper = ({ children }) => <BrowserRouter>{children}</BrowserRouter>;
    const { unmount } = renderHook(() => useSmoothScroll(), { wrapper });

    expect(window.lenis).toBeUndefined();
    unmount();
  });

  it('should not initialize when prefers-reduced-motion is set', () => {
    window.matchMedia = vi.fn().mockImplementation(query => {
      if (query === '(prefers-reduced-motion: reduce)') {
        return { matches: true };
      }
      return { matches: false };
    });

    const wrapper = ({ children }) => <BrowserRouter>{children}</BrowserRouter>;
    const { unmount } = renderHook(() => useSmoothScroll(), { wrapper });

    expect(window.lenis).toBeUndefined();
    unmount();
  });

  it('should not initialize on small screens', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 768,
    });

    const wrapper = ({ children }) => <BrowserRouter>{children}</BrowserRouter>;
    const { unmount } = renderHook(() => useSmoothScroll(), { wrapper });

    expect(window.lenis).toBeUndefined();
    unmount();
  });

  it('should initialize on desktop with fine pointer', async () => {
    const wrapper = ({ children }) => <BrowserRouter>{children}</BrowserRouter>;
    const { unmount } = renderHook(() => useSmoothScroll(), { wrapper });

    // Wait for async initialization
    await new Promise(resolve => setTimeout(resolve, 100));

    // Lenis should be initialized
    expect(window.lenis).toBeDefined();
    
    unmount();
  });

  it('should cleanup on unmount', async () => {
    const wrapper = ({ children }) => <BrowserRouter>{children}</BrowserRouter>;
    const { unmount } = renderHook(() => useSmoothScroll(), { wrapper });

    await new Promise(resolve => setTimeout(resolve, 100));

    const lenisInstance = window.lenis;
    expect(lenisInstance).toBeDefined();

    unmount();

    // Lenis should be cleaned up
    expect(window.lenis).toBeUndefined();
  });

  it('should handle hash navigation', async () => {
    const wrapper = ({ children }) => <BrowserRouter>{children}</BrowserRouter>;
    
    // Create a mock element
    const mockElement = document.createElement('div');
    mockElement.id = 'test-section';
    document.body.appendChild(mockElement);

    const { unmount } = renderHook(() => useSmoothScroll(), { wrapper });

    await new Promise(resolve => setTimeout(resolve, 100));

    // Cleanup
    document.body.removeChild(mockElement);
    unmount();
  });
});
