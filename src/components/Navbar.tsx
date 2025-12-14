import Link from 'next/link';
import { Wrench } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <Link href="/" className="flex items-center space-x-2">
          <Wrench className="h-6 w-6" />
          <span className="text-xl font-bold">Free Convertm</span>
        </Link>
      </div>
    </nav>
  );
}
