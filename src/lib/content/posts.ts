import { readdir, readFile } from "fs";
import matter from "gray-matter";
import path from "path";
import { promisify } from "util";

const postsDir = path.join(process.cwd(), "content/posts");

export interface IPost {
  id: string;
  title: string;
  draft: boolean;
  publishedAt: string;
  content: string;
  path: string;
  incomplete: boolean;
  description?: string;
}

export const getAllPosts = async (): Promise<readonly IPost[]> => {
  const posts = await promisify(readdir)(postsDir);
  return await Promise.all(
    posts.map(async (post) => {
      const postID = post.split(".").slice(0, -1).join(".");
      return await getPostByID(postID);
    })
  );
};

export const getPostByID = async (postID: string): Promise<IPost> => {
  const source = await promisify(readFile)(`${postsDir}/${postID}.md`);
  const { content, data } = matter(source.toString());
  const publishedAt = new Date(postID.split("-").slice(0, 3).join("-"));
  return {
    id: postID,
    title: data.title,
    draft: data.draft === true,
    publishedAt: publishedAt.toISOString(),
    content,
    path: `/posts/${postID}`,
    incomplete: data.incomplete === true,
    description: data.description ?? undefined,
  };
};
