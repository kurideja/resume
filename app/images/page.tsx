'use client';
import { useImageData } from '@/hooks/useImageData';
import { RGBA } from '@/types/colorManipulation';
import { useCallback, useEffect, useRef } from 'react';
import { RgbControls } from './RgbControls';

const change = (original: number, range: number, initial: number) => {
  const diff = range - initial;

  return Math.max(Math.min(255, original + diff), 0);
};

export default function Images() {
  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { imageData, originalImageData } = useImageData(inputRef);

  const paint = useCallback((data?: ImageData) => {
    const canvas = canvasRef.current;

    if (!canvas || !data) {
      return;
    }

    requestAnimationFrame(() => {
      const ctx = canvas.getContext('2d')!;
      canvas.height = data.height;
      canvas.width = data.width;
      ctx.reset();
      ctx.putImageData(data, 0, 0);
    });
  }, []);

  useEffect(() => {
    paint(imageData);
  }, [paint, imageData]);

  const onControlsChange = useCallback(
    (colors: RGBA) => {
      if (!imageData || !originalImageData) {
        return;
      }

      const { red, green, blue, alpha } = colors;

      const n = imageData.data.length;

      requestAnimationFrame(() => {
        for (let i = 0; i < n; i += 4) {
          imageData.data[i] = change(originalImageData.data[i], red, 127);
          imageData.data[i + 1] = change(originalImageData.data[i + 1], green, 127);
          imageData.data[i + 2] = change(originalImageData.data[i + 2], blue, 127);
          imageData.data[i + 3] = change(originalImageData.data[i + 3], alpha, 255);
        }
      });

      paint(imageData);
    },
    [imageData, originalImageData, paint]
  );

  return (
    <main className="h-full flex flex-col gap-2 p-5">
      <RgbControls disabled={!imageData} onChange={onControlsChange} />

      <input type="file" ref={inputRef} accept="image/*" className="flex-shrink-0" />

      <div>
        <canvas className="w-[100%]" ref={canvasRef}></canvas>
      </div>
    </main>
  );
}
