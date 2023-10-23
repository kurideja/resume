'use client';
import { useImageData } from '@/hooks/useImageData';
import {
  ColorManipulationRequest,
  ColorManipulationResponse,
  RGBA,
} from '@/types/colorManipulation';
import { useCallback, useEffect, useRef } from 'react';
import { RgbControls } from './RgbControls';

export default function Images() {
  const workerRef = useRef<Worker>();
  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageData = useImageData(inputRef);

  const paint = useCallback((data?: ImageData) => {
    const canvas = canvasRef.current;

    if (!canvas || !data) {
      return;
    }

    const ctx = canvas.getContext('2d')!;
    canvas.height = data.height;
    canvas.width = data.width;
    ctx.reset();
    ctx.putImageData(data, 0, 0);
  }, []);

  useEffect(() => {
    paint(imageData);
  }, [paint, imageData]);

  useEffect(() => {
    workerRef.current = new Worker(new URL('../../workers/ColorManipulator.ts', import.meta.url));
    workerRef.current.onmessage = (event: MessageEvent<ColorManipulationResponse>) => {
      if (event.data.type !== 'response:manipulate-colors') {
        return;
      }

      console.log('response:manipulate-colors');
      paint(event.data.imageData);
    };
    return () => {
      workerRef.current?.terminate();
    };
  }, [paint]);

  const onControlsChange = (colors: RGBA) => {
    if (!imageData || !workerRef.current) {
      return;
    }

    const payload: ColorManipulationRequest = {
      type: 'request:manipulate-colors',
      imageData,
      ...colors,
    };

    workerRef.current.postMessage(payload);
  };

  console.log('render page');

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
