import Image from "next/image";
import {lusitana} from "@/app/ui/fonts";
import Link from "next/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


export default function DashboardHome() {
    return (
        <div
            className="flex flex-row items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <Link href="/dashboard/tuberculosis_diagnosis">
                <Card>
                    <CardHeader>
                        <CardTitle>Tuberculosis X-ray diagnostics</CardTitle>
                        <CardDescription>Use AI to diagnose tuberculosis</CardDescription>
                    </CardHeader>
                    {/*<CardContent>*/}
                    {/*    <p>Use AI to diagnose tuberculosis</p>*/}
                    {/*</CardContent>*/}
                </Card>

            </Link>
        </div>
    );
}
