'use client';
import {useState, ChangeEvent, FormEvent} from 'react';
import axios from 'axios';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    ChartOptions,
} from 'chart.js';
import {Bar} from 'react-chartjs-2';
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import Image from "next/image";
// import { DeepPartial } from 'chart.js/dist/types/utils';

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

            const {success, prediction} = response.data;
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
                backgroundColor: '#3b82f6',
                borderColor: '#2563eb',
                borderWidth: 1,
                barThickness: 20, // Controls the thickness of the bars
            },
        ],
    };

    const chartOptions: ChartOptions<'bar'> = {
        responsive: true,
        indexAxis: 'y', // Correctly typed
        plugins: {
            legend: {
                display: true,
                position: 'bottom', // Valid position value
                labels: {
                    font: {
                        size: 16, // Legend font size
                    },
                },
            },
            tooltip: {
                bodyFont: {
                    size: 14, // Tooltip body font size
                },
                titleFont: {
                    size: 16, // Tooltip title font size
                },
            },
            // datalabels: {
            //     anchor: 'end',
            //     align: 'right',
            //     formatter: (value: number) => `${value}%`, // Correct function type
            //     color: '#000',
            //     font: {
            //         size: 14, // Data label font size
            //     },
            // },
        },
        scales: {
            x: {
                beginAtZero: true,
                ticks: {
                    callback: (value: number | string) => `${value}%`, // Correct callback type
                    font: {
                        size: 14, // X-axis font size
                    },
                },
            },
            y: {
                ticks: {
                    font: {
                        size: 14, // Y-axis font size
                    },
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
                                variant="default"
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
                                <Bar data={chartData} options={chartOptions}/>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default ClientTuberculosisXrayDiagnosisComponent;
