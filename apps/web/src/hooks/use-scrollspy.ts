import { useEffect, useState } from 'react';

export function useScrollSpy(ids: string[], offset: number = 120) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (!ids || ids.length === 0) return;

    const handleScroll = () => {
      // Check if user is near the bottom of the page
      const isAtBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;

      if (isAtBottom) {
        for (let i = ids.length - 1; i >= 0; i--) {
          const el = document.getElementById(ids[i]);
          if (el) {
            setActiveId(ids[i]);
            return;
          }
        }
      }

      // Find the last section whose top has scrolled past the offset
      let currentId = '';
      for (const id of ids) {
        const element = document.getElementById(id);
        if (element) {
          const top = element.getBoundingClientRect().top;
          if (top <= offset) {
            currentId = id;
          } else {
            break;
          }
        }
      }

      if (currentId) {
        setActiveId(currentId);
      } else if (ids.length > 0) {
        setActiveId(ids[0]);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [ids.join(','), offset]);

  return activeId;
}
