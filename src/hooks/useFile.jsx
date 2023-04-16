import { useState } from 'react';

function useFile() {
  const [file, setFile] = useState(null);

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  return [file, handleFileSelect];
}

export default useFile;
