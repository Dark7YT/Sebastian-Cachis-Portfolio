import { useState, useEffect } from 'react';

export const useTypedText = (fullText: string, typingSpeed: number = 50, startDelay: number = 0): string => {
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setTypedText('');
    setCurrentIndex(0);
  }, [fullText]);

  useEffect(() => {
    if (!fullText) return;

      let typingIntervalId: ReturnType<typeof setTimeout>;
      let delayTimeoutId: ReturnType<typeof setTimeout>;

    if (startDelay > 0 && currentIndex === 0) {
      delayTimeoutId = setTimeout(() => {
        if (currentIndex < fullText.length) {
          typingIntervalId = setTimeout(() => {
            setTypedText((prev) => prev + fullText[currentIndex]);
            setCurrentIndex((prev) => prev + 1);
          }, typingSpeed);
        }
      }, startDelay);
    } else {
      if (currentIndex < fullText.length) {
        typingIntervalId = setTimeout(() => {
          setTypedText((prev) => prev + fullText[currentIndex]);
          setCurrentIndex((prev) => prev + 1);
        }, typingSpeed);
      }
    }

    return () => {
      clearTimeout(delayTimeoutId);
      clearTimeout(typingIntervalId);
    };
  }, [fullText, currentIndex, typingSpeed, startDelay]);

  return typedText;
};