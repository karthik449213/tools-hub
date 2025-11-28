'use client';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, Download, FileText, X, ArrowRightLeft, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { convertPDFToImages, convertImagesToPDF } from '@/lib/pdfUtils';
import { downloadFile } from '@/lib/fileUtils';

export default function PDFImageConverter() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [conversionMode, setConversionMode] = useState<'pdf-to-images' | 'images-to-pdf'>('pdf-to-images');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      if (conversionMode === 'pdf-to-images') {
        if (files.length === 1 && files[0].type === 'application/pdf') {
          setSelectedFiles(files);
        }
      } else {
        const validFiles = files.filter(file => file.type.startsWith('image/'));
        if (validFiles.length > 0) {
          setSelectedFiles(validFiles);
        }
      }
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleConvert = async () => {
    if (selectedFiles.length === 0) return;

    setIsConverting(true);
    try {
      if (conversionMode === 'pdf-to-images') {
        const images = await convertPDFToImages(selectedFiles[0]);
        // Download each image
        images.forEach((blob, index) => {
          downloadFile(blob, `page_${index + 1}.png`);
        });
      } else {
        const pdfBytes = await convertImagesToPDF(selectedFiles);
        const buffer = pdfBytes.buffer.slice(pdfBytes.byteOffset, pdfBytes.byteOffset + pdfBytes.byteLength) as ArrayBuffer;
        const blob = new Blob([buffer], { type: 'application/pdf' });
        downloadFile(blob, 'converted.pdf');
      }
    } catch (error) {
      console.error(`${conversionMode === 'pdf-to-images' ? 'PDF to Images' : 'Images to PDF'} conversion failed:`, error);
      alert(`Failed to convert ${conversionMode === 'pdf-to-images' ? 'PDF to Images' : 'Images to PDF'}. Please try again.`);
    } finally {
      setIsConverting(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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
        <h1 className="text-3xl font-bold mb-4">PDF & Image Converter</h1>
        <p className="text-muted-foreground">
          Convert PDF files to images and vice versa
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
                <ArrowRightLeft className="h-5 w-5" />
                Conversion Mode
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 justify-center">
                <Button
                  variant={conversionMode === 'pdf-to-images' ? 'default' : 'outline'}
                  onClick={() => {
                    setConversionMode('pdf-to-images');
                    setSelectedFiles([]);
                  }}
                >
                  PDF to Images
                </Button>
                <Button
                  variant={conversionMode === 'images-to-pdf' ? 'default' : 'outline'}
                  onClick={() => {
                    setConversionMode('images-to-pdf');
                    setSelectedFiles([]);
                  }}
                >
                  Images to PDF
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload {conversionMode === 'pdf-to-images' ? 'PDF' : 'Image'} Files
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={conversionMode === 'pdf-to-images' ? 'application/pdf' : 'image/*'}
                  multiple={conversionMode === 'images-to-pdf'}
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="mb-4"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Choose {conversionMode === 'pdf-to-images' ? 'PDF' : 'Image'} Files
                </Button>
                <p className="text-sm text-muted-foreground">
                  Select {conversionMode === 'pdf-to-images' ? 'a PDF file' : 'image files'} to convert to {conversionMode === 'pdf-to-images' ? 'images' : 'PDF'}
                </p>
              </div>
            </CardContent>
          </Card>

          {selectedFiles.length > 0 && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Selected Files</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg mb-2">
                    <div className="flex items-center gap-3">
                      {conversionMode === 'pdf-to-images' ? (
                        <FileText className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ImageIcon className="h-5 w-5 text-muted-foreground" />
                      )}
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

                <div className="mt-6 text-center">
                  <Button
                    onClick={handleConvert}
                    disabled={isConverting}
                    size="lg"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    {isConverting ? 'Converting...' : `Convert to ${conversionMode === 'pdf-to-images' ? 'Images' : 'PDF'}`}
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
