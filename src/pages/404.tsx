import Link from "next/link";
import React from "react";

const NotFoundPage = () => (
  <div>
    <h1>Not Found</h1>
    <p>The page you were looking for could not be found.</p>
    <Link href="/">
      <a>Back to home</a>
    </Link>
  </div>
);

export default NotFoundPage;
