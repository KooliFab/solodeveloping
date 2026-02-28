/**
 * Advanced text reveal utility
 * Wraps each character in a span for individual animation
 */
export const splitTextAdvanced = (element) => {
  if (!element) return { chars: [], words: [], lines: [] };

  const text = element.textContent;
  const words = text.split(" ");

  element.innerHTML = words
    .map((word, wordIndex) => {
      const chars = word.split("");
      const charsHTML = chars
        .map((char, charIndex) => {
          return `<span class="char" style="display: inline-block; will-change: transform, opacity;" data-word="${wordIndex}" data-char="${charIndex}">${char}</span>`;
        })
        .join("");
      return `<span class="word" style="display: inline-block; white-space: nowrap;" data-word="${wordIndex}">${charsHTML}</span>`;
    })
    .join('<span style="display: inline-block;">&nbsp;</span>');

  return {
    chars: Array.from(element.querySelectorAll(".char")),
    words: Array.from(element.querySelectorAll(".word")),
    lines: getLines(element),
  };
};

/**
 * Detect line breaks based on element positioning
 */
const getLines = (element) => {
  const words = Array.from(element.querySelectorAll(".word"));
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
