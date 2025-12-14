'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, Download, FileText, X, ArrowRightLeft, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { convertPDFToImages, convertImagesToPDF } from '@/lib/pdfUtils';
import { downloadFile } from '@/lib/fileUtils';

export default function PDFImageConverterClient() {
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
      alert(`Failed to convert. Please try again.`);
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
    <>
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

      <Card className="mb-8 border-2 border-black">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowRightLeft className="h-5 w-5" />
            Conversion Mode
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 flex-wrap">
            <label className="flex items-center">
              <input
                type="radio"
                value="pdf-to-images"
                checked={conversionMode === 'pdf-to-images'}
                onChange={(e) => {
                  setConversionMode(e.target.value as 'pdf-to-images');
                  setSelectedFiles([]);
                }}
                className="mr-2"
              />
              PDF to Images
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="images-to-pdf"
                checked={conversionMode === 'images-to-pdf'}
                onChange={(e) => {
                  setConversionMode(e.target.value as 'images-to-pdf');
                  setSelectedFiles([]);
                }}
                className="mr-2"
              />
              Images to PDF
            </label>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8 border-2 border-black">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Files
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
            <Button onClick={() => fileInputRef.current?.click()} className="mb-4">
              <Upload className="h-4 w-4 mr-2" />
              Choose {conversionMode === 'pdf-to-images' ? 'PDF' : 'Image'} Files
            </Button>
          </div>
        </CardContent>
      </Card>

      {selectedFiles.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Selected Files</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-4">
              {selectedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    {conversionMode === 'pdf-to-images' ? (
                      <FileText className="h-5 w-5" />
                    ) : (
                      <ImageIcon className="h-5 w-5" />
                    )}
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => removeFile(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <Button onClick={handleConvert} disabled={isConverting} className="w-full" size="lg">
              <Download className="h-4 w-4 mr-2" />
              {isConverting ? 'Converting...' : 'Convert Files'}
            </Button>
          </CardContent>
        </Card>
      )}
    </>
  );
}
