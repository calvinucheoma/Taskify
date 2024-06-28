"use client";

import Tasks from "../components/Tasks/Tasks";
import { useGlobalState } from "../context/globalProvider";

const IncompletePage = () => {
  const { incompleteTasks } = useGlobalState();

  // if (incompleteTasks.length === 0) {
  //   return;
  // }

  return <Tasks title="Incomplete Tasks" tasks={incompleteTasks} />;
};

export default IncompletePage;
