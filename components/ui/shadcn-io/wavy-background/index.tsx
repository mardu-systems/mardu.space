'use client';

import * as React from 'react';
import { createNoise3D, type NoiseFunction3D } from 'simplex-noise';
import { cn } from '@/lib/utils';

type WavyBackgroundProps = React.ComponentPropsWithoutRef<'div'> & {
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  blur?: number;
  speed?: 'slow' | 'fast';
  waveOpacity?: number;
  backgroundFill?: string;
};

const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill = 'transparent',
  blur = 10,
  speed = 'fast',
  waveOpacity = 0.5,
  ...props
}: WavyBackgroundProps) => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const ctxRef = React.useRef<CanvasRenderingContext2D | null>(null);
  const animationIdRef = React.useRef<number | null>(null);

  const noiseRef = React.useRef<NoiseFunction3D | null>(null);
  if (noiseRef.current === null) {
    noiseRef.current = createNoise3D();
  }

  const [isSafari, setIsSafari] = React.useState(false);

  const waveColors = React.useMemo(
    () =>
      colors ?? ['#38bdf8', '#818cf8', '#c084fc', '#e879f9', '#22d3ee'],
    [colors],
  );

  const getSpeed = React.useCallback((): number => {
    switch (speed) {
      case 'slow':
        return 0.001;
      case 'fast':
        return 0.002;
      default:
        return 0.001;
    }
  }, [speed]);

  const resizeCanvas = React.useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    ctx.canvas.width = canvas.offsetWidth;
    ctx.canvas.height = canvas.offsetHeight;
    ctx.filter = `blur(${blur}px)`;
  }, [blur]);

  const drawWave = React.useCallback(
    (n: number) => {
      const ctx = ctxRef.current;
      const canvas = canvasRef.current;
      const noise = noiseRef.current;
      if (!ctx || !canvas || !noise) return;

      const w = ctx.canvas.width;
      const h = ctx.canvas.height;

      // Time parameter lives outside drawWave; caller increments it.
      for (let i = 0; i < n; i++) {
        ctx.beginPath();
        ctx.lineWidth = waveWidth ?? 50;
        ctx.strokeStyle = waveColors[i % waveColors.length] ?? waveColors[0];

        for (let x = 0; x < w; x += 5) {
          // y in [-100, 100] scaled by simplex noise
          const y = noise(x / 800, 0.3 * i, timeRef.current) * 100;
          ctx.lineTo(x, y + h * 0.5);
        }

        ctx.stroke();
        ctx.closePath();
      }
    },
    [waveColors, waveWidth],
  );

  const timeRef = React.useRef<number>(0);

  const render = React.useCallback(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;

    const w = ctx.canvas.width;
    const h = ctx.canvas.height;

    // Clear previous frame
    ctx.globalAlpha = 1;
    ctx.clearRect(0, 0, w, h);

    // Optional background fill
    if (backgroundFill && backgroundFill !== 'transparent') {
      ctx.fillStyle = backgroundFill;
      ctx.fillRect(0, 0, w, h);
    }

    // Draw waves with configured opacity
    ctx.globalAlpha = waveOpacity;
    drawWave(5);

    // Advance time
    timeRef.current += getSpeed();

    animationIdRef.current = window.requestAnimationFrame(render);
  }, [backgroundFill, drawWave, getSpeed, waveOpacity]);

  const init = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctxRef.current = ctx;
    resizeCanvas();

    // Use addEventListener instead of clobbering window.onresize
    window.addEventListener('resize', resizeCanvas);

    // Start animation loop
    render();
  }, [render, resizeCanvas]);

  React.useEffect(() => {
    // Detect Safari (kept because you explicitly supported it)
    const ua = typeof window !== 'undefined' ? navigator.userAgent : '';
    setIsSafari(ua.includes('Safari') && !ua.includes('Chrome'));

    init();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationIdRef.current !== null) {
        cancelAnimationFrame(animationIdRef.current);
        animationIdRef.current = null;
      }
    };
  }, [init, resizeCanvas]);

  // When visual parameters change, restart the loop cleanly
  React.useEffect(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;

    // Update blur immediately
    ctx.filter = `blur(${blur}px)`;

    // Restart animation so the new parameters take effect deterministically
    if (animationIdRef.current !== null) {
      cancelAnimationFrame(animationIdRef.current);
      animationIdRef.current = null;
    }
    render();
  }, [blur, backgroundFill, waveOpacity, speed, waveWidth, waveColors, render]);

  return (
    <div
      className={cn(
        'relative flex h-full w-full flex-col items-center justify-center',
        containerClassName,
      )}
    >
      <canvas
        ref={canvasRef}
        id="canvas"
        className="absolute inset-0 z-0 h-full w-full"
        style={isSafari ? { filter: `blur(${blur}px)` } : undefined}
      />
      <div className={cn('relative z-10', className)} {...props}>
        {children}
      </div>
    </div>
  );
};

export default WavyBackground;
