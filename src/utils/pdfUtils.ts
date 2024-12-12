import { PDFDocument } from "pdf-lib";

interface SignaturePosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const generateSignedPDF = async (
  pdfFile: string,
  signatureFile: string | null,
  signaturePosition: SignaturePosition,
  currentPage: number,
): Promise<void> => {
  try {
    const pdfBytes = await fetch(pdfFile).then((res) => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(pdfBytes);

    if (signatureFile && signaturePosition) {
      const imgBytes = await fetch(signatureFile).then((res) =>
        res.arrayBuffer(),
      );

      const img = await pdfDoc.embedPng(imgBytes);

      if (!img) {
        console.error("Error embedding image");
        return;
      }

      const page = pdfDoc.getPages()[currentPage - 1];
      const pageHeight = page.getHeight();
      const pageWidth = page.getWidth();

      const adjustedY =
        pageHeight -
        signaturePosition.y -
        signaturePosition.height -
        pageHeight;

      const scaleFactor = Math.min(
        signaturePosition.width / img.width,
        signaturePosition.height / img.height,
      );

      page.drawImage(img, {
        x: signaturePosition.x,
        y: adjustedY,
        width: img.width * scaleFactor,
        height: img.height * scaleFactor,
      });

      console.log(signaturePosition, adjustedY, pageHeight);
    }

    const signedPdfBytes = await pdfDoc.save();

    const blob = new Blob([signedPdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "signed-document.pdf";
    a.click();
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
};

