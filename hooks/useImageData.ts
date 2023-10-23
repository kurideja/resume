import { RefObject, useCallback, useEffect, useState } from 'react';

export function useImageData(ref: RefObject<HTMLInputElement>) {
  const [imageData, setImageData] = useState<ImageData>();

  const onChange: EventListener = useCallback(() => {
    const file = ref.current?.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
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

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

        setImageData(imageData);
      };

      image.src = e.target!.result as string;
    };

    reader.readAsDataURL(file);
  }, [ref]);

  useEffect(() => {
    const input = ref.current;

    if (!input) {
      return;
    }

    input.addEventListener('change', onChange);

    return () => input.removeEventListener('change', onChange);
  }, [ref, onChange]);

  return imageData;
}
