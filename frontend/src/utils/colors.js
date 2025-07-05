export const fixTailwindColors = (element) => {
  const clone = element.cloneNode(true);

  // Set styles to avoid zero height/width
  clone.style.position = 'absolute';
  clone.style.left = '-9999px';
  clone.style.top = '0'; // add top for layout calculation
  clone.style.width = `${element.offsetWidth}px`;
  clone.style.height = `${element.offsetHeight}px`; // crucial!
  clone.style.visibility = 'visible';
  clone.style.opacity = '1';
  clone.style.zIndex = '-1';
  clone.style.pointerEvents = 'none';

  document.body.appendChild(clone);

  const convertOklch = (value) => {
    const oklchRegex = /oklch\(([^)]+)\)/g;
    return value.replace(oklchRegex, (match) => {
      // Replace with actual color conversion for production
      return match.replace('oklch', 'rgb');
    });
  };

  const allElements = clone.querySelectorAll('*');
  allElements.forEach(el => {
    const computed = window.getComputedStyle(el);

    if (computed.backgroundColor.includes('oklch')) {
      el.style.backgroundColor = convertOklch(computed.backgroundColor);
    }
    if (computed.color.includes('oklch')) {
      el.style.color = convertOklch(computed.color);
    }
    if (computed.borderColor.includes('oklch')) {
      el.style.borderColor = convertOklch(computed.borderColor);
    }
  });

  return clone;
};
