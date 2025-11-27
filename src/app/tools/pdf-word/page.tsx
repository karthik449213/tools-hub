'use client';
import { useState,useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, Download, FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { convertPDFToWord } from '@/lib/pdfUtils';
import { downloadFile } from '@/lib/fileUtils';

export default function PDFToWord() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  const handleConvert = async () => {
    if (!selectedFile) return;

    setIsConverting(true);
    try {
      const wordBytes = await convertPDFToWord(selectedFile);
      const buffer = wordBytes.buffer.slice(wordBytes.byteOffset, wordBytes.byteOffset + wordBytes.byteLength) as ArrayBuffer;
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      const fileName = selectedFile.name.replace('.pdf', '.docx');
      downloadFile(blob, fileName);
    } catch (error) {
      console.error('PDF to Word conversion failed:', error);
      alert('Failed to convert PDF to Word. Please try again.');
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
        <h1 className="text-3xl font-bold mb-4">PDF to Word Converter</h1>
        <p className="text-muted-foreground">
          Convert PDF files to editable Word documents
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
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Choose PDF File
                </Button>
                <p className="text-sm text-muted-foreground">
                  Select a PDF file to convert to Word
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
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
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
                    onClick={removeFile}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="mt-6 text-center">
                  <Button
                    onClick={handleConvert}
                    disabled={isConverting}
                    size="lg"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    {isConverting ? 'Converting...' : 'Convert to Word'}
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
