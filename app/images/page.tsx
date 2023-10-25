'use client';
import { useImageData } from '@/hooks/useImageData';
import { RGBA } from '@/types/colorManipulation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { RgbControls } from '../../components/images/RgbControls';
import init, { adjust_color_channel } from '@/rust/image-manipulation/pkg/image_manipulation';
import throttle from 'lodash.throttle';
import shrek from '@/public/images/shrek.0.webp';

export default function Images() {
  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { imageData, originalImageData, reset, loadImageFromUrl } = useImageData(inputRef);
  const [rgbControlsKey, setRgbControlsKey] = useState<string>();

  const onControlsReset = useCallback(() => {
    reset();
  }, [reset]);

  const paint = useCallback((data?: ImageData) => {
    const canvas = canvasRef.current;

    if (!canvas || !data) {
      return;
    }

    const ctx = canvas.getContext('2d')!;
    canvas.height = data.height;
    canvas.width = data.width;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.putImageData(data, 0, 0);
  }, []);

  const onControlsChange = useMemo(() => {
    const handler = (color: keyof RGBA, value: number) => {
      if (!imageData || !originalImageData) {
        return;
      }

      adjust_color_channel(
        imageData.data as unknown as Uint8Array,
        originalImageData.data as unknown as Uint8Array,
        color,
        value
      );

      paint(imageData);
    };

    return throttle(handler, 100);
  }, [imageData, originalImageData, paint]);

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    setRgbControlsKey(inputRef.current?.value);
    paint(imageData);
  }, [paint, imageData]);

  const loadExample = () => {
    setRgbControlsKey(shrek.src);
    loadImageFromUrl(shrek.src);

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <main className="h-full flex-col md:flex-row flex gap-2 p-5">
      <div className="flex flex-col gap-2">
        <RgbControls
          key={rgbControlsKey}
          disabled={!imageData}
          onChange={onControlsChange}
          onReset={onControlsReset}
        />

        <div className="text-slate-900 flex flex-col gap-2">
          <input type="file" ref={inputRef} accept="image/*" />
          or
          <div>
            <button
              type="button"
              onClick={loadExample}
              className="bg-green-600 hover:bg-green-700 active:bg-green-800 text-white py-2 px-4 rounded"
            >
              Load example
            </button>
          </div>
        </div>
      </div>

      <div>
        <canvas className="w-[100%] max-h-[100%]" ref={canvasRef}></canvas>
      </div>
    </main>
  );
}
