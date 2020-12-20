import { GetStaticProps } from "next";
import hydrate from "next-mdx-remote/hydrate";
import Head from "next/head";
import React from "react";
import { fetchContent, IContent } from "~src/lib/content/fetchContent";

const ContactPage: React.FC<IContent> = ({ data, source }) => (
  <div>
    <Head>
      <title>Contact | Ian Macalinao</title>
    </Head>
    <h1>{data.title}</h1>
    {hydrate(source)}
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
