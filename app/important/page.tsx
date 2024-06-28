"use client";

import Tasks from "../components/Tasks/Tasks";
import { useGlobalState } from "../context/globalProvider";

const ImportantPage = () => {
  const { importantTasks } = useGlobalState();

  // if (importantTasks.length === 0) {
  //   return;
  // }

  return <Tasks tasks={importantTasks} title="Important Tasks" />;
};

export default ImportantPage;
