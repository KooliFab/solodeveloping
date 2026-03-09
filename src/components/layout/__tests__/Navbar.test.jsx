import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../Navbar';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => {
      const translations = {
        'navbar.home': 'Home',
        'navbar.about': 'About',
        'navbar.blog': 'Blog',
        'navbar.hireMe': 'Hire Me',
      };
      return translations[key] || key;
    },
    i18n: {
      language: 'en',
    },
  }),
}));

const renderNavbar = () => {
  return render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
};

describe('Navbar', () => {
  beforeEach(() => {
    // Mock scrollY
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 0,
    });
  });

  it('renders logo and brand name', () => {
    renderNavbar();
    // Text is split across multiple elements, so we need to check for both parts
    expect(screen.getByText('SOLO')).toBeInTheDocument();
    expect(screen.getByText('DEVELOPING')).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    renderNavbar();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
  });

  it('renders hire me button', () => {
    renderNavbar();
    expect(screen.getByText('Hire Me')).toBeInTheDocument();
  });

  it('renders language switcher', () => {
    renderNavbar();
    const languageSelect = screen.getByLabelText('Switch language');
    expect(languageSelect).toBeInTheDocument();
  });

  it('toggles mobile menu on button click', async () => {
    const user = userEvent.setup();
    renderNavbar();

    // Find mobile menu button
    const menuButton = screen.getByLabelText('Open navigation menu');
    expect(menuButton).toBeInTheDocument();

    // Click to open
    await user.click(menuButton);
    
    // Menu should be open (aria-expanded should be true)
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    
    // Click to close
    const closeButton = screen.getByLabelText('Close navigation menu');
    await user.click(closeButton);
    
    expect(closeButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('applies scrolled styles when scrolled', async () => {
    const { container } = renderNavbar();
    const nav = container.querySelector('nav');

    // Initially not scrolled
    expect(nav).toHaveClass('bg-transparent');

    // Simulate scroll
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 100,
    });

    // Trigger scroll event
    window.dispatchEvent(new Event('scroll'));

    // Wait for state update
    await waitFor(() => {
      expect(nav).toHaveClass('glass-panel');
    });
  });

  it('has proper accessibility attributes', () => {
    renderNavbar();
    
    const menuButton = screen.getByLabelText('Open navigation menu');
    expect(menuButton).toHaveAttribute('aria-label');
    expect(menuButton).toHaveAttribute('aria-expanded');
  });

  it('renders navigation links with correct paths', () => {
    renderNavbar();
    
    const homeLink = screen.getByText('Home').closest('a');
    const aboutLink = screen.getByText('About').closest('a');
    const blogLink = screen.getByText('Blog').closest('a');

    expect(homeLink).toHaveAttribute('href', '/');
    expect(aboutLink).toHaveAttribute('href', '/about');
    expect(blogLink).toHaveAttribute('href', '/articles');
  });

  it('highlights active navigation link', () => {
    renderNavbar();
    
    // Home should be active on root path
    const homeLink = screen.getByText('Home');
    expect(homeLink).toHaveClass('text-primary');
  });
});
