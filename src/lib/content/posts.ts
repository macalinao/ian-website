import { readdir, readFile } from "fs/promises";
import matter from "gray-matter";
import path from "path";

const postsDir = path.join(process.cwd(), "content/posts");

export interface IPost {
  id: string;
  title: string;
  draft: boolean;
  publishedAt: string;
  content: string;
  path: string;
}

export const getAllPosts = async (): Promise<readonly IPost[]> => {
  const posts = await readdir(postsDir);
  return await Promise.all(
    posts.map(async (post) => {
      const postID = post.split(".").slice(0, -1).join(".");
      return await getPostByID(postID);
    })
  );
};

export const getPostByID = async (postID: string): Promise<IPost> => {
  const source = await readFile(`${postsDir}/${postID}.md`);
  const { content, data } = matter(source.toString());
  const publishedAt = new Date(postID.split("-").slice(0, 3).join("-"));
  return {
    id: postID,
    title: data.title,
    draft: data.draft === true,
    publishedAt: publishedAt.toISOString(),
    content,
    path: `/posts/${postID}.html`,
  };
};
