import { createToolMetadata } from '../toolMetadata';

export const metadata = createToolMetadata('imageConverter');

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
