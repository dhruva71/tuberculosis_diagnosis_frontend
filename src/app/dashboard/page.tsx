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
                    <CardContent>
                        <Image src='/tb_diagnosis.png' alt='tb_diagnosis' width={400} height={400}/>
                    </CardContent>
                    <CardHeader>
                        <CardTitle>Tuberculosis X-ray diagnostics</CardTitle>
                        <CardDescription>Use AI to diagnose tuberculosis</CardDescription>
                    </CardHeader>
                </Card>
            </Link>
        </div>
    )
        ;
}
