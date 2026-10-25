import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ContactSection from '../ContactSection';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => {
      const translations = {
        'contact.title': 'Get in',
        'contact.titleHighlight': 'Touch',
        'contact.subtitle': 'Let\'s build something amazing together',
        'contact.terminalHeader': 'contact-form.sh',
        'contact.terminalInit1': '> Initializing contact form...',
        'contact.terminalInit2': '> Ready to receive your message',
        'contact.cta': 'Email me',
        'contact.mailSubject': 'Project inquiry',
        'contact.statusReady': 'READY',
        'contact.email': 'hello@solodeveloping.com',
        'contact.responseTime': 'Response within 24h',
        'contact.metric1Value': '50+',
        'contact.metric1Label': 'Projects Delivered',
        'contact.metric2Value': '100%',
        'contact.metric2Label': 'Client Satisfaction',
        'contact.metric3Value': '24h',
        'contact.metric3Label': 'Response Time',
      };
      return translations[key] || key;
    },
  }),
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    h2: ({ children, ...props }) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
}));

const expectedMailto = 'mailto:hello@solodeveloping.com?subject=Project%20inquiry';

describe('ContactSection', () => {
  it('renders the section title and terminal intro', () => {
    render(<ContactSection />);

    expect(screen.getByText('Get in')).toBeInTheDocument();
    expect(screen.getByText('Touch')).toBeInTheDocument();
    expect(screen.getByText('contact-form.sh')).toBeInTheDocument();
  });

  it('exposes the #contact anchor used by the navigation', () => {
    const { container } = render(<ContactSection />);

    expect(container.querySelector('section#contact')).not.toBeNull();
  });

  it('offers a mailto call to action with a prefilled subject', () => {
    render(<ContactSection />);

    const cta = screen.getByRole('link', { name: /email me/i });
    expect(cta).toHaveAttribute('href', expectedMailto);
  });

  it('shows the email address as a mailto link', () => {
    render(<ContactSection />);

    const email = screen.getByRole('link', { name: 'hello@solodeveloping.com' });
    expect(email).toHaveAttribute('href', expectedMailto);
  });

  it('has no form or input that could send data from the browser', () => {
    const { container } = render(<ContactSection />);

    expect(container.querySelector('form')).toBeNull();
    expect(container.querySelector('input, textarea, select')).toBeNull();
  });

  it('renders the trust metrics', () => {
    render(<ContactSection />);

    expect(screen.getByText('Projects Delivered')).toBeInTheDocument();
    expect(screen.getByText('Client Satisfaction')).toBeInTheDocument();
    expect(screen.getByText('Response Time')).toBeInTheDocument();
  });
});
