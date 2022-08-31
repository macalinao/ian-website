import type { GetStaticProps } from "next";
import { default as Head } from "next/head.js";
import React from "react";

import { MDXProse } from "~src/components/MDXProse.js";
import { BasicPage } from "~src/layouts/BasicPage.js";
import type { IContent } from "~src/lib/content/fetchContent.js";
import { fetchContent } from "~src/lib/content/fetchContent.js";

const ContactPage: React.FC<IContent> = ({ data, source }: IContent) => (
  <div>
    <Head>
      <title>Contact | Ian Macalinao</title>
    </Head>
    <BasicPage title={data.title}>
      <MDXProse {...source} />
    </BasicPage>
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
