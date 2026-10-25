import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import SkillShowcase from '../SkillShowcase';
import { skillCategories } from '@/data/skillCategories';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

describe('SkillShowcase', () => {
  it('renders every app with its name as a visible label', () => {
    const { container } = render(<SkillShowcase />);
    const appCount = skillCategories.reduce((count, category) => count + category.apps.length, 0);
    expect(container.querySelectorAll('.skill-app')).toHaveLength(appCount);
    expect(container.querySelectorAll('.skill-app-label')).toHaveLength(appCount);
    expect(screen.getAllByText('ZeLoop').length).toBeGreaterThan(0);
  });

  it('marks the icon tiles as decorative, since the label names the app', () => {
    const { container } = render(<SkillShowcase />);
    const tiles = [...container.querySelectorAll('.skill-app-tile')];
    expect(tiles.length).toBeGreaterThan(0);
    tiles.forEach((tile) => expect(tile).toHaveAttribute('aria-hidden', 'true'));
    container.querySelectorAll('.skill-app-tile img').forEach((img) => expect(img).toHaveAttribute('alt', ''));
  });

  it('uses the shared component classes instead of repeated utility lists', () => {
    const { container } = render(<SkillShowcase />);
    container.querySelectorAll('.skill-app, .skill-app-tile, .skill-app-label').forEach((node) => {
      expect(node.getAttribute('class').split(' ').length).toBe(1);
    });
    expect(container.querySelectorAll('.skill-card')).toHaveLength(skillCategories.length);
  });

  it('filters categories when a facet page asks for a subset', () => {
    const { container } = render(<SkillShowcase categoryFilter={['mobile', 'backend']} />);
    expect(container.querySelectorAll('.skill-card')).toHaveLength(2);
  });
});
