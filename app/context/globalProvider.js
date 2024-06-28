"use client";

import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import themes from "./theme";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

export const GlobalProvider = ({ children }) => {
  const { user } = useUser();

  const [selectedTheme, setSelectedTheme] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const [modal, setModal] = useState(false);

  const [editModal, setEditModal] = useState(false);

  const [tasks, setTasks] = useState([]);

  const [singleTask, setSingleTask] = useState({});

  const theme = themes[selectedTheme];

  const [collapsed, setCollapsed] = useState(false);

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    setEditModal(false);
  };

  const openEditModal = () => {
    setEditModal(true);
  };

  const collapseMenu = () => {
    setCollapsed(!collapsed);
  };

  const allTasks = async () => {
    setIsLoading(true);

    try {
      const res = await axios.get("/api/tasks");

      const sortedData = res.data.sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });

      setTasks(sortedData);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      toast.success("Task deleted");

      allTasks();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong...");
    }
  };

  const updateTaskToCompleted = async (task) => {
    try {
      await axios.put(`/api/tasks/${task.id}`, task);

      toast.success("Task updated!");

      allTasks();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong...");
    }
  };

  const getSingleTask = (houseId) => {
    const soloTask = tasks.find((task) => task.id === houseId);
    setSingleTask(soloTask);
  };

  const completedTasks = tasks.filter((task) => task.isCompleted);

  const importantTasks = tasks.filter((task) => task.isImportant);

  const incompleteTasks = tasks.filter((task) => !task.isCompleted);

  useEffect(() => {
    if (user) allTasks();
  }, [user]);

  return (
    <GlobalContext.Provider
      value={{
        theme,
        allTasks,
        tasks,
        deleteTask,
        isLoading,
        completedTasks,
        importantTasks,
        incompleteTasks,
        updateTaskToCompleted,
        openModal,
        closeModal,
        modal,
        editModal,
        openEditModal,
        collapsed,
        collapseMenu,
        getSingleTask,
        singleTask,
      }}
    >
      <GlobalUpdateContext.Provider value={{}}>
        {children}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);
