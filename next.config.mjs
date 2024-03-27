/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx"],
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "cdn.discordapp.com",
    ],
  },
  //   webpack: (config) => {
  //     config.externals = [...config.externals, "bcrypt"];
  //     return config;
  //   },
};

export default nextConfig;
