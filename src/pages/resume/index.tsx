import { Prose } from "~src/components/Prose.js";
import { BasicPage } from "~src/layouts/BasicPage.js";

const ResumePage = () => (
  <div>
    <BasicPage title="Resume">
      <Prose>
        <p>
          <a href="https://macalinao.github.io/resume/resume.pdf">My Resume</a>
        </p>
        <p>
          A lot of people have been asking for my resume source. I&apos;m not
          actively looking for a job right now, so I&apos;ve made this page to
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
