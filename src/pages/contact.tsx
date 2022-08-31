import type { GetStaticProps } from "next";
import Head from "next/head";
import React from "react";

import { MDXProse } from "~src/components/MDXProse";
import { ProseTitle } from "~src/components/Prose";
import type { IContent } from "~src/lib/content/fetchContent";
import { fetchContent } from "~src/lib/content/fetchContent";

const ContactPage: React.FC<IContent> = ({ data, source }: IContent) => (
  <div>
    <Head>
      <title>Contact | Ian Macalinao</title>
    </Head>
    <ProseTitle>{data.title}</ProseTitle>
    <MDXProse {...source} />
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
