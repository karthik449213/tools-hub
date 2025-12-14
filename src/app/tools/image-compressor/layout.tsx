import { createToolMetadata } from '../toolMetadata';

export const metadata = createToolMetadata('imageCompressor');

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
