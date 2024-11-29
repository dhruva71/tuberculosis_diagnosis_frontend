import { NextResponse } from "next/server";

export const dynamic = 'force-static';
export async function GET() {
    return new Response('Hello World');
}

export async function POST(req: Request) {
    const formData = await req.formData();
    const file = formData.get('image') as File;
    console.log(file);
    return NextResponse.json({ success: true, prediction: 1 });
}