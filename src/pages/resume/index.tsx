import Link from "next/link";
import React from "react";

const ResumePage = () => (
  <div>
    <h1>Resume</h1>
    <p>
      <a href="https://macalinao.github.io/resume/resume.pdf">My Resume</a>
    </p>
    <p>
      A lot of people have been asking for my resume source. I'm not actively
      looking for a job right now, so I've made this page to explain things.
    </p>
    <p>
      I used Adobe InDesign to create it.{" "}
      <a href="https://github.com/macalinao/resume">
        The source template is available on GitHub.
      </a>
    </p>
    <Link href="/">
      <a>Back to home</a>
    </Link>
  </div>
);

export default ResumePage;
