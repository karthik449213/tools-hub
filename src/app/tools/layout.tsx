import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Online Tools | Tools Hub',
  description:
    'Explore our collection of free, powerful online tools for file conversion, compression, and manipulation. No registration required.',
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}
