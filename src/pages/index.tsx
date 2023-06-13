import { type NextPage } from "next";
import Head from "next/head";
import ProjectView from "@/modules/project/view/ProjectView";
import React from "react";

const Home: NextPage = () => {
  const [isDone, setIsDone] = React.useState(false);

  return (
    <>
      <Head>
        <title>Geoman Leaflet test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ProjectView isDone={isDone} setIsDone={setIsDone} />
    </>
  );
};

export default Home;
