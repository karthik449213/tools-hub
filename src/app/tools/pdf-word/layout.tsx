import { createToolMetadata } from '../toolMetadata';

export const metadata = createToolMetadata('pdfWord');

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
