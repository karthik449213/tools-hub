import { Tool } from '@/types/tool';
import { Archive, Shuffle, FileText, Video, ArrowUpDown } from 'lucide-react';

export const tools: Tool[] = [
  {
    id: 'compressor',
    name: 'Image Compressor',
    description: 'Compress images instantly to reduce file size',
    path: '/tools/image-compressor',
    icon: Archive,
    category: 'Image',
  },
  {
    id: 'converter',
    name: 'Image Converter',
    description: 'Convert between PNG, JPG, and WebP formats',
    path: '/tools/image-converter',
    icon: Shuffle,
    category: 'Image',
  },
  {
    id: 'pdf-merger',
    name: 'PDF Merger',
    description: 'Combine multiple PDF files into one document',
    path: '/tools/pdf-merger',
    icon: FileText,
    category: 'PDF',
  },
  {
    id: 'video-converter',
    name: 'Media Converter',
    description: 'Convert videos and audio between different formats',
    path: '/tools/video-converter',
    icon: Video,
    category: 'Video',
  },
  {
    id: 'PDF converter',
    name: 'PDF Converter',
    description: 'Convert PDF between different formats',
    path: '/tools/pdf-word',
    icon: Video,
    category: 'PDF',
  },
  {
    id: 'pdf-compressor',
    name: 'PDF Compressor',
    description: 'Compress PDF files to reduce file size',
    path: '/tools/pdf-compressor',
    icon: Archive,
    category: 'PDF',
  },
  {
    id: 'pdf-organizer',
    name: 'PDF Organizer',
    description: 'Organize and reorder PDF pages',
    path: '/tools/pdf-organizer',
    icon: Archive,
    category: 'PDF',
  },
  {
    id: 'pdf-image-converter',
    name: 'PDF Image Converter',
    description: 'Convert PDF to images and images to PDF',
    path: '/tools/pdf-image-converter',
    icon: ArrowUpDown,
    category: 'PDF',
  },

];
