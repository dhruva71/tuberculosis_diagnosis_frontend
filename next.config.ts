import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    /* config options here */
    output: 'standalone', // Generates the `.next/standalone` directory
    outputFileTracingIncludes: {
        '*': [
            './node_modules/.prisma/**/*',
            './node_modules/@prisma/**/*',
            './prisma/schema.prisma',
        ],
    },
};

export default nextConfig;
