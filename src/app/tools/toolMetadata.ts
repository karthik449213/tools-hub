import { Metadata } from 'next';

export const toolMetadata = {
  imageCompressor: {
    title: 'Free Image Compressor | Reduce Image Size Online | Tools Hub',
    description:
      'Compress images online without losing quality. Fast, free, and privacy-focused image compression tool. Works with JPG, PNG, WebP, and more.',
    keywords: ['image compressor', 'compress image', 'reduce image size', 'online image tool'],
  },
  imageConverter: {
    title: 'Image Format Converter | Convert JPG, PNG, WebP Online | Tools Hub',
    description:
      'Convert images between formats instantly. Support for JPG, PNG, WebP, GIF, BMP, and more. Free, fast, and secure conversion.',
    keywords: ['image converter', 'convert image format', 'JPG to PNG', 'image format conversion'],
  },
  pdfCompressor: {
    title: 'Free PDF Compressor | Reduce PDF File Size Online | Tools Hub',
    description:
      'Compress PDF files online with high quality. Reduce file size without losing clarity. Fast, secure, and browser-based compression.',
    keywords: ['PDF compressor', 'compress PDF', 'reduce PDF size', 'online PDF tool'],
  },
  pdfImageConverter: {
    title: 'PDF to Image & Image to PDF Converter | Tools Hub',
    description:
      'Convert PDF to images or images to PDF instantly. Support for JPG, PNG, and more. Free, fast, and secure conversion.',
    keywords: ['PDF to image', 'image to PDF', 'convert PDF', 'PDF converter'],
  },
  pdfMerger: {
    title: 'Free PDF Merger | Combine PDF Files Online | Tools Hub',
    description:
      'Merge multiple PDF files into one instantly. Simple, fast, and secure PDF merging tool. No registration required.',
    keywords: ['PDF merger', 'merge PDF', 'combine PDF', 'PDF combiner'],
  },
  pdfOrganizer: {
    title: 'PDF Organizer | Reorder, Delete & Arrange PDF Pages | Tools Hub',
    description:
      'Organize PDF files by reordering, deleting, or extracting pages. Fast and easy PDF page management tool.',
    keywords: ['PDF organizer', 'reorder PDF', 'PDF page manager', 'arrange PDF pages'],
  },
  pdfWord: {
    title: 'PDF to Word & Word to PDF Converter | Tools Hub',
    description:
      'Convert PDF documents to Word format or Word files to PDF instantly. Preserve formatting with our secure conversion tool.',
    keywords: ['PDF to Word', 'Word to PDF', 'convert PDF', 'document converter'],
  },
  videoConverter: {
    title: 'Video Format Converter | Convert MP4, WebM Online | Tools Hub',
    description:
      'Convert videos between formats instantly. Support for MP4, WebM, and more. Fast, free, and browser-based conversion.',
    keywords: ['video converter', 'convert video', 'MP4 converter', 'video format conversion'],
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
