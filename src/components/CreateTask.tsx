import { Button, Text, Tooltip } from "@chakra-ui/react";
import Popup from "reactjs-popup";
import "./Popup/Popup.css";
import * as yup from "yup";
import { auth, db } from "../firebase/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { useContext, useState } from "react";
import { AppContext } from "../App";
import { AiOutlineFileAdd } from "react-icons/ai";

interface FormData {
  category: string;
  title: string;
  description: string;
  deadline: string;
}

const CreateTask = () => {
  const [open, setOpen] = useState(false);
  const closePopup = () => setOpen(false);
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const { dataChange, setDataChange } = useContext(AppContext);

  const schema = yup.object({
    category: yup.string().min(1, "Please Select A Category"),
    title: yup
      .string()
      .required("You must add a title")
      .max(30, "The title must be lesser than 30 words."),
    description: yup
      .string()
      .required("You must add a description")
      .max(500, "Your description must be lesser than 500 words."),
    deadline: yup.string().required("Please Select the Priority Level"),
  });

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const dataRef = collection(db, "task");
  const getCurrentDate = () => {
    const current = new Date();
    return current.toDateString();
  };

  const getDeadline = (data: number) => {
    const current = new Date();
    const deadlineTime = current.getTime() + data * (1000 * 3600 * 24);
    const deadlineDate = new Date(deadlineTime).toDateString();
    return deadlineDate;
  };

  const onCreateTask = async (data: FormData) => {
    await addDoc(dataRef, {
      category: data.category,
      completionDate: "",
      creationDate: getCurrentDate(),
      deadline: getDeadline(Number(data.deadline)),
      creator: user?.displayName,
      creatorId: user?.uid,
      description: data.description,
      status: false,
      title: data.title,
      comment: "",
    });
    reset();
    closePopup();
    setDataChange(!dataChange);
    navigate("/task");
  };

  return (
    <>
      <Tooltip label="Create Task">
        <Button
          fontFamily={"'Belanosima', sans-serif"}
          onClick={() => setOpen(!open)}
        >
          <AiOutlineFileAdd />
          <Text marginLeft={1} className="toHide">
            Create Task
          </Text>
        </Button>
      </Tooltip>
      <Popup open={open} onClose={closePopup} modal nested>
        <button className="close" onClick={() => setOpen(false)}>
          &times;
        </button>
        <Text className="popupHeader">Create New Task</Text>
        <form id="createTaskForm" onSubmit={handleSubmit(onCreateTask)}>
          <div className="col40">
            <label htmlFor="category">Category: </label>
          </div>
          <div className="col60">
            <select {...register("category")}>
              <option value="" label="Select a Category" hidden>
                Select a Category
              </option>
              <option value="Chores">Chores</option>
              <option value="Learning">Learning</option>
              <option value="Work">Work</option>
              <option value="Others">Others</option>
            </select>
            {errors && <Text color="red">{errors.category?.message}</Text>}
          </div>
          <div className="col40">
            <label htmlFor="title">Title: </label>
          </div>
          <div className="col60">
            <input
              type="text"
              placeholder="Title..."
              {...register("title")}
            ></input>
            {errors && <Text color="red">{errors.title?.message}</Text>}
          </div>

          <div className="col40">
            <label htmlFor="description">Description: </label>
          </div>
          <div className="col60">
            <textarea
              placeholder="Description..."
              {...register("description")}
            ></textarea>
            {errors && <Text color="red">{errors.description?.message}</Text>}
          </div>

          <div className="col40">
            <label htmlFor="priority">Priority: </label>
          </div>
          <div className="col60">
            <select
              {...register("deadline")}
              onChange={(e) => setValue("deadline", e.target.value)}
            >
              <option value="" hidden>
                Select the Priority Level
              </option>
              <option value="1">Urgent!</option>
              <option value="3">High</option>
              <option value="5">Medium</option>
              <option value="7">Low</option>
            </select>
            {errors && <Text color="red">{errors.deadline?.message}</Text>}
          </div>
          <Button marginTop={5} marginLeft={"40%"} type="submit" bg="teal">
            Create Task
          </Button>
        </form>
      </Popup>
    </>
  );
};

export default CreateTask;
