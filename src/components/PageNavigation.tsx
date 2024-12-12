import React from 'react';

interface PageNavigationProps {
  currentPage: number;
  numPages: number;
  onPageChange: (page: number) => void;
}

const PageNavigation: React.FC<PageNavigationProps> = ({
  currentPage,
  numPages,
  onPageChange,
}) => {
  return (
    <div className="mt-4 flex justify-center gap-4">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage <= 1}
        className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition-colors"
      >
        Previous
      </button>
      <span className="flex items-center">
        Page {currentPage} of {numPages}
      </span>
      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, numPages))}
        disabled={currentPage >= numPages}
        className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition-colors"
      >
        Next
      </button>
    </div>
  );
};

export default PageNavigation;