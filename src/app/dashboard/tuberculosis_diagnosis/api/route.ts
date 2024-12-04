import { NextResponse } from "next/server";

export const dynamic = 'force-static';
export async function GET() {
    return new Response('Hello World');
}

export async function POST(req: Request) {
    const MODEL_BACKEND = process.env.MODEL_BACKEND;
    try {
        const formData = await req.formData();
        const file = formData.get('image') as File;

        if (!file) {
            return NextResponse.json({ success: false, message: "No file provided" }, { status: 400 });
        }

        // Create a new FormData instance to send to the external endpoint
        const uploadFormData = new FormData();
        uploadFormData.append('image', file, file.name);

        // Send the image to the external API
        const response = await fetch(`${MODEL_BACKEND}/upload`, {
            method: 'POST',
            body: uploadFormData,
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            return NextResponse.json({ success: false, message: "Failed to upload image", error: errorResponse }, { status: response.status });
        }

        // Parse and return the response from the external API
        const jsonResponse = await response.json();
        return NextResponse.json({ success: true, prediction: jsonResponse.prediction });
    } catch (error) {
        console.error("Error uploading image:", error);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return NextResponse.json({ success: false, message: "Internal server error", error: error.message }, { status: 500 });
    }
}
