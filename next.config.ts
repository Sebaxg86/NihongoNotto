import type { NextConfig } from "next";
const config: NextConfig = { output: "standalone", serverExternalPackages: ["kuroshiro", "kuroshiro-analyzer-kuromoji", "kuromoji", "oci-common", "oci-ailanguage"], outputFileTracingIncludes: {"/api/translate": ["./node_modules/kuromoji/dict/**/*"]}, distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next", poweredByHeader: false };
export default config;
