'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, Download, FileText, X, ArrowRightLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { convertPDFToWord, convertWordToPDF } from '@/lib/pdfUtils';
import { downloadFile } from '@/lib/fileUtils';

export default function PDFWordClient() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [conversionMode, setConversionMode] = useState<'pdf-to-word' | 'word-to-pdf'>('pdf-to-word');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (conversionMode === 'pdf-to-word' && file.type === 'application/pdf') {
        setSelectedFile(file);
      } else if (conversionMode === 'word-to-pdf' && file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setSelectedFile(file);
      }
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  const handleConvert = async () => {
    if (!selectedFile) return;

    setIsConverting(true);
    try {
      let resultBytes: Uint8Array;
      let blobType: string;
      let fileName: string;

      if (conversionMode === 'pdf-to-word') {
        resultBytes = await convertPDFToWord(selectedFile);
        blobType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        fileName = selectedFile.name.replace('.pdf', '.docx');
      } else {
        resultBytes = await convertWordToPDF(selectedFile);
        blobType = 'application/pdf';
        fileName = selectedFile.name.replace('.docx', '.pdf');
      }

      const buffer = resultBytes.buffer.slice(resultBytes.byteOffset, resultBytes.byteOffset + resultBytes.byteLength) as ArrayBuffer;
      const blob = new Blob([buffer], { type: blobType });
      downloadFile(blob, fileName);
    } catch (error) {
      console.error(`Conversion failed:`, error);
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
        <h1 className="text-3xl font-bold mb-4">PDF & Word Converter</h1>
        <p className="text-muted-foreground">
          Convert PDF files to editable Word documents and vice versa
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
          <div className="flex gap-4 justify-center">
            <Button
              variant={conversionMode === 'pdf-to-word' ? 'default' : 'outline'}
              onClick={() => {
                setConversionMode('pdf-to-word');
                setSelectedFile(null);
              }}
            >
              PDF to Word
            </Button>
            <Button
              variant={conversionMode === 'word-to-pdf' ? 'default' : 'outline'}
              onClick={() => {
                setConversionMode('word-to-pdf');
                setSelectedFile(null);
              }}
            >
              Word to PDF
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload File
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <input
              ref={fileInputRef}
              type="file"
              accept={conversionMode === 'pdf-to-word' ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'}
              onChange={handleFileSelect}
              className="hidden"
            />
            <Button onClick={() => fileInputRef.current?.click()} className="mb-4">
              <Upload className="h-4 w-4 mr-2" />
              Choose {conversionMode === 'pdf-to-word' ? 'PDF' : 'Word'} File
            </Button>
            <p className="text-sm text-muted-foreground">
              Select a {conversionMode === 'pdf-to-word' ? 'PDF' : 'Word'} file to convert
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
                  <p className="text-sm text-muted-foreground">{formatFileSize(selectedFile.size)}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={removeFile}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <Button onClick={handleConvert} disabled={isConverting} size="lg" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              {isConverting ? 'Converting...' : `Convert to ${conversionMode === 'pdf-to-word' ? 'Word' : 'PDF'}`}
            </Button>
          </CardContent>
        </Card>
      )}
    </>
  );
}
