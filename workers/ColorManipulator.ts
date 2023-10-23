import { ColorManipulationRequest, ColorManipulationResponse } from '@/types/colorManipulation';

const change = (original: number, range: number, initial: number) => {
  const diff = range - initial;

  return Math.max(Math.min(255, original + diff), 0);
};

addEventListener('message', async (event: MessageEvent<ColorManipulationRequest>) => {
  if (event.data.type !== 'request:manipulate-colors') {
    return;
  }

  const { red, green, blue, alpha, imageData } = event.data;
  const n = imageData.data.length;

  for (let i = 0; i < n; i += 4) {
    imageData.data[i] = change(imageData.data[i], red, 127);
    imageData.data[i + 1] = change(imageData.data[i + 1], green, 127);
    imageData.data[i + 2] = change(imageData.data[i + 2], blue, 127);
    imageData.data[i + 3] = change(imageData.data[i + 3], alpha, 255);
  }

  const response: ColorManipulationResponse = { type: 'response:manipulate-colors', imageData };

  postMessage(response);
});
