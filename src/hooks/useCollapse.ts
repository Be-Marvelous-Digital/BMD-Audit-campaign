import { useEffect, useState } from 'react';

interface CollapseState {
  present: boolean;
  expanded: boolean;
}

export function useCollapse(open: boolean, durationMs: number): CollapseState {
  const [present, setPresent] = useState(open);
  const [expanded, setExpanded] = useState(open);

  useEffect(() => {
    if (open) {
      setPresent(true);
      let inner = 0;
      const outer = requestAnimationFrame(() => {
        inner = requestAnimationFrame(() => setExpanded(true));
      });
      return () => {
        cancelAnimationFrame(outer);
        cancelAnimationFrame(inner);
      };
    }
    setExpanded(false);
    const timer = window.setTimeout(() => setPresent(false), durationMs);
    return () => window.clearTimeout(timer);
  }, [open, durationMs]);

  return { present, expanded };
}
