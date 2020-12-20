module.exports = {
  images: {
    domains: ["static.ian.pw"],
  },
  webpack(config) {
    config.devtool = "source-map";
    return config;
  },
};
