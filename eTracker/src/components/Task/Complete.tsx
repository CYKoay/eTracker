import { Button } from "@chakra-ui/react";
import { useContext, useState } from "react";
import Popup from "reactjs-popup";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { Tasks } from "./TaskList";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";

interface Props {
  task: Tasks;
}

const Complete = ({ task }: Props) => {
  const { dataChange, setDataChange } = useContext(AppContext);
  const [taskComment, setTaskComment] = useState("");
  const [open, setOpen] = useState(false);
  const closePopup = () => setOpen(false);
  const navigate = useNavigate();
  const getCurrentDate = () => {
    const current = new Date();
    return current.toDateString();
  };

  const updateData = {
    comment: taskComment,
    completionDate: getCurrentDate(),
    status: true,
  };

  const onCompleteTask = async (id: string) => {
    const taskDoc = doc(db, "task", id);
    await updateDoc(taskDoc, updateData);
    closePopup();
    setDataChange(!dataChange);
    navigate("/task");
  };

  return (
    <Button onClick={() => setOpen(!open)}>
      COMPLETE
      <Popup open={open} onClose={closePopup} modal>
        <form>
          <div className="col25">
            <label htmlFor="comment">Comment: </label>
          </div>
          <div className="col75">
            <textarea
              id="comment"
              onChange={(e) => setTaskComment(e.target.value)}
              placeholder="Comment..."
            ></textarea>
          </div>
          <Button marginLeft="25%" onClick={() => onCompleteTask(task.id)}>
            COMPLETE TASK
          </Button>
        </form>
      </Popup>
    </Button>
  );
};

export default Complete;
