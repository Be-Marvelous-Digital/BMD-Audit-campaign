import { memo, useEffect, useRef } from 'react';
import { useInView } from '../../hooks/useInView';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { drawWaves, resizeCanvas } from './HeroCanvas.helpers';
import styles from './HeroCanvas.module.less';

export const HeroCanvas = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const visible = useInView(canvasRef);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    let [width, height] = resizeCanvas(canvas, context);
    let pointerX = 0.5;
    let frame = 0;
    const render = (time: number) => drawWaves({ context, width, height, time, pointerX });
    const loop = (time: number) => {
      render(time);
      frame = requestAnimationFrame(loop);
    };
    const handleResize = () => {
      [width, height] = resizeCanvas(canvas, context);
      if (reducedMotion) render(0);
    };
    const handlePointer = (event: PointerEvent) => {
      pointerX = event.clientX / window.innerWidth;
    };

    window.addEventListener('resize', handleResize);
    if (reducedMotion || !visible) render(0);
    else {
      window.addEventListener('pointermove', handlePointer, { passive: true });
      frame = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointer);
    };
  }, [visible, reducedMotion]);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
});
