'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, Download, FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mergePDFs } from '@/lib/pdfUtils';
import { downloadFile } from '@/lib/fileUtils';

export default function PDFMergerClient() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isMerging, setIsMerging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const pdfFiles = files.filter(file => file.type === 'application/pdf');
    setSelectedFiles(prev => [...prev, ...pdfFiles]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleMerge = async () => {
    if (selectedFiles.length < 2) return;

    setIsMerging(true);
    try {
      const mergedPdfBytes = await mergePDFs(selectedFiles);
      const blob = new Blob([mergedPdfBytes as any], { type: 'application/pdf' });
      downloadFile(blob, 'merged-document.pdf');
    } catch (error) {
      console.error('PDF merging failed:', error);
      alert('Failed to merge PDFs. Please try again.');
    } finally {
      setIsMerging(false);
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
        <h1 className="text-3xl font-bold mb-4">PDF Merger</h1>
        <p className="text-muted-foreground">
          Combine multiple PDF files into a single document
        </p>
      </motion.div>

      <Card className="mb-8 border-2 border-black">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload PDF Files
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="mb-4"
            >
              <Upload className="h-4 w-4 mr-2" />
              Choose PDF Files
            </Button>
            <p className="text-sm text-muted-foreground">
              Select multiple PDF files to merge them together
            </p>
          </div>
        </CardContent>
      </Card>

      {selectedFiles.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Selected Files ({selectedFiles.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {selectedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
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
            </div>

            {selectedFiles.length >= 2 && (
              <div className="mt-6 text-center">
                <Button
                  onClick={handleMerge}
                  disabled={isMerging}
                  size="lg"
                >
                  <Download className="h-4 w-4 mr-2" />
                  {isMerging ? 'Merging PDFs...' : 'Merge PDFs'}
                </Button>
              </div>
            )}

            {selectedFiles.length < 2 && (
              <p className="text-sm text-muted-foreground text-center mt-4">
                Select at least 2 PDF files to enable merging
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
}
