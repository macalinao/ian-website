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
  webpack(config, options) {
    if (process.env.NODE_ENV === "production") {
      config.devtool = "source-map";
    }

    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.tsx?$/,
      include: [options.dir],
      use: [
        "next-swc-loader",
        {
          loader: "@svgr/webpack",
          options: {
            babel: false,
            svgoConfig: {
              plugins: [
                {
                  name: "removeViewBox",
                  active: false,
                },
              ],
            },
          },
        },
      ],
    });

    return config;
  },
};
