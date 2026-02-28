import React, { useEffect, useState } from 'react';
import { slugifyHeading } from '@/lib/utils';


const TableOfContents = ({ content }) => {
  const [activeId, setActiveId] = useState('');
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    // Parse headings from markdown content directly if possible, or wait for DOM
    // Since we receive raw markdown, we can regex it
    const lines = content.split('\n');
    const matches = lines
      .filter(line => line.trimStart().startsWith('## '))
      .map(line => {
        const title = line
          .trimStart()
          .replace(/^##\s+/, '')
          .replace(/\*\*/g, '')
          .replace(/`([^`]+)`/g, '$1')
          .replace(/\[(.*?)\]\(.*?\)/g, '$1')
          .trim();
        const id = slugifyHeading(title);
        return { id, title };
      })
      .filter(({ id }) => id);
    
    setHeadings(matches);

    // Also need to inject these IDs into the rendered markdown... 
    // This part depends on how ReactMarkdown handles IDs.
    // Usually it requires a plugin like rehype-slug.
    // For now, let's assume valid IDs are generated or we'll add logic to matches.
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-10% 0px -80% 0px' }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      headings.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-24 space-y-4 hidden lg:block">
      <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
        Table of Contents
      </h3>
      <ul className="space-y-2 border-l border-primary/10">
        {headings.map(({ id, title }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault();
                const target = document.getElementById(id);
                if (!target) return;

                if (window.lenis?.scrollTo) {
                  window.lenis.scrollTo(target, { duration: 1.1 });
                } else {
                  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }

                window.history.replaceState(null, '', `#${id}`);
                setActiveId(id);
              }}
              className={`block pl-4 py-1 text-sm border-l-2 transition-all duration-200 ${
                activeId === id
                  ? 'border-primary text-primary font-medium'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-primary/50'
              }`}
            >
              {title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
