import type { DiscussionEmbed as DiscussionEmbedType } from "disqus-react";
import { default as dynamic } from "next/dynamic.js";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { css } from "twin.macro";

import type { IPost } from "~src/lib/content/posts.js";

const DiscussionEmbed = dynamic(
  () => import("disqus-react").then((mod) => mod.DiscussionEmbed),
  {
    ssr: false,
  },
) as typeof DiscussionEmbedType;

interface IProps {
  post: IPost;
}

/**
 * Lazy loaded comments section (only shows up when you get to it)
 */
export const PostComments: React.FC<IProps> = ({ post }: IProps) => {
  const { ref, inView } = useInView();
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (inView && !loaded) {
      setLoaded(true);
    }
  }, [inView, loaded]);

  return (
    <div
      ref={ref}
      css={css`
        min-height: 200px;
      `}
    >
      {loaded && (
        <DiscussionEmbed
          shortname="ianpw"
          config={{
            url: typeof window !== "undefined" ? window.location.href : "",
            identifier: `posts/${post.id}.md`,
            title: post.title,
            language: "en_US",
          }}
        />
      )}
    </div>
  );
};
