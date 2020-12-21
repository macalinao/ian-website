import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { DiscussionEmbed as DiscussionEmbedType } from "disqus-react";
import { GetStaticPaths, GetStaticProps } from "next";
import hydrate from "next-mdx-remote/hydrate";
import renderToString from "next-mdx-remote/render-to-string";
import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { getAllPosts, getPostByID, IPost } from "~src/lib/content/posts";
import { formatDate } from "~src/lib/formatDate";
import { mdxComponents } from "~src/lib/mdxComponents";
import { mobileOnly } from "~src/lib/styles/mobileOnly";

const DiscussionEmbed = dynamic(
  () => import("disqus-react").then((mod) => mod.DiscussionEmbed),
  {
    ssr: false,
  }
) as typeof DiscussionEmbedType;

interface IProps {
  source: string;
  post: IPost;
}

const PostUnder = styled.div`
  color: #3271a7;
  text-align: center;
  line-height: 10px;
  margin-bottom: 60px;
  font-weight: normal;

  ${mobileOnly(css`
    text-align: left;
  `)}
`;

const Post: React.FC<IProps> = ({ source, post }) => {
  const content = hydrate(source, { components: mdxComponents });
  return (
    <PostWrapper>
      <Head>
        <title>{post.title} | Ian Macalinao</title>
        {post.description && (
          <meta name="description" content={post.description} />
        )}
      </Head>
      <h1
        css={css`
          margin-bottom: 30px;
        `}
      >
        {post.title}
      </h1>

      <PostUnder>
        <p>
          by{" "}
          <Link href="/">
            <a>Ian Macalinao</a>
          </Link>{" "}
          on {formatDate(new Date(post.publishedAt))}
        </p>
      </PostUnder>

      <div id="post">
        {post.incomplete && (
          <em>
            Note: This section is incomplete. You can help finish it
            <a
              href="https://github.com/macalinao/ian.pw/blob/master/$path$"
              target="_blank"
            >
              here
            </a>
            .
          </em>
        )}
        {content}
      </div>

      <Thanks>
        <p>
          Thanks for reading! Have any questions, comments, or suggestions? Feel
          free to use the comment section below or email me at{" "}
          <a href="mailto:blog@igm.pub">blog@igm.pub</a> and I'll do my best to
          respond.
        </p>
        <p>
          Alternatively, you can view the source of the post{" "}
          <a
            href={`https://github.com/macalinao/ian.pw/blob/master/content/posts/${post.id}.md`}
            target="_blank"
          >
            here
          </a>{" "}
          and send a pull request.
        </p>
      </Thanks>
      <DiscussionEmbed
        shortname="ianpw"
        config={{
          url: typeof window !== "undefined" ? window.location.href : "",
          identifier: `posts/${post.id}.md`,
          title: post.title,
          language: "en_US",
        }}
      />
    </PostWrapper>
  );
};

const PostWrapper = styled.div`
  h1,
  h2 {
    line-height: 1.3;
  }
  h3 {
    line-height: 1.5;
  }
  h2,
  h3 {
    margin-top: 50px;
  }

  .math.math-display {
    overflow-x: scroll;
  }

  .footnotes {
    margin-top: 60px;
    ol {
      margin: 40px 0;
    }
    li {
      font-size: 18px;
    }
    color: #454545;
    border-top: 1px solid #ccc;

    hr {
      display: none;
    }
  }
`;

const Thanks = styled.div`
  margin: 3em auto;
  border: 1px solid #eee;
  padding: 20px 40px;
  background-color: #fafaff;
  color: #656565;
  p {
    font-size: 18px;
  }
`;

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts();
  return {
    paths: posts.map((post) => post.path),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<
  IProps,
  { postID: string }
> = async (req) => {
  const postID = req.params?.postID;
  if (!postID) {
    return {
      notFound: true,
    };
  }
  const postIDNoSuffix = postID.split(".html")[0];
  if (!postIDNoSuffix) {
    return {
      notFound: true,
    };
  }

  const post = await getPostByID(postIDNoSuffix);
  if (postID.endsWith(".html")) {
    return {
      redirect: {
        permanent: true,
        destination: post.path,
      },
    };
  }

  const mdxSource = await renderToString(post.content, {
    components: mdxComponents,
    mdxOptions: {
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    },
  });
  return { props: { source: mdxSource, post } };
};

export default Post;
