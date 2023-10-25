import { RefObject, useCallback, useEffect, useState } from 'react';

export function useImageData(ref: RefObject<HTMLInputElement>) {
  const [imageData, setImageData] = useState<ImageData>();
  const [clonedImageData, setClonedImageData] = useState<ImageData>();

  const getClone = useCallback(() => {
    return (
      imageData &&
      new ImageData(new Uint8ClampedArray(imageData.data), imageData.width, imageData.height)
    );
  }, [imageData]);

  useEffect(() => {
    setClonedImageData(getClone());
  }, [getClone, setImageData]);

  const onChange: EventListener = useCallback(() => {
    const file = ref.current?.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => loadImage(e.target!.result as string);

    reader.readAsDataURL(file);
  }, [ref]);

  const loadImage = (src: string) => {
    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      if (!context) {
        return;
      }

      canvas.width = image.width;
      canvas.height = image.height;

      context.drawImage(image, 0, 0);

      const imageDataFromContext = context.getImageData(0, 0, canvas.width, canvas.height);

      setImageData(imageDataFromContext);
    };

    image.src = src;
  };

  useEffect(() => {
    const input = ref.current;

    if (!input) {
      return;
    }

    input.addEventListener('change', onChange);

    return () => input.removeEventListener('change', onChange);
  }, [ref, onChange]);

  const reset = () => {
    setClonedImageData(getClone());
  };

  return {
    originalImageData: getClone(),
    imageData: clonedImageData,
    reset,
    loadImageFromUrl: loadImage,
  };
}
