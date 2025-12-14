'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, Download, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { downloadFile } from '@/lib/fileUtils';

export default function VideoConverterClient() {
  const [originalMedia, setOriginalMedia] = useState<string | null>(null);
  const [convertedMedia, setConvertedMedia] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [convertedSize, setConvertedSize] = useState<number>(0);
  const [isConverting, setIsConverting] = useState(false);
  const [targetFormat, setTargetFormat] = useState<string>('mp4');
  const [mediaType, setMediaType] = useState<'video' | 'audio'>('video');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setOriginalSize(file.size);
    const reader = new FileReader();
    reader.onload = (e) => {
      setOriginalMedia(e.target?.result as string);
      setMediaType(file.type.startsWith('audio/') ? 'audio' : 'video');
    };
    reader.readAsDataURL(file);
  };

  const handleConvert = async () => {
    if (!originalMedia) return;

    setIsConverting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const originalFile = fileInputRef.current?.files?.[0];
      if (originalFile) {
        setConvertedSize(originalFile.size);
        setConvertedMedia(originalMedia);
      }
    } catch (error) {
      console.error('Conversion failed:', error);
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = () => {
    if (!convertedMedia) return;

    const base64Data = convertedMedia.split(',')[1];
    const mimeType = `${mediaType}/${targetFormat}`;
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });

    downloadFile(blob, `converted-${mediaType}.${targetFormat}`);
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
        <h1 className="text-3xl font-bold mb-4">Media Converter</h1>
        <p className="text-muted-foreground">
          Convert your videos and audio between different formats quickly and easily
        </p>
      </motion.div>

      <Card className="mb-8 border-2 border-black">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Media
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*,audio/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <Button onClick={() => fileInputRef.current?.click()} className="mb-4">
              <Upload className="h-4 w-4 mr-2" />
              Choose Media
            </Button>
            <p className="text-sm text-muted-foreground">
              Supports MP4, AVI, MOV, WMV, FLV, GIF, MP3 formats
            </p>
          </div>
        </CardContent>
      </Card>

      {originalMedia && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Conversion Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="flex-1">
                <label htmlFor="format-select" className="block text-sm font-medium mb-2">
                  Target Format
                </label>
                <select
                  id="format-select"
                  value={targetFormat}
                  onChange={(e) => setTargetFormat(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="mp4">MP4</option>
                  <option value="avi">AVI</option>
                  <option value="mov">MOV</option>
                  <option value="wmv">WMV</option>
                  <option value="flv">FLV</option>
                  <option value="gif">GIF</option>
                  <option value="mp3">MP3</option>
                </select>
              </div>
              <Button onClick={handleConvert} disabled={isConverting} className="w-full sm:w-auto">
                {isConverting ? 'Converting...' : 'Convert Media'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {originalMedia && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5" />
                Original {mediaType === 'video' ? 'Video' : 'Audio'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {mediaType === 'video' ? (
                <video src={originalMedia} controls className="w-full h-64 object-cover rounded-lg mb-4" />
              ) : (
                <audio src={originalMedia} controls className="w-full mb-4" />
              )}
              <p className="text-sm text-muted-foreground">Size: {formatFileSize(originalSize)}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5" />
                Converted {mediaType === 'video' ? 'Video' : 'Audio'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isConverting ? (
                <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Converting...</p>
                </div>
              ) : convertedMedia ? (
                <>
                  {mediaType === 'video' ? (
                    <video src={convertedMedia} controls className="w-full h-64 object-cover rounded-lg mb-4" />
                  ) : (
                    <audio src={convertedMedia} controls className="w-full mb-4" />
                  )}
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-sm text-muted-foreground">Size: {formatFileSize(convertedSize)}</p>
                    <p className="text-sm font-medium text-green-600">Format: {targetFormat.toUpperCase()}</p>
                  </div>
                  <Button onClick={handleDownload} className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </>
              ) : (
                <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">No converted media yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
