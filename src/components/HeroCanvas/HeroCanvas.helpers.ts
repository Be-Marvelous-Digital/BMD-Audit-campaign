const LINE_COUNT = 22;

export interface WaveFrame {
  context: CanvasRenderingContext2D;
  width: number;
  height: number;
  time: number;
  pointerX: number;
}

export function drawWaves({ context, width, height, time, pointerX }: WaveFrame): void {
  context.clearRect(0, 0, width, height);
  const gradient = context.createLinearGradient(0, 0, width, 0);
  gradient.addColorStop(0, 'rgba(36,72,255,0)');
  gradient.addColorStop(0.35, 'rgba(90,110,255,1)');
  gradient.addColorStop(0.8, 'rgba(255,77,0,.9)');
  gradient.addColorStop(1, 'rgba(255,77,0,0)');
  context.strokeStyle = gradient;
  context.lineWidth = 1;

  const amplitudeScale = 0.6 + pointerX * 0.8;
  for (let i = 0; i < LINE_COUNT; i++) {
    context.globalAlpha = 0.25 + (i / LINE_COUNT) * 0.6;
    context.beginPath();
    const base = height * 0.18 + i * ((height * 0.66) / LINE_COUNT);
    for (let x = 0; x <= width; x += 10) {
      const y =
        base +
        Math.sin(x * 0.0035 + time * 0.00035 + i * 0.32) * (36 + i * 2) * amplitudeScale +
        Math.sin(x * 0.009 - time * 0.0005 + i) * 10;
      if (x === 0) context.moveTo(x, y);
      else context.lineTo(x, y);
    }
    context.stroke();
  }
  context.globalAlpha = 1;
}

export function resizeCanvas(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D): [number, number] {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  return [width, height];
}
