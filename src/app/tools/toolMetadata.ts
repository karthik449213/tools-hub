import { Metadata } from 'next';

export const toolMetadata = {
  imageCompressor: {
    title: 'Free Image Compressor | Reduce Image Size | Tools Herd',
    description:
      'Compress images online without losing quality. Fast, free, and privacy-focused. Reduce JPG, PNG, WebP size instantly in your browser.',
    keywords: ['image compressor', 'compress image', 'reduce image size', 'JPG compressor', 'PNG compressor', 'free image tool', 'Tools Herd'],
  },
  imageConverter: {
    title: 'Image Format Converter | Convert JPG, PNG, WebP | Tools Herd',
    description:
      'Convert images between formats instantly. Support for JPG, PNG, WebP, GIF, BMP. Fast, free, secure conversion powered by Tools Herd.',
    keywords: ['image converter', 'convert image format', 'JPG to PNG', 'image format conversion', 'convert images', 'Tools Herd'],
  },
  pdfCompressor: {
    title: 'Free PDF Compressor | Reduce PDF Size Online | Tools Herd',
    description:
      'Compress PDF files online without losing quality. Fast, secure, browser-based compression. Reduce file size instantly with Tools Herd.',
    keywords: ['PDF compressor', 'compress PDF', 'reduce PDF size', 'free PDF tool', 'PDF compression', 'Tools Herd'],
  },
  pdfImageConverter: {
    title: 'PDF to Image Converter | Convert Images to PDF | Tools Herd',
    description:
      'Convert PDF to images or images to PDF instantly. Support for JPG, PNG, and more. Free, fast, and secure with Tools Herd.',
    keywords: ['PDF to image', 'image to PDF', 'convert PDF', 'PDF converter', 'image converter', 'Tools Herd'],
  },
  pdfMerger: {
    title: 'Free PDF Merger | Combine PDF Files Online | Tools Herd',
    description:
      'Merge multiple PDF files into one instantly. Simple, fast, and secure PDF merging. No registration required with Tools Herd.',
    keywords: ['PDF merger', 'merge PDF', 'combine PDF', 'PDF combiner', 'join PDF', 'Tools Herd'],
  },
  pdfOrganizer: {
    title: 'PDF Organizer | Reorder, Delete & Arrange Pages | Tools Herd',
    description:
      'Organize PDF files by reordering, deleting, or extracting pages. Fast and easy PDF page management with Tools Herd.',
    keywords: ['PDF organizer', 'reorder PDF', 'PDF page manager', 'arrange PDF pages', 'delete PDF pages', 'Tools Herd'],
  },
  pdfWord: {
    title: 'PDF to Word & Word to PDF Converter | Tools Herd',
    description:
      'Convert PDF documents to Word format or Word files to PDF instantly. Preserve formatting with secure conversion by Tools Herd.',
    keywords: ['PDF to Word', 'Word to PDF', 'convert PDF', 'document converter', 'DOCX converter', 'Tools Herd'],
  },
  videoConverter: {
    title: 'Video Format Converter | Convert MP4, WebM Online | Tools Herd',
    description:
      'Convert videos between formats instantly. Support for MP4, WebM, and more. Fast, free, browser-based conversion with Tools Herd.',
    keywords: ['video converter', 'convert video', 'MP4 converter', 'video format conversion', 'WebM converter', 'Tools Herd'],
  },
};

export const createToolMetadata = (key: keyof typeof toolMetadata): Metadata => {
  const data = toolMetadata[key];
  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://toolshub.example.com',
      title: data.title,
      description: data.description,
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
};
