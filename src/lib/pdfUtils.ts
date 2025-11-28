import { PDFDocument, StandardFonts } from 'pdf-lib';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import * as mammoth from 'mammoth';

export const mergePDFs = async (files: File[]): Promise<Uint8Array> => {
  const mergedPdf = await PDFDocument.create();

  for (const file of files) {
    const pdfBytes = await file.arrayBuffer();
    const pdf = await PDFDocument.load(pdfBytes);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  const mergedPdfBytes = await mergedPdf.save();
  return mergedPdfBytes;
};

export const convertPDFToWord = async (file: File): Promise<Uint8Array> => {
  // Dynamically import pdfjs to avoid SSR issues
  const pdfjsLib = await import('pdfjs-dist');
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  const paragraphs: Paragraph[] = [];

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const textContent = await page.getTextContent();
    const textItems = textContent.items as any[];

    let pageText = '';
    for (const item of textItems) {
      pageText += item.str + ' ';
    }

    paragraphs.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `Page ${pageNum}`,
            bold: true,
            size: 24,
          }),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: pageText.trim(),
            size: 24,
          }),
        ],
      }),
      new Paragraph({
        children: [],
      }) // Empty paragraph for spacing
    );
  }

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: paragraphs,
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  return buffer;
};

export const convertWordToPDF = async (file: File): Promise<Uint8Array> => {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  const text = result.value;

  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  let page = pdfDoc.addPage();
  const { width, height } = page.getSize();

  const fontSize = 12;
  const lines = text.split('\n');
  let y = height - 50;

  for (const line of lines) {
    if (y < 50) {
      page = pdfDoc.addPage();
      y = height - 50;
    }
    page.drawText(line, {
      x: 50,
      y: y,
      size: fontSize,
      font,
    });
    y -= fontSize + 5;
  }

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
};

export const compressPDF = async (file: File, level: 'low' | 'medium' | 'high'): Promise<Uint8Array> => {
  const pdfBytes = await file.arrayBuffer();
  const pdf = await PDFDocument.load(pdfBytes);

  let options: any = { useObjectStreams: true };

  if (level === 'medium') {
    options.objectsPerTick = 100;
  } else if (level === 'high') {
    options.objectsPerTick = 50;
    // Additional compression options can be added here if available
  }

  const compressedPdfBytes = await pdf.save(options);
  return compressedPdfBytes;
};

export const reorderPDF = async (file: File, pageOrder: number[]): Promise<Uint8Array> => {
  const pdfBytes = await file.arrayBuffer();
  const pdf = await PDFDocument.load(pdfBytes);

  const reorderedPdf = await PDFDocument.create();

  for (const pageIndex of pageOrder) {
    const [copiedPage] = await reorderedPdf.copyPages(pdf, [pageIndex]);
    reorderedPdf.addPage(copiedPage);
  }

  const reorderedPdfBytes = await reorderedPdf.save();
  return reorderedPdfBytes;
};

export const convertPDFToImages = async (file: File): Promise<Blob[]> => {
  // Dynamically import pdfjs to avoid SSR issues
  const pdfjsLib = await import('pdfjs-dist');
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  const images: Blob[] = [];

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale: 2.0 }); // Higher scale for better quality

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Unable to get canvas context');

    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext = {
      canvasContext: context,
      viewport: viewport,
      canvas: canvas,
    };

    await page.render(renderContext).promise;

    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, 'image/png');
    });

    if (blob) {
      images.push(blob);
    }
  }

  return images;
};

export const convertImagesToPDF = async (files: File[]): Promise<Uint8Array> => {
  const pdfDoc = await PDFDocument.create();

  for (const file of files) {
    const imageBytes = await file.arrayBuffer();
    let image;

    if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
      image = await pdfDoc.embedJpg(imageBytes);
    } else if (file.type === 'image/png') {
      image = await pdfDoc.embedPng(imageBytes);
    } else {
      throw new Error(`Unsupported image type: ${file.type}`);
    }

    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();

    // Calculate dimensions to fit the image on the page while maintaining aspect ratio
    const imageAspectRatio = image.width / image.height;
    const pageAspectRatio = width / height;

    let drawWidth, drawHeight, x, y;

    if (imageAspectRatio > pageAspectRatio) {
      // Image is wider than page
      drawWidth = width;
      drawHeight = width / imageAspectRatio;
      x = 0;
      y = (height - drawHeight) / 2;
    } else {
      // Image is taller than page
      drawHeight = height;
      drawWidth = height * imageAspectRatio;
      x = (width - drawWidth) / 2;
      y = 0;
    }

    page.drawImage(image, {
      x,
      y,
      width: drawWidth,
      height: drawHeight,
    });
  }

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
};
