import React from "react";

import { Prose } from "~src/components/Prose";
import { BasicPage } from "~src/layouts/BasicPage";

const ResumePage = () => (
  <div>
    <BasicPage title="Resume">
      <Prose>
        <p>
          <a href="https://macalinao.github.io/resume/resume.pdf">My Resume</a>
        </p>
        <p>
          A lot of people have been asking for my resume source. I'm not
          actively looking for a job right now, so I've made this page to
          explain things.
        </p>
        <p>
          I used Adobe InDesign to create it.{" "}
          <a href="https://github.com/macalinao/resume">
            The source template is available on GitHub.
          </a>
        </p>
      </Prose>
    </BasicPage>
  </div>
);

export default ResumePage;
