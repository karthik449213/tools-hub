'use client';

import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, Download, FileText, X, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { reorderPDF } from '@/lib/pdfUtils';
import { downloadFile } from '@/lib/fileUtils';

export const dynamic = 'force-dynamic';

interface PDFPage {
  index: number;
  dataUrl: string;
}

export default function PDFOrganizer() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pages, setPages] = useState<PDFPage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isReordering, setIsReordering] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || file.type !== 'application/pdf') return;

    setSelectedFile(file);
    setIsProcessing(true);

    try {
      // Dynamically import pdfjs to avoid SSR issues
      const pdfjsLib = (await import('pdfjs-dist')).default;
      pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      const pagePromises = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        pagePromises.push(renderPage(pdf, i - 1));
      }

      const renderedPages = await Promise.all(pagePromises);
      setPages(renderedPages);
    } catch (error) {
      console.error('Error loading PDF:', error);
      alert('Failed to load PDF. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const renderPage = async (pdf: any, pageIndex: number): Promise<PDFPage> => {
    const page = await pdf.getPage(pageIndex + 1);
    const scale = 0.3;
    const viewport = page.getViewport({ scale });

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d')!;
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };

    await page.render(renderContext).promise;
    const dataUrl = canvas.toDataURL('image/png');
    return { index: pageIndex, dataUrl };
  };

  const handleReorder = useCallback((dragIndex: number, hoverIndex: number) => {
    setPages((prevPages) => {
      const newPages = [...prevPages];
      const draggedPage = newPages[dragIndex];
      newPages.splice(dragIndex, 1);
      newPages.splice(hoverIndex, 0, draggedPage);
      return newPages;
    });
  }, []);

  const handleDownload = async () => {
    if (!selectedFile || pages.length === 0) return;

    setIsReordering(true);
    try {
      const pageOrder = pages.map(page => page.index);
      const reorderedPdfBytes = await reorderPDF(selectedFile, pageOrder);
      const blob = new Blob([reorderedPdfBytes as any], { type: 'application/pdf' });
      downloadFile(blob, 'reordered-document.pdf');
    } catch (error) {
      console.error('PDF reordering failed:', error);
      alert('Failed to reorder PDF. Please try again.');
    } finally {
      setIsReordering(false);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPages([]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 max-w-4xl mx-auto">
          <p className="text-gray-500">Ad Space - Top Banner (728x90 or responsive)</p>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold mb-4">PDF Organizer</h1>
        <p className="text-muted-foreground">
          Reorder pages in your PDF document by dragging and dropping
        </p>
      </motion.div>
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Ad Space */}
        <div className="hidden lg:block">
          <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-4 h-96">
            <p className="text-gray-500 text-center">Ad Space - Sidebar (300x600)</p>
          </div>
        </div>

        <div className="lg:col-span-3">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload PDF File
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="mb-4"
                  disabled={isProcessing}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {isProcessing ? 'Loading PDF...' : 'Choose PDF File'}
                </Button>
                <p className="text-sm text-muted-foreground">
                  Select a PDF file to reorder its pages
                </p>
              </div>
            </CardContent>
          </Card>

          {selectedFile && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Selected File</span>
                  <Button variant="ghost" size="sm" onClick={removeFile}>
                    <X className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{selectedFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {pages.length > 0 && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Reorder Pages ({pages.length})</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Drag and drop the pages to reorder them
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {pages.map((page, index) => (
                    <DraggablePage
                      key={page.index}
                      page={page}
                      index={index}
                      onReorder={handleReorder}
                    />
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <Button
                    onClick={handleDownload}
                    disabled={isReordering}
                    size="lg"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    {isReordering ? 'Reordering PDF...' : 'Download Reordered PDF'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Inline Ad Space */}
          <div className="mt-8 text-center">
            <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-6 max-w-4xl mx-auto">
              <p className="text-gray-500">Ad Space - Inline (responsive box ad)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface DraggablePageProps {
  page: PDFPage;
  index: number;
  onReorder: (dragIndex: number, hoverIndex: number) => void;
}

function DraggablePage({ page, index, onReorder }: DraggablePageProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
    if (dragIndex !== index) {
      onReorder(dragIndex, index);
    }
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`relative border rounded-lg p-2 cursor-move transition-opacity ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <GripVertical className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Page {index + 1}</span>
      </div>
      <div className="aspect-[3/4] overflow-hidden rounded border">
        <img src={page.dataUrl} alt={`Page ${index + 1}`} className="w-full h-full object-cover" />
      </div>
    </div>
  );
}
