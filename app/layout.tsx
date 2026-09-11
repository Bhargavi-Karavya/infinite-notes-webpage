import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Perfect — Ed Sheeran | Infinite Notes',
  description: 'Read verified lyrics on Infinite Notes.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
