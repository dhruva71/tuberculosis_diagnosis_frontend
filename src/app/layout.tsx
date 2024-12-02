import type {Metadata} from "next";
import "@/app/ui/globals.css";
import {inter} from "@/app/ui/fonts";
import {ThemeProvider} from "@/components/theme-provider"

export const metadata: Metadata = {
    title: "AImpact Diagnostics",
    description: "AImpact Diagnostics",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body
            className={`${inter.className} antialiased`}
        >
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
        </body>
        </html>
    );
}
