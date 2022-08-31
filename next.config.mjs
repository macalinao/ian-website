import { default as NextBundleAnalyzer } from "@next/bundle-analyzer";
import ResolveTypeScriptPlugin from "resolve-typescript-plugin";
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

    invariant(config.resolve?.plugins);
    config.resolve.plugins.push(new ResolveTypeScriptPlugin());

    return config;
  },
};

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: !!process.env.ANALYZE,
});

if (process.env.NEXT_PUBLIC_EXPORT_STATIC) {
  nextConfig.experimental = {
    browsersListForSwc: true,
    legacyBrowsers: false,
    images: {
      unoptimized: true,
    },
  };
}

export default withBundleAnalyzer(nextConfig);
