import type { GetStaticProps } from "next";
import Head from "next/head";
import { MDXRemote } from "next-mdx-remote";
import React from "react";

import type { IContent } from "~src/lib/content/fetchContent";
import { fetchContent } from "~src/lib/content/fetchContent";

const ContactPage: React.FC<IContent> = ({ data, source }: IContent) => (
  <div>
    <Head>
      <title>Contact | Ian Macalinao</title>
    </Head>
    <h1>{data.title}</h1>
    <MDXRemote {...source} />
  </div>
);

export const getStaticProps: GetStaticProps<
  IContent,
  { postID: string }
> = async () => {
  const content = await fetchContent("contact.md");
  return { props: content };
};

export default ContactPage;
