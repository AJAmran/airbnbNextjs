/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "a0.muscache.com",
        protocol: "https",
        port: "",
      },
      {
        hostname: "glvmmupiqwlmhicmggqp.supabase.co",
        protocol: "https",
        port: "",
      },
      {
        hostname: "thumbs.dreamstime.com",
        protocol: "https",
        port: "",
      },
      {
        hostname: "img.freepik.com",
        protocol: "https",
        port: "",
      },
    ],
  },
};

export default nextConfig;
