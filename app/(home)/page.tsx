'use client';
import { Header } from './Header';
import { Tunnel } from './Tunnel';

export default function CV() {
  return (
    <main className="h-full flex flex-col">
      <Header />
      <Tunnel />
    </main>
  );
}
