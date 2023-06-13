import type { FC } from "react";
import MapArea from "../components/MapArea";

interface ProjectViewProps {
  isDone: boolean;
  setIsDone: (isDone: boolean) => void;
}

const ProjectView: FC<ProjectViewProps> = ({ isDone, setIsDone }) => {
  return <MapArea isDone={isDone} setIsDone={setIsDone} />;
};

export default ProjectView;
