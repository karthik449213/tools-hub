import { createToolMetadata } from '../toolMetadata';

export const metadata = createToolMetadata('pdfImageConverter');

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
