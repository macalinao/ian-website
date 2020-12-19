import { readdir, readFile } from "fs/promises";
import { GetStaticPaths, GetStaticProps } from "next";
import hydrate from "next-mdx-remote/hydrate";
import renderToString from "next-mdx-remote/render-to-string";
import path from "path";

interface IProps {
  source: string;
}

const postsDir = path.join(process.cwd(), "content/posts");

const Post: React.FC<IProps> = ({ source }) => {
  const content = hydrate(source);
  return <div className="wrapper">{content}</div>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await readdir(postsDir);
  return {
    paths: posts.map(
      (post) => `/posts/${post.split(".").slice(0, -1).join(".")}.html`
    ),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<
  IProps,
  { postID: string }
> = async (req) => {
  const postIDNoSuffix = req.params?.postID.split(".html")[0];
  const source = await readFile(`${postsDir}/${postIDNoSuffix}.md`);
  const mdxSource = await renderToString(source);
  return { props: { source: mdxSource } };
};

export default Post;
