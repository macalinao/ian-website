import { css } from "@emotion/react";
import { DiscussionEmbed as DiscussionEmbedType } from "disqus-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { IPost } from "~src/lib/content/posts";

const DiscussionEmbed = dynamic(
  () => import("disqus-react").then((mod) => mod.DiscussionEmbed),
  {
    ssr: false,
  }
) as typeof DiscussionEmbedType;

interface IProps {
  post: IPost;
}

/**
 * Lazy loaded comments section (only shows up when you get to it)
 */
export const PostComments: React.FC<IProps> = ({ post }) => {
  const { ref, inView, entry } = useInView();
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
