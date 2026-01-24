/**
 * Text splitting utility for GSAP animations
 * Free alternative to GSAP's SplitText plugin
 * Splits text into words, characters, or lines for animation
 */

export const splitText = (element, type = 'words') => {
  if (!element) return null;

  const text = element.textContent;
  const splitTypes = {
    chars: '',
    words: ' ',
    lines: '\n'
  };

  // Store original content
  const original = element.innerHTML;

  // Split by type
  if (type === 'chars') {
    const chars = text.split('');
    element.innerHTML = chars
      .map((char, i) => {
        return char === ' '
          ? `<span class="char" style="display: inline-block;">&nbsp;</span>`
          : `<span class="char" style="display: inline-block;">${char}</span>`;
      })
      .join('');
    return Array.from(element.querySelectorAll('.char'));
  }

  if (type === 'words') {
    const words = text.split(' ');
    element.innerHTML = words
      .map((word, i) => {
        return `<span class="word" style="display: inline-block; white-space: nowrap;">${word}</span>${i < words.length - 1 ? ' ' : ''}`;
      })
      .join('');
    return Array.from(element.querySelectorAll('.word'));
  }

  if (type === 'lines') {
    // For lines, we need to detect natural line breaks
    const lines = text.split('\n');
    element.innerHTML = lines
      .map((line, i) => {
        return `<span class="line" style="display: block;">${line}</span>`;
      })
      .join('');
    return Array.from(element.querySelectorAll('.line'));
  }

  return null;
};

/**
 * Advanced text reveal utility
 * Wraps each character in a span for individual animation
 */
export const splitTextAdvanced = (element) => {
  if (!element) return { chars: [], words: [], lines: [] };

  const text = element.textContent;
  const words = text.split(' ');

  element.innerHTML = words
    .map((word, wordIndex) => {
      const chars = word.split('');
      const charsHTML = chars
        .map((char, charIndex) => {
          return `<span class="char" style="display: inline-block; will-change: transform, opacity;" data-word="${wordIndex}" data-char="${charIndex}">${char}</span>`;
        })
        .join('');
      return `<span class="word" style="display: inline-block; white-space: nowrap;" data-word="${wordIndex}">${charsHTML}</span>`;
    })
    .join('<span style="display: inline-block;">&nbsp;</span>');

  return {
    chars: Array.from(element.querySelectorAll('.char')),
    words: Array.from(element.querySelectorAll('.word')),
    lines: getLines(element)
  };
};

/**
 * Detect line breaks based on element positioning
 */
const getLines = (element) => {
  const words = Array.from(element.querySelectorAll('.word'));
  const lines = [];
  let currentLine = [];
  let currentTop = null;

  words.forEach((word, index) => {
    const rect = word.getBoundingClientRect();

    if (currentTop === null) {
      currentTop = rect.top;
    }

    if (rect.top !== currentTop && currentLine.length > 0) {
      lines.push(currentLine);
      currentLine = [word];
      currentTop = rect.top;
    } else {
      currentLine.push(word);
    }

    if (index === words.length - 1 && currentLine.length > 0) {
      lines.push(currentLine);
    }
  });

  return lines;
};

/**
 * Revert split text back to original
 */
export const revertSplit = (element, originalHTML) => {
  if (element && originalHTML) {
    element.innerHTML = originalHTML;
  }
};
