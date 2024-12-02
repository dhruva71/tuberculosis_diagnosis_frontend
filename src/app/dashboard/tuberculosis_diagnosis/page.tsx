'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

type PredictionResponse = {
    success: boolean;
    prediction: {
        most_common_class: number;
        probabilities: Record<string, string>;
    };
};

const ClientTuberculosisXrayDiagnosisComponent: React.FC = () => {
    const SERVER_URL = '/dashboard/tuberculosis_diagnosis/api';

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewSrc, setPreviewSrc] = useState<string | null>(null);
    const [uploadStatus, setUploadStatus] = useState<string>('');
    const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
    const [hasTB, setHasTB] = useState<boolean>(false);
    const [probabilities, setProbabilities] = useState<Record<string, string>>({});

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setSelectedFile(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewSrc(reader.result as string);
                setUploadStatus('');
                setUploadSuccess(false);
                setHasTB(false);
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
            const response = await axios.post<PredictionResponse>(SERVER_URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const { success, prediction } = response.data;
            if (success) {
                setUploadSuccess(true);
                setHasTB(prediction.most_common_class === 1);
                setProbabilities(prediction.probabilities);
                setUploadStatus('Upload successful!');
            } else {
                setUploadStatus('Upload failed.');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            setUploadStatus('Upload failed.');
        }
    };

    const chartData = {
        labels: Object.keys(probabilities),
        datasets: [
            {
                label: 'Probability (%)',
                data: Object.values(probabilities).map((value) =>
                    parseFloat(value.replace('%', ''))
                ),
                backgroundColor: '#3b82f6', // Theme color
                borderColor: '#2563eb', // Theme color
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top' as const,
            },
            tooltip: {
                callbacks: {
                    label: (context: any) => `${context.raw}%`,
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: (value: number) => `${value}%`,
                },
            },
        },
    };

    return (
        <div className="p-8 max-w-md mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Upload an X-ray image</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            required
                            className="hidden"
                            id="file-upload"
                        />
                        <label
                            htmlFor="file-upload"
                            className="block w-full px-4 py-2 text-center border-2 border-dashed rounded-lg cursor-pointer text-muted-foreground hover:bg-muted transition"
                        >
                            {selectedFile ? selectedFile.name : 'Click to select an X-ray image'}
                        </label>

                        {previewSrc && (
                            <div className="mt-4 flex justify-center">
                                <Image
                                    src={previewSrc}
                                    alt="Preview"
                                    className="rounded-md shadow"
                                    width={400}
                                    height={400}
                                />
                            </div>
                        )}

                        {previewSrc && (
                            <Button
                                type="submit"
                                variant="primary"
                                className="w-full mt-4"
                            >
                                Upload
                            </Button>
                        )}
                    </form>
                    {uploadStatus && (
                        <p className="mt-4 text-center text-lg text-muted-foreground">{uploadStatus}</p>
                    )}
                    {uploadSuccess && (
                        <div className="mt-6">
                            {hasTB ? (
                                <p className="text-center text-lg text-destructive">
                                    Tuberculosis detected in X-ray.
                                </p>
                            ) : (
                                <p className="text-center text-lg text-success">
                                    X-ray is normal.
                                </p>
                            )}
                            <div className="mt-4">
                                <h2 className="text-xl font-semibold">Probabilities:</h2>
                                <Bar data={chartData} options={chartOptions} />
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default ClientTuberculosisXrayDiagnosisComponent;
