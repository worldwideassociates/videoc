/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "videoconf.b-cdn.net",
        port: "",
        pathname: "/assets/**",
      },
    ],
  },
};

export default nextConfig;
