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

        const { data: originalData } = imageData;

        const writableCopy = context.createImageData(image.width, image.height);

        const data = new Uint8ClampedArray(originalData);

        writableCopy.data.set(data);
        setImageData(writableCopy);
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

  return { originalImageData: getClone(), imageData: clonedImageData };
}
