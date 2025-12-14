import { createToolMetadata } from '../toolMetadata';

export const metadata = createToolMetadata('pdfOrganizer');

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
