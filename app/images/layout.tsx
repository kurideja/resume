import { Metadata } from 'next';
import { PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: 'Playground with image manipulation',
  description: 'Experiment with image manipulation and WASM',
};

export default function ImagesLayout(props: PropsWithChildren) {
  return props.children;
}
