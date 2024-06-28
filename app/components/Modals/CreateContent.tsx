"use client";

import { useGlobalState } from "@/app/context/globalProvider";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";
import Button from "../Button/Button";
import { plus } from "@/app/utils/Icons";

interface CreateContentProps {
  action: "create" | "edit";
}

const CreateContent: React.FC<CreateContentProps> = ({ action }) => {
  const { theme, allTasks, closeModal, singleTask } = useGlobalState();

  const [title, setTitle] = useState(action === "edit" ? singleTask.title : "");
  const [description, setDescription] = useState(
    action === "edit" ? singleTask.description : ""
  );
  const [date, setDate] = useState(action === "edit" ? singleTask.date : "");
  const [completed, setCompleted] = useState(
    action === "edit" ? (singleTask.isCompleted === true ? true : false) : false
  );
  const [important, setImportant] = useState(
    action === "edit" ? (singleTask.isImportant === true ? true : false) : false
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (name: string) => (e: any) => {
    switch (name) {
      case "title":
        setTitle(e.target.value);
        break;
      case "description":
        setDescription(e.target.value);
        break;
      case "date":
        setDate(e.target.value);
        break;
      case "completed":
        setCompleted(e.target.checked);
        break;
      case "important":
        setImportant(e.target.checked);
        break;
      default:
        break;
    }
  };
  // The 'handleChange' function is defined to return another function. This is known as a higher-order function.
  //  This is why in our 'onChange' prop in our <Input/> element, we are calling the function directly there.

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);

    const task = {
      title,
      description,
      date,
      completed,
      important,
    };

    try {
      if (action === "create") {
        const res = await axios.post("/api/tasks", task);

        if (res.data.error) {
          setIsLoading(false);
          return toast.error(res.data.error.toString());
        }

        toast.success("Task created successfully!");

        allTasks();

        closeModal();

        setIsLoading(false);
      }

      if (action === "edit") {
        const res = await axios.patch(`/api/tasks/${singleTask.id}`, task);

        if (res.data.error) {
          setIsLoading(false);
          return toast.error(res.data.error.toString());
        }

        toast.success("Task edited successfully!");

        allTasks();

        closeModal();

        setIsLoading(false);
      }
    } catch (error) {
      toast.error("Something went wrong...");
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <CreateContentStyled onSubmit={handleSubmit} theme={theme}>
      <h1>{action === "create" ? "Create a Task" : "Edit Task"}</h1>
      <div className="input-control">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={handleChange("title")}
          placeholder="e.g Go to the market!"
        />
      </div>
      <div className="input-control">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={handleChange("description")}
          placeholder="e.g Get some tomatoes and veggies!"
          rows={4}
        />
      </div>
      <div className="input-control">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={date}
          onChange={handleChange("date")}
        />
      </div>
      <div className="input-control toggler">
        <label htmlFor="completed"> Toggle Completed</label>
        <input
          type="checkbox"
          id="completed"
          name="completed"
          value={completed.toString()}
          onChange={handleChange("completed")}
          checked={completed === true}
        />
      </div>
      <div className="input-control toggler">
        <label htmlFor="important"> Toggle Important</label>
        <input
          type="checkbox"
          id="important"
          name="important"
          value={important.toString()}
          onChange={handleChange("important")}
          checked={important === true}
        />
      </div>

      <div className="submit-btn flex justify-end">
        <Button
          type="submit"
          name={action === "create" ? "Create Task" : "Edit Task"}
          icon={plus}
          padding="0.8rem 2rem"
          borderRad="0.8rem"
          fw="500"
          fs="1.2rem"
          background={theme.colorGreenDark}
          color={theme.colorGrey1}
          isLoading={isLoading}
        />
      </div>
    </CreateContentStyled>
  );
};

const CreateContentStyled = styled.form`
  > h1 {
    font-size: clamp(1.2rem, 5vw, 1.6rem);
    font-weight: 600;
  }

  color: ${(props) => props.theme.colorGrey1};

  .input-control {
    position: relative;
    margin: 1.6rem 0;
    font-weight: 500;

    label {
      margin-bottom: 0.5rem;
      font-size: clamp(0.9rem, 5vw, 1.2rem);

      span {
        color: ${(props) => props.theme.colorGrey3};
      }
    }

    input,
    textarea {
      width: 100%;
      padding: 1rem;
      resize: none;
      background-color: ${(props) => props.theme.colorGreyDark};
      color: ${(props) => props.theme.colorGrey2};
      border-radius: 0.5rem;
    }
  }

  .submit-btn button {
    transition: all 0.3s ease-in-out;

    i {
      color: ${(props) => props.theme.colorGrey0};
    }

    &:hover {
      background-color: ${(props) => props.theme.colorPrimaryGreen} !important;
    }
  }

  .toggler {
    display: flex;
    align-items: center;
    justify-content: space-between;

    cursor: pointer;

    label {
      flex: 1;
    }

    input {
      width: initial;
    }
  }
`;

export default CreateContent;
