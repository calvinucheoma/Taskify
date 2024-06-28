"use client";

import Tasks from "../components/Tasks/Tasks";
import { useGlobalState } from "../context/globalProvider";

const CompletedPage = () => {
  const { completedTasks } = useGlobalState();

  // if (completedTasks.length === 0) {
  //   return;
  // }

  return <Tasks tasks={completedTasks} title="Completed Tasks" />;
};

export default CompletedPage;
