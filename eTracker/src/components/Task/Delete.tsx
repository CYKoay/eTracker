import { useContext, useState } from "react";
import { AppContext } from "../../App";
import { db } from "../../firebase/firebaseConfig";
import { deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Button, Text } from "@chakra-ui/react";
import Popup from "reactjs-popup";
import { Tasks } from "./TaskList";

interface Props {
  task: Tasks;
}

const Delete = ({ task }: Props) => {
  const { dataChange, setDataChange } = useContext(AppContext);
  const [errMsg, setErrMsg] = useState(false);
  const [open, setOpen] = useState(false);
  const closePopup = () => setOpen(false);
  const [deleteCon, setDeleteCon] = useState("");
  const navigate = useNavigate();

  const onDeleteTask = async (title: string, id: string) => {
    if (deleteCon == title) {
      try {
        const taskToDelete = doc(db, "task", id);
        await deleteDoc(taskToDelete);
        closePopup();
        setDataChange(!dataChange);
        navigate("/task");
        setErrMsg(false);
      } catch (err) {
        console.log(err);
      }
    } else if (deleteCon !== title) {
      setErrMsg(true);
    }
  };

  return (
    <Button onClick={() => setOpen(!open)}>
      DELETE
      <Popup open={open} onClose={closePopup} modal nested>
        <form>
          <div className="col25">
            <label htmlFor="confirmation">
              Please enter the title for confirmation:{" "}
            </label>
          </div>
          <div className="col75">
            <textarea
              id="confirmation"
              onChange={(e) => setDeleteCon(e.target.value)}
              placeholder="Type the confirmation here..."
            ></textarea>
            {errMsg === true && (
              <div>
                <Text color="red">Confirmation failed, please try again!</Text>
              </div>
            )}
          </div>
          <Button
            marginTop={10}
            marginLeft="25%"
            onClick={() => onDeleteTask(task.title, task.id)}
          >
            DELETE TASK
          </Button>
        </form>
      </Popup>
    </Button>
  );
};

export default Delete;
