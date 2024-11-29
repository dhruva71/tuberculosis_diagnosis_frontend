import Image from "next/image";
export default function TuberculosisDiagnosis() {
    return (
        <div className="flex flex-col gap-4 sm:flex-col sm:gap-8 items-center">
            <Image src={"/tb_dalle.png"} alt="tb_dalle" width={400} height={400}/>
            <h1 className="text-5xl font-bold">
                Welcome to <span className="text-yellow-500">AI</span>mpact Diagnostics
            </h1>
        </div>
    );
}