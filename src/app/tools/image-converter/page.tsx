'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, Download, Shuffle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { convertImageFormat } from '@/lib/imageUtils';
import { downloadFile } from '@/lib/fileUtils';

export default function ImageConverter() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [convertedImage, setConvertedImage] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<'png' | 'jpg' | 'webp'>('png');
  const [isConverting, setIsConverting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setOriginalImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleConvert = async () => {
    if (!originalImage) return;

    setIsConverting(true);
    try {
      // Convert base64 to blob
      const base64Data = originalImage.split(',')[1];
      const mimeType = originalImage.split(',')[0].split(':')[1].split(';')[0];
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const originalBlob = new Blob([byteArray], { type: mimeType });

      const convertedBlob = await convertImageFormat(originalBlob, selectedFormat);
      const convertedUrl = URL.createObjectURL(convertedBlob);
      setConvertedImage(convertedUrl);
    } catch (error) {
      console.error('Conversion failed:', error);
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = () => {
    if (!convertedImage) return;

    // Fetch the blob from the URL
    fetch(convertedImage)
      .then(response => response.blob())
      .then(blob => {
        downloadFile(blob, `converted-image.${selectedFormat}`);
      });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold mb-4">Image Converter</h1>
        <p className="text-muted-foreground">
          Convert images between different formats (PNG, JPG, WebP)
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
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
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Conversion Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="flex gap-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="png"
                      checked={selectedFormat === 'png'}
                      onChange={(e) => setSelectedFormat(e.target.value as 'png')}
                      className="mr-2"
                    />
                    PNG
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="jpg"
                      checked={selectedFormat === 'jpg'}
                      onChange={(e) => setSelectedFormat(e.target.value as 'jpg')}
                      className="mr-2"
                    />
                    JPG
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="webp"
                      checked={selectedFormat === 'webp'}
                      onChange={(e) => setSelectedFormat(e.target.value as 'webp')}
                      className="mr-2"
                    />
                    WebP
                  </label>
                </div>
                <Button onClick={handleConvert} disabled={isConverting}>
                  <Shuffle className="h-4 w-4 mr-2" />
                  {isConverting ? 'Converting...' : 'Convert Image'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {originalImage && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Original Image</CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src={originalImage}
                  alt="Original"
                  className="w-full h-64 object-cover rounded-lg"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Converted Image</CardTitle>
              </CardHeader>
              <CardContent>
                {isConverting ? (
                  <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Converting...</p>
                  </div>
                ) : convertedImage ? (
                  <>
                    <img
                      src={convertedImage}
                      alt="Converted"
                      className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                    <Button onClick={handleDownload} className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download Converted Image
                    </Button>
                  </>
                ) : (
                  <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Converted image will appear here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
