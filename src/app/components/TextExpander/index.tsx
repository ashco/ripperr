import React from 'react';

const TextExpander: React.FC<{
  text: string;
  length: number;
}> = ({ text, length }) => {
  // const ref = React.useRef<HTMLParagraphElement>(null);

  const [displayText, setDisplayText] = React.useState(text);

  function stringShortener(str: string, length: number): string {
    let shortStr = str.substring(0, length).trimEnd();

    if (str !== shortStr) {
      shortStr += '..';
    }
    return shortStr;
  }

  function handleMouseEnter() {
    setDisplayText(text);
  }

  function handleMouseLeave() {
    setDisplayText(stringShortener(text, 10));
  }

  return (
    <p onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {displayText}
    </p>
  );
};

export default TextExpander;
