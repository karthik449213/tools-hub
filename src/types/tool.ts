export interface Tool {
  id: string;
  name: string;
  description: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  category?: 'Image' | 'PDF' | 'Video' | 'Document' | 'Other';
}
