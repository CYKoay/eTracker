import { AppContext, TaskContext, Tasks } from "../../App";
import { useContext, useEffect } from "react";
import { db } from "../../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const TaskData = () => {
  const { setTaskList } = useContext(TaskContext);
  const { dataChange, setDataChange } = useContext(AppContext);

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

  //re-render on new day (hours , min, sec == 0)
  useEffect(() => {
    const renderOnNewDay = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      if (hours === 0 && minutes === 0 && seconds === 0) {
        setDataChange(!dataChange);
      }
    };

    //5 min interval
    const interval = 1000;

    const dayInterval = setInterval(renderOnNewDay, interval);

    return () => {
      clearInterval(dayInterval);
    };
  }, []);

  return <div></div>;
};

export default TaskData;
