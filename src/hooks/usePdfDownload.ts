import { generateSignedPDF } from '../utils/pdfUtils';

interface SignaturePosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const usePdfDownload = () => {
  const downloadSignedPDF = async (
    pdfFile: string,
    signatureFile: string | null,
    signaturePosition: SignaturePosition,
    currentPage: number
  ) => {
    try {
      await generateSignedPDF(pdfFile, signatureFile, signaturePosition, currentPage);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      throw error;
    }
  };

  return { downloadSignedPDF };
};