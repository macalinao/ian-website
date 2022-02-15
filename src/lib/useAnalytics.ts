import { useRouter } from "next/router";
import { useEffect } from "react";
import TagManager from "react-gtm-module";

export const useAnalytics = (): void => {
  const router = useRouter();

  useEffect(() => {
    TagManager.initialize({
      gtmId: "GTM-5F6SPNH",
    });
  }, []);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      TagManager.dataLayer({
        dataLayer: {
          event: "pageview",
          page: url,
        },
      });
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
};
