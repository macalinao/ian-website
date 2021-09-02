module.exports = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["static.ian.pw"],
  },
  webpack(config) {
    if (process.env.NODE_ENV === "production") {
      config.devtool = "source-map";
    }
    return config;
  },
};
