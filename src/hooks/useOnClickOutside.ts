import { useEffect, type RefObject } from 'react';

type Event = MouseEvent | TouchEvent;

export const useOnClickOutside = <T extends HTMLElement | null>(
  refs: RefObject<T> | RefObject<T>[],
  handler: (event: Event) => void
) => {
  useEffect(() => {
    const listener = (event: Event) => {
      const refsArray = Array.isArray(refs) ? refs : [refs];

      const clickInsideAnyRef = refsArray.some(ref => {
        const el = ref?.current;
        return el && el.contains((event?.target as Node) || null);
      });

      if (clickInsideAnyRef) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [refs, handler]); 
};