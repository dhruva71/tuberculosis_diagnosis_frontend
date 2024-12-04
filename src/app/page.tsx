import {lusitana} from "@/app/ui/fonts";
import DiagnosticsLogo from "@/app/ui/diagnostics_logo";
import Link from "next/link";

export default function Home() {
    return (
        <div
            className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <div className="flex flex-col gap-4 sm:flex-col sm:gap-8 items-center">
                    <DiagnosticsLogo/>
                    <h1 className="text-5xl font-bold">
                        Welcome to <span className="text-yellow-500">AI</span>mpact Diagnostics
                    </h1>
                    {/*<button*/}
                    {/*    className="text-black flex flex-row h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium border-4 border-black hover:text-white hover:bg-black md:flex-none md:justify-start md:p-2 md:px-3">*/}
                    {/*    <Link href={"/dashboard"}>*/}
                    {/*        <div className="block">Login to get started</div>*/}
                    {/*    </Link>*/}
                    {/*</button>*/}

                    <div>
                        <Link href="login">Sign In</Link>
                        <span> | </span>
                        {/*<Link href="login/signup">Sign Up</Link>*/}
                    </div>
                </div>
            </main>
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
                {/*<p className="text-sm"> © AImpact 2024</p>*/}
                <p className={`${lusitana.className} antialiased`}> © AImpact 2024</p>
            </footer>
        </div>
    );
}
