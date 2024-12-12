import React from 'react';
import { Upload, Download } from 'lucide-react';

interface ToolBarProps {
  onPDFUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSignatureUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDownload: () => void;
}

const ToolBar: React.FC<ToolBarProps> = ({
  onPDFUpload,
  onSignatureUpload,
  onDownload,
}) => {
  return (
    <div className="flex gap-4">
      <label className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition-colors">
        <Upload size={20} />
        Upload PDF
        <input
          type="file"
          accept=".pdf"
          onChange={onPDFUpload}
          className="hidden"
        />
      </label>
      <label className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg cursor-pointer hover:bg-green-600 transition-colors">
        <Upload size={20} />
        Upload Signature
        <input
          type="file"
          accept="image/*"
          onChange={onSignatureUpload}
          className="hidden"
        />
      </label>
      <button
        onClick={onDownload}
        className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
      >
        <Download size={20} />
        Download
      </button>
    </div>
  );
};

export default ToolBar;