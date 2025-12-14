import { createToolMetadata } from '../toolMetadata';

export const metadata = createToolMetadata('pdfMerger');

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
