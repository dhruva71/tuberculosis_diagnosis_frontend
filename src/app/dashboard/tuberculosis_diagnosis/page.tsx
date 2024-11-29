'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

const ClientTuberculosisXrayDiagnosisComponent: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);

    // For image preview (optional)
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewSrc(null);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedFile) {
      setUploadStatus('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      setUploadStatus('Uploading...');
      const response = await axios.post('http://localhost:8000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { success, prediction } = response.data;
      if (success) {
        setUploadStatus('Upload successful!');
        if (prediction === 1) {
          setUploadStatus('Tuberculosis detected in X-ray.');
        } else {
          setUploadStatus('X-ray is normal.');
        }
      } else {
        setUploadStatus('Upload failed.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('Upload failed.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Upload an Image</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} required />
        {previewSrc && (
          <div style={{ marginTop: '1rem' }}>
            <img src={previewSrc} alt="Preview" style={{ maxWidth: '300px' }} />
          </div>
        )}
        <button type="submit" style={{ marginTop: '1rem' }}>
          Upload
        </button>
      </form>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};

export default ClientTuberculosisXrayDiagnosisComponent;