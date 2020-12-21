import NextImage from "next/image";
import Link from "next/link";
import React, { AnchorHTMLAttributes, DetailedHTMLProps } from "react";
import { TokenIcon } from "~src/components/TokenIcon";

export const mdxComponents = {
  a: ({
    href,
    ...props
  }: DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > & { href: string }) => {
    if (href?.startsWith("http")) {
      return <a {...props} href={href} target="_blank"></a>;
    } else if (href?.startsWith("#")) {
      // footnotes
      return <a {...props} href={href}></a>;
    } else {
      return (
        <Link {...props} href={href} passHref>
          <a>{props.children}</a>
        </Link>
      );
    }
  },
  TokenIcon,
  NextImage,
};
