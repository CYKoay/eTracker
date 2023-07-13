import { AppContext, TaskContext, Tasks } from "../../App";
import { useContext, useEffect } from "react";
import { db } from "../../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const TaskData = () => {
  const { setTaskList } = useContext(TaskContext);
  const { dataChange } = useContext(AppContext);

  const listRef = collection(db, "task");

  const getTAT = (deadline: any) => {
    const current = new Date();
    const tat =
      (Date.parse(deadline) - Date.parse(current.toDateString())) /
      (1000 * 3600 * 24);
    return tat;
  };

  //Get list from DB, set TAT, id and comment.
  //Return unfiltered list
  const fetchData = async () => {
    const result = await getDocs(listRef);
    const userData = result.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      tat: getTAT(doc.data().deadline),
    })) as Tasks[];
    setTaskList(userData);
  };

  useEffect(() => {
    fetchData();
  }, [dataChange]);

  return <div></div>;
};

export default TaskData;
