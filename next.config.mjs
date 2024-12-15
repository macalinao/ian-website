import { default as NextBundleAnalyzer } from "@next/bundle-analyzer";
import ResolveTypeScriptPlugin from "resolve-typescript-plugin";
import invariant from "tiny-invariant";

/** @type import('next').NextConfig */
const nextConfig = {
  // https://github.com/vercel/next.js/discussions/33161#discussioncomment-11498969
  // experimental: {
  //   forceSwcTransforms: true,
  // },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    domains: ["static.ian.pw"],
    disableStaticImages: true,
  },
  webpack(
    /** @type import('webpack').Configuration */
    config,
    options,
  ) {
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    if (process.env.NODE_ENV === "production") {
      config.devtool = "source-map";
    }

    if (!options.isServer) {
      // Unset client-side javascript that only works server-side
      // https://github.com/vercel/next.js/issues/7755#issuecomment-508633125
      config.resolve = {
        ...config.resolve,
        fallback: { ...config.resolve.fallback, fs: false },
      };
    }

    invariant(config.module?.rules);

    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      include: [options.dir],
      use: [
        options.defaultLoaders.babel,
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
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  enabled: !!process.env.ANALYZE,
});

// if (process.env.NEXT_PUBLIC_EXPORT_STATIC) {
//   nextConfig.experimental = {
//     legacyBrowsers: false,
//   };
// }

export default withBundleAnalyzer(nextConfig);
