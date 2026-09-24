import { useEffect, useState } from 'react';

export function useCountUp(target: number, durationMs: number, startDelayMs: number, skip: boolean): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (skip) {
      setValue(target);
      return;
    }
    let frame = 0;
    let start = 0;
    const tick = (now: number) => {
      if (!start) start = now;
      const progress = Math.min((now - start) / durationMs, 1);
      setValue(Math.round(target * (1 - Math.pow(1 - progress, 4))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    const timeout = window.setTimeout(() => {
      frame = requestAnimationFrame(tick);
    }, startDelayMs);
    return () => {
      window.clearTimeout(timeout);
      cancelAnimationFrame(frame);
    };
  }, [target, durationMs, startDelayMs, skip]);

  return value;
}
