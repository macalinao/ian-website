import { default as invariant } from "tiny-invariant";

/** @type import('next').NextConfig */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["static.ian.pw"],
    disableStaticImages: true,
  },
  experimental: {
    images: {
      unoptimized: !!process.env.EXPORT_STATIC,
    },
  },
  webpack(
    /** @type import('webpack').Configuration */
    config,
    options
  ) {
    if (process.env.NODE_ENV === "production") {
      config.devtool = "source-map";
    }

    invariant(config.module?.rules);

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

export default nextConfig;
