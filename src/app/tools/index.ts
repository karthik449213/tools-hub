import { Tool } from '@/types/tool';
import { Archive, Shuffle, FileText, Video } from 'lucide-react';

export const tools: Tool[] = [
  {
    id: 'compressor',
    name: 'Image Compressor',
    description: 'Compress images instantly to reduce file size',
    path: '/tools/image-compressor',
    icon: Archive,
  },
  {
    id: 'converter',
    name: 'Image Converter',
    description: 'Convert between PNG, JPG, and WebP formats',
    path: '/tools/image-converter',
    icon: Shuffle,
  },
  {
    id: 'pdf-merger',
    name: 'PDF Merger',
    description: 'Combine multiple PDF files into one document',
    path: '/tools/pdf-merger',
    icon: FileText,
  },
  {
    id: 'video-converter',
    name: 'Media Converter',
    description: 'Convert videos and audio between different formats',
    path: '/tools/video-converter',
    icon: Video,
  },
];
