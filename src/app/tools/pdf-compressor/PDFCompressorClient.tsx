'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, Download, FileText, X, Archive } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { compressPDF } from '@/lib/pdfUtils';
import { downloadFile } from '@/lib/fileUtils';

export default function PDFCompressorClient() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressionLevel, setCompressionLevel] = useState<'low' | 'medium' | 'high'>('medium');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    }
  };

  const handleCompress = async () => {
    if (!selectedFile) return;

    setIsCompressing(true);
    try {
      const compressedPdfBytes = await compressPDF(selectedFile, compressionLevel);
      const blob = new Blob([compressedPdfBytes as any], { type: 'application/pdf' });
      downloadFile(blob, `compressed-${selectedFile.name}`);
    } catch (error) {
      console.error('PDF compression failed:', error);
      alert('Failed to compress PDF. Please try again.');
    } finally {
      setIsCompressing(false);
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
        <h1 className="text-3xl font-bold mb-4">PDF Compressor</h1>
        <p className="text-muted-foreground">
          Reduce PDF file size while maintaining quality
        </p>
      </motion.div>

      <Card className="mb-8 border-2 border-black">
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
            >
              <Upload className="h-4 w-4 mr-2" />
              Choose PDF File
            </Button>
            <p className="text-sm text-muted-foreground">
              Select a PDF file to compress
            </p>
          </div>
        </CardContent>
      </Card>

      {selectedFile && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Selected File</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg mb-4">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{selectedFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatFileSize(selectedFile.size)}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedFile(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Compression Level</label>
              <select
                value={compressionLevel}
                onChange={(e) => setCompressionLevel(e.target.value as 'low' | 'medium' | 'high')}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="low">Low (Better Quality)</option>
                <option value="medium">Medium (Balanced)</option>
                <option value="high">High (Smaller Size)</option>
              </select>
            </div>

            <div className="text-center">
              <Button
                onClick={handleCompress}
                disabled={isCompressing}
                size="lg"
              >
                <Archive className="h-4 w-4 mr-2" />
                {isCompressing ? 'Compressing PDF...' : 'Compress PDF'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
