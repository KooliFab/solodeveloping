import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
        'contact.labelName': 'Name',
        'contact.labelEmail': 'Email',
        'contact.labelProject': 'Project Type',
        'contact.labelMessage': 'Message',
        'contact.placeholderName': 'Your name',
        'contact.placeholderEmail': 'your@email.com',
        'contact.placeholderProject': 'Select project type',
        'contact.placeholderMessage': 'Tell me about your project...',
        'contact.projectTypeAI': 'AI Integration',
        'contact.projectTypeMobile': 'Mobile App',
        'contact.projectTypeWeb': 'Web Application',
        'contact.projectTypeConsulting': 'Consulting',
        'contact.projectTypeOther': 'Other',
        'contact.buttonSubmit': 'Send Message',
        'contact.buttonSending': 'Sending...',
        'contact.buttonSubmitted': 'Sent!',
        'contact.buttonRetry': 'Retry',
        'contact.statusReady': 'READY',
        'contact.statusSending': 'SENDING',
        'contact.statusSent': 'SENT',
        'contact.statusError': 'ERROR',
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

// Mock contactNotifier
vi.mock('../../../utils/contactNotifier', () => ({
  sendContactNotification: vi.fn(),
}));

import { sendContactNotification } from '../../../utils/contactNotifier';

describe('ContactSection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders contact form with all fields', () => {
    render(<ContactSection />);

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Project Type')).toBeInTheDocument();
    expect(screen.getByLabelText('Message')).toBeInTheDocument();
  });

  it('renders submit button', () => {
    render(<ContactSection />);
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('displays terminal-style header', () => {
    render(<ContactSection />);
    expect(screen.getByText('contact-form.sh')).toBeInTheDocument();
  });

  it('shows all project type options', () => {
    render(<ContactSection />);
    
    const select = screen.getByLabelText('Project Type');
    expect(screen.getByRole('option', { name: 'AI Integration' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Mobile App' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Web Application' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Consulting' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Other' })).toBeInTheDocument();
  });

  it('submits form with valid data', async () => {
    const user = userEvent.setup();
    sendContactNotification.mockResolvedValueOnce({ success: true });

    render(<ContactSection />);

    // Fill out form
    await user.type(screen.getByLabelText('Name'), 'John Doe');
    await user.type(screen.getByLabelText('Email'), 'john@example.com');
    await user.selectOptions(screen.getByLabelText('Project Type'), 'web');
    await user.type(screen.getByLabelText('Message'), 'I need a website');

    // Submit form
    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(sendContactNotification).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        project: 'web',
        message: 'I need a website',
      });
    });
  });

  it('shows success message after successful submission', async () => {
    const user = userEvent.setup();
    sendContactNotification.mockResolvedValueOnce({ success: true });

    render(<ContactSection />);

    // Fill and submit form
    await user.type(screen.getByLabelText('Name'), 'John Doe');
    await user.type(screen.getByLabelText('Email'), 'john@example.com');
    await user.selectOptions(screen.getByLabelText('Project Type'), 'web');
    await user.type(screen.getByLabelText('Message'), 'Test message');
    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/sent!/i)).toBeInTheDocument();
    });
  });

  it('shows error message on submission failure', async () => {
    const user = userEvent.setup();
    sendContactNotification.mockResolvedValueOnce({ 
      success: false, 
      error: 'Network error' 
    });

    render(<ContactSection />);

    // Fill and submit form
    await user.type(screen.getByLabelText('Name'), 'John Doe');
    await user.type(screen.getByLabelText('Email'), 'john@example.com');
    await user.selectOptions(screen.getByLabelText('Project Type'), 'web');
    await user.type(screen.getByLabelText('Message'), 'Test message');
    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/retry/i)).toBeInTheDocument();
    });
  });

  it('clears form after successful submission', async () => {
    const user = userEvent.setup();
    sendContactNotification.mockResolvedValueOnce({ success: true });

    render(<ContactSection />);

    const nameInput = screen.getByLabelText('Name');
    const emailInput = screen.getByLabelText('Email');
    const messageInput = screen.getByLabelText('Message');

    // Fill form
    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.selectOptions(screen.getByLabelText('Project Type'), 'web');
    await user.type(messageInput, 'Test message');

    // Submit
    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(nameInput.value).toBe('');
      expect(emailInput.value).toBe('');
      expect(messageInput.value).toBe('');
    });
  });

  it('disables submit button while sending', async () => {
    const user = userEvent.setup();
    let resolveSubmit;
    const submitPromise = new Promise(resolve => {
      resolveSubmit = resolve;
    });
    
    sendContactNotification.mockImplementation(() => submitPromise);

    render(<ContactSection />);

    // Fill form
    await user.type(screen.getByLabelText('Name'), 'John Doe');
    await user.type(screen.getByLabelText('Email'), 'john@example.com');
    await user.selectOptions(screen.getByLabelText('Project Type'), 'web');
    await user.type(screen.getByLabelText('Message'), 'Test');

    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);

    // Button should be disabled while sending
    expect(submitButton).toBeDisabled();

    // Resolve the promise
    resolveSubmit({ success: true });

    await waitFor(() => {
      expect(submitButton).toBeDisabled(); // Still disabled after success (shows "Sent!")
    });
  });

  it('requires all fields to be filled', async () => {
    const user = userEvent.setup();
    render(<ContactSection />);

    const submitButton = screen.getByRole('button', { name: /send message/i });
    
    // Try to submit empty form
    await user.click(submitButton);

    // Form should not submit (browser validation)
    expect(sendContactNotification).not.toHaveBeenCalled();
  });

  it('displays contact email', () => {
    render(<ContactSection />);
    expect(screen.getByText('hello@solodeveloping.com')).toBeInTheDocument();
  });

  it('displays trust metrics', () => {
    render(<ContactSection />);
    expect(screen.getByText('50+')).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();
    expect(screen.getByText('24h')).toBeInTheDocument();
  });
});
