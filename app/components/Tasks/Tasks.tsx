"use client";

import { useGlobalState } from "@/app/context/globalProvider";
import { Task } from "@prisma/client";
import styled from "styled-components";
import TaskItem from "../TaskItem/TaskItem";
import { plus } from "@/app/utils/Icons";
import { usePathname } from "next/navigation";
import Modal from "../Modals/Modal";
import CreateContent from "../Modals/CreateContent";

interface TasksProps {
  title: string;
  tasks: Task[];
}

const Tasks: React.FC<TasksProps> = ({ title, tasks = [] }) => {
  const { theme, isLoading, openModal, modal, editModal } = useGlobalState();

  const pathname = usePathname();

  return (
    <TaskStyled theme={theme}>
      {modal && <Modal content={<CreateContent action="create" />} />}

      {editModal && <Modal content={<CreateContent action="edit" />} />}

      <h1>{title}</h1>

      {!isLoading ? (
        <div className="tasks grid">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={{ ...task }} />
          ))}

          {pathname === "/" && (
            <button className="create-task" onClick={openModal}>
              {plus}
              Add New Task
            </button>
          )}
        </div>
      ) : (
        <div className="tasks-loader w-full h-full flex items-center justify-center">
          <span className="loader"></span>
        </div>
      )}
    </TaskStyled>
  );
};

const TaskStyled = styled.main`
  width: 100%;
  background-color: ${(props) => props.theme.colorBg2};
  border: 2px solid ${(props) => props.theme.borderColor2};
  border-radius: 1rem;
  padding: 2rem;
  height: 100%;

  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  > h1 {
    position: relative;
    font-size: clamp(1.5rem, 2vw, 2rem);
    font-weight: 800;

    &::after {
      content: "";
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 3rem;
      height: 0.2rem;
      background-color: ${(props) => props.theme.colorPrimaryGreen};
      border-radius: 0.5rem;
    }
  }

  .tasks {
    margin: 2rem 0;
  }

  .create-task {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    height: 16rem;
    color: ${(props) => props.theme.colorGrey2};
    font-weight: 600;
    cursor: pointer;
    border-radius: 1rem;
    border: 3px dashed ${(props) => props.theme.colorGrey5};
    transition: all ease 0.3s;

    &:hover {
      background-color: ${(props) => props.theme.colorGrey5};
      color: ${(props) => props.theme.colorGrey0};
    }
  }
`;

export default Tasks;
