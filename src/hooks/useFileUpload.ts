import { useState } from "react";

export const useFileUpload = () => {
  const [file, setFile] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFile(e.target?.result as string);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return { file, handleFileUpload };
};

