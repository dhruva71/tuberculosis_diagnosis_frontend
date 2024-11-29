import Image from "next/image";
import {inter, lusitana} from "@/app/ui/fonts";

export default function DashboardHome() {
    return (
        <div
            className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <div className="flex flex-col gap-4 sm:flex-col sm:gap-8 items-center">
                    <Image src={"/tb_dalle.png"} alt="tb_dalle" width={400} height={400}/>
                    <h1 className="text-5xl font-bold">
                        Welcome to <span className="text-yellow-500">AI</span>mpact Diagnostics
                    </h1>
                </div>
            </main>
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
                {/*<p className="text-sm"> © AImpact 2024</p>*/}
                <p className={`${lusitana.className} antialiased`}> © AImpact 2024</p>
            </footer>
        </div>
    );
}
