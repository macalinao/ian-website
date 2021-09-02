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
    config.devtool = "source-map";
    return config;
  },
};
