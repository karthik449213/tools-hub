import { createToolMetadata } from '../toolMetadata';

export const metadata = createToolMetadata('pdfCompressor');

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
