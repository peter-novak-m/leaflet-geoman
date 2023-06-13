import { type NextPage } from "next";
import React, { FC, memo } from "react";
import "leaflet/dist/leaflet.css";

// imports
import dynamic from "next/dynamic";
// other imports

const MapWithNoSSR = dynamic(() => import("./Map"), {
  ssr: false,
});

const MemorizedMapWithNoSSR = memo(MapWithNoSSR);

interface IMapAreaProps {
  isDone: boolean;
  setIsDone: (isDone: boolean) => void;
}

const MapArea: FC<IMapAreaProps> = ({ isDone, setIsDone }) => {
  return (
    <>
      <main>
        <div className="z-0 mx-auto w-3/4">
          <MemorizedMapWithNoSSR isDone={isDone} setIsDone={setIsDone} />
        </div>
      </main>
    </>
  );
};

export default MapArea;
