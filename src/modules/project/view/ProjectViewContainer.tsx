import React from "react";
import ProjectView from "./ProjectView";

const ProjectViewContainer = () => {
  const [isDone, setIsDone] = React.useState(false);

  console.log("isDone", isDone);

  return (
    <>
      <ProjectView isDone={isDone} setIsDone={setIsDone} />
    </>
  );
};

export default ProjectViewContainer;
