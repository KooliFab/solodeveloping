# Testing Guide

This project uses **Vitest** and **React Testing Library** for testing.

## Running Tests

```bash
# Run tests in watch mode (recommended for development)
npm test

# Run tests once (for CI/CD)
npm run test:run

# Run tests with UI (visual test runner)
npm run test:ui

# Run tests with coverage report
npm run test:coverage
```

## Test Structure

```
src/
├── components/
│   ├── ui/
│   │   ├── Button.jsx
│   │   └── __tests__/
│   │       └── Button.test.jsx
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   └── __tests__/
│   │       └── Navbar.test.jsx
│   └── __tests__/
│       └── SEO.test.jsx
├── hooks/
│   ├── useSmoothScroll.js
│   └── __tests__/
│       └── useSmoothScroll.test.js
├── utils/
│   ├── contactNotifier.js
│   └── __tests__/
│       └── contactNotifier.test.js
└── test/
    ├── setup.js              # Test configuration
    ├── integration/          # Integration tests
    └── README.md            # This file
```

## Test Coverage

Current test coverage includes:

### Unit Tests
- ✅ **Button Component** - All variants, sizes, and interactions
- ✅ **SEO Component** - Meta tags, Open Graph, Twitter Cards, hreflang
- ✅ **Navbar Component** - Navigation, mobile menu, scroll behavior
- ✅ **ContactSection Component** - Form validation, submission, error handling
- ✅ **contactNotifier Utility** - API calls, error handling, endpoint priority
- ✅ **useSmoothScroll Hook** - Initialization, cleanup, device detection

### Integration Tests
- ✅ **Language Switching** - i18n integration, URL changes

## Writing Tests

### Component Test Example

```jsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MyComponent from '../MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('handles user interaction', async () => {
    const user = userEvent.setup();
    render(<MyComponent />);
    
    await user.click(screen.getByRole('button'));
    expect(screen.getByText('Clicked')).toBeInTheDocument();
  });
});
```

### Hook Test Example

```jsx
import { renderHook } from '@testing-library/react';
import { useMyHook } from '../useMyHook';

describe('useMyHook', () => {
  it('returns expected value', () => {
    const { result } = renderHook(() => useMyHook());
    expect(result.current).toBe(true);
  });
});
```

### Utility Test Example

```jsx
import { describe, it, expect } from 'vitest';
import { myUtility } from '../myUtility';

describe('myUtility', () => {
  it('processes data correctly', () => {
    const result = myUtility('input');
    expect(result).toBe('expected output');
  });
});
```

## Mocking

### Mocking Modules

```jsx
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: { language: 'en' },
  }),
}));
```

### Mocking Functions

```jsx
const mockFn = vi.fn();
mockFn.mockReturnValue('value');
mockFn.mockResolvedValue('async value');
```

### Mocking Browser APIs

```jsx
window.matchMedia = vi.fn().mockImplementation(query => ({
  matches: false,
  media: query,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
}));
```

## Best Practices

1. **Test user behavior, not implementation**
   - Use `screen.getByRole()` instead of `getByTestId()`
   - Test what users see and do

2. **Keep tests simple and focused**
   - One assertion per test when possible
   - Clear test names that describe the behavior

3. **Use proper async handling**
   - Use `await` with `userEvent`
   - Use `waitFor()` for async state updates

4. **Mock external dependencies**
   - Mock API calls
   - Mock heavy libraries (GSAP, Framer Motion)
   - Mock browser APIs when needed

5. **Clean up after tests**
   - Tests should be independent
   - Use `beforeEach` and `afterEach` for setup/cleanup

## Continuous Integration

Tests run automatically on:
- Every commit (pre-commit hook - to be configured)
- Every pull request (CI/CD pipeline - to be configured)
- Before deployment

## Coverage Goals

Target coverage:
- **Statements**: 80%+
- **Branches**: 75%+
- **Functions**: 80%+
- **Lines**: 80%+

## Troubleshooting

### Common Issues

**Issue**: Tests fail with "Cannot find module"
**Solution**: Check import paths and aliases in `vitest.config.js`

**Issue**: Tests timeout
**Solution**: Increase timeout in test or check for unresolved promises

**Issue**: Mock not working
**Solution**: Ensure mock is defined before component import

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
