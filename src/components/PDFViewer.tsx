import React, { useState, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import SignatureOverlay from "./SignatureOverlay";
import ToolBar from "./ToolBar";
import PageNavigation from "./PageNavigation";
import { useFileUpload } from "../hooks/useFileUpload";
import { usePdfDownload } from "../hooks/usePdfDownload";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const PDFViewer = () => {
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [signaturePosition, setSignaturePosition] = useState({ x: 0, y: 0 });
  const [signatureSize, setSignatureSize] = useState({
    width: 200,
    height: 100,
  });

  const { file: pdfFile, handleFileUpload: handlePDFUpload } =
    useFileUpload(".pdf");
  const { file: signatureFile, handleFileUpload: handleSignatureUpload } =
    useFileUpload("image/*");
  const { downloadSignedPDF } = usePdfDownload();

  const handleDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const handleDownload = async () => {
    try {
      if (!pdfFile) {
        alert("Please upload a PDF first");
        return;
      }

      await downloadSignedPDF(
        pdfFile,
        signatureFile,
        {
          ...signaturePosition,
          ...signatureSize,
        },
        currentPage,
      );
    } catch (error) {
      alert("Error downloading the signed PDF. Please try again.");
    }
  };

  const handlePositionChange = useCallback(
    (position: { x: number; y: number }) => {
      setSignaturePosition(position);
    },
    [],
  );

  const handleSizeChange = useCallback(
    (size: { width: number; height: number }) => {
      setSignatureSize(size);
    },
    [],
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <ToolBar
          onPDFUpload={handlePDFUpload}
          onSignatureUpload={handleSignatureUpload}
          onDownload={handleDownload}
        />

        <div className="relative border rounded-lg mt-6">
          {pdfFile && (
            <Document
              file={pdfFile}
              onLoadSuccess={handleDocumentLoadSuccess}
              className="flex justify-center"
            >
              <div className="relative">
                <Page pageNumber={currentPage} />
                {signatureFile && (
                  <SignatureOverlay
                    signatureUrl={signatureFile}
                    onPositionChange={handlePositionChange}
                    onSizeChange={handleSizeChange}
                  />
                )}
              </div>
            </Document>
          )}
        </div>

        {numPages > 1 && (
          <PageNavigation
            currentPage={currentPage}
            numPages={numPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default PDFViewer;
