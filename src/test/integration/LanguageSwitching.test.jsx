import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import LanguageSwitcher from '../../components/layout/LanguageSwitcher';

// Mock react-i18next
const mockChangeLanguage = vi.fn();
const mockI18n = {
  language: 'en',
  changeLanguage: mockChangeLanguage,
};

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: mockI18n,
  }),
}));

describe('Language Switching Integration', () => {
  it('renders language selector with current language', () => {
    render(
      <BrowserRouter>
        <LanguageSwitcher />
      </BrowserRouter>
    );

    const select = screen.getByLabelText('Switch language');
    expect(select).toBeInTheDocument();
    expect(select.value).toBe('en');
  });

  it('displays both language options', () => {
    render(
      <BrowserRouter>
        <LanguageSwitcher />
      </BrowserRouter>
    );

    const englishOption = screen.getByRole('option', { name: 'English' });
    const frenchOption = screen.getByRole('option', { name: 'Français' });

    expect(englishOption).toBeInTheDocument();
    expect(frenchOption).toBeInTheDocument();
  });

  it('calls changeLanguage when selecting a different language', async () => {
    const user = userEvent.setup();
    
    render(
      <BrowserRouter>
        <LanguageSwitcher />
      </BrowserRouter>
    );

    const select = screen.getByLabelText('Switch language');
    
    await user.selectOptions(select, 'fr');

    await waitFor(() => {
      expect(mockChangeLanguage).toHaveBeenCalledWith('fr');
    });
  });

  it('has proper accessibility attributes', () => {
    render(
      <BrowserRouter>
        <LanguageSwitcher />
      </BrowserRouter>
    );

    const select = screen.getByLabelText('Switch language');
    expect(select).toHaveAttribute('aria-label', 'Switch language');
    
    // Should have sr-only label
    const srOnlyLabel = screen.getByText('Language');
    expect(srOnlyLabel).toHaveClass('sr-only');
  });

  it('displays globe icon', () => {
    const { container } = render(
      <BrowserRouter>
        <LanguageSwitcher />
      </BrowserRouter>
    );

    // Globe icon should be present
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });
});
