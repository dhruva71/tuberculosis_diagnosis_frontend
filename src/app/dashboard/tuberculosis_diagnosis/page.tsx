'use client';
import {useState, ChangeEvent, FormEvent} from 'react';
import axios from 'axios';
import {
    ArrowUpOnSquareIcon,
} from '@heroicons/react/24/outline';

const ClientTuberculosisXrayDiagnosisComponent: React.FC = () => {
    const SERVER_URL = 'http://localhost:3000/dashboard/tuberculosis_diagnosis/api';
    // const SERVER_URL_PYTHON = 'http://localhost:8000/upload';

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
                setUploadStatus('');
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
            const response = await axios.post(SERVER_URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const {success, prediction} = response.data;
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
        <div className="p-8 max-w-md mx-auto flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-6">Upload an X-ray image</h1>
            <form onSubmit={handleSubmit} className="space-y-4 flex flex-col items-center">
                {/* Hidden File Input */}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                    className="hidden"
                    id="file-upload"
                />

                {/* Custom Label */}
                <label
                    htmlFor="file-upload"
                    className="flex items-center justify-center w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
                >
                    <span className="text-gray-600">Click to select an X-ray image</span>
                </label>

                {/* Display Selected File Name */}
                {selectedFile && (
                    <p className="text-sm text-gray-500">{selectedFile.name}</p>
                )}

                {/* Image Preview */}
                {previewSrc && (
                    <div className="mt-4">
                        <img
                            src={previewSrc}
                            alt="Preview"
                            className="w-full max-w-xs rounded shadow"
                        />
                    </div>
                )}
                {previewSrc &&
                    (<button
                        type="submit"
                        className="w-full flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-4 transition focus:outline-none"
                    >
                        <ArrowUpOnSquareIcon className="w-5 h-5 mr-2"/>
                        Upload
                    </button>)}
            </form>
            {uploadStatus && (
                <p className="mt-4 text-center text-sm text-gray-700">{uploadStatus}</p>
            )}
        </div>
    );
};

export default ClientTuberculosisXrayDiagnosisComponent;