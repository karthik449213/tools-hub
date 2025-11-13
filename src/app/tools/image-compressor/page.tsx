'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, Download, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { compressImage } from '@/lib/imageUtils';
import { downloadFile } from '@/lib/fileUtils';

export default function ImageCompressor() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [isCompressing, setIsCompressing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setOriginalSize(file.size);
    const reader = new FileReader();
    reader.onload = (e) => {
      setOriginalImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    setIsCompressing(true);
    try {
      const compressedFile = await compressImage(file);
      setCompressedSize(compressedFile.size);

      const compressedReader = new FileReader();
      compressedReader.onload = (e) => {
        setCompressedImage(e.target?.result as string);
      };
      compressedReader.readAsDataURL(compressedFile);
    } catch (error) {
      console.error('Compression failed:', error);
    } finally {
      setIsCompressing(false);
    }
  };

  const handleDownload = () => {
    if (!compressedImage) return;

    // Convert base64 to blob
    const base64Data = compressedImage.split(',')[1];
    const mimeType = compressedImage.split(',')[0].split(':')[1].split(';')[0];
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });

    downloadFile(blob, 'compressed-image.jpg');
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
        <h1 className="text-3xl font-bold mb-4">Image Compressor</h1>
        <p className="text-muted-foreground">
          Compress your images to reduce file size while maintaining quality
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
              Upload Image
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="mb-4"
              >
                <Upload className="h-4 w-4 mr-2" />
                Choose Image
              </Button>
              <p className="text-sm text-muted-foreground">
                Supports JPG, PNG, WebP formats
              </p>
            </div>
          </CardContent>
        </Card>

        {originalImage && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5" />
                  Original Image
                </CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src={originalImage}
                  alt="Original"
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <p className="text-sm text-muted-foreground">
                  Size: {formatFileSize(originalSize)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5" />
                  Compressed Image
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isCompressing ? (
                  <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Compressing...</p>
                  </div>
                ) : compressedImage ? (
                  <>
                    <img
                      src={compressedImage}
                      alt="Compressed"
                      className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                    <div className="flex justify-between items-center mb-4">
                      <p className="text-sm text-muted-foreground">
                        Size: {formatFileSize(compressedSize)}
                      </p>
                      <p className="text-sm font-medium text-green-600">
                        Saved: {formatFileSize(originalSize - compressedSize)}
                      </p>
                    </div>
                    <Button onClick={handleDownload} className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download Compressed Image
                    </Button>
                  </>
                ) : (
                  <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">No compressed image yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
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
