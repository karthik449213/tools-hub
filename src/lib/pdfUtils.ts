import { PDFDocument } from 'pdf-lib';
import { Document, Packer, Paragraph, TextRun } from 'docx';

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
  const pdfjsLib = (await import('pdfjs-dist')).default;
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
