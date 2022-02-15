/* eslint-disable @next/next/no-img-element */
import NextImage from "next/image";
import Link from "next/link";
import type { AnchorHTMLAttributes, DetailedHTMLProps } from "react";
import React from "react";

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
      return (
        <a {...props} href={href} target="_blank" rel="noreferrer">
          {props.children}
        </a>
      );
    } else if (href?.startsWith("#")) {
      // footnotes
      return (
        <a {...props} href={href}>
          {props.children}
        </a>
      );
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
  img: ({
    src,
    alt,
    ...props
  }: React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > & { src: string }) => {
    if (src.startsWith("/")) {
      return <img {...props} src={`https://static.ian.pw${src}`} alt={alt} />;
    }
    return <img {...props} src={src} alt={alt} />;
  },
};
