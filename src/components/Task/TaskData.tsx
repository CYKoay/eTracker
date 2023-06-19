import { AppContext, TaskContext, Tasks } from "../../App";
import { useContext, useEffect, useState } from "react";
import { db, auth } from "../../firebase/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, getDocs } from "firebase/firestore";

const TaskData = () => {
  const { setTaskList } = useContext(TaskContext);
  const { dataChange } = useContext(AppContext);
  const [user] = useAuthState(auth);
  const listRef = collection(db, "task");
  const [loaded, setLoaded] = useState(true);

  const getTAT = (deadline: any) => {
    const current = new Date();
    const tat =
      (Date.parse(deadline) - Date.parse(current.toDateString())) /
      (1000 * 3600 * 24);
    return tat;
  };

  //Get list from DB, set TAT, id and comment.
  //Return unfiltered list
  const getList = async () => {
    const data = await getDocs(listRef);
    return data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      tat: getTAT(doc.data().deadline),
    })) as Tasks[];
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await getList();
      const userData = result.filter((e) => e.creatorId == user?.uid);
      setTaskList(userData);
      if (userData.length !== 0) {
        localStorage.setItem("task", JSON.stringify(userData));
        console.log("saved");
      }
      setLoaded(!loaded);
    };
    fetchData();
  }, [dataChange]);

  useEffect(() => {
    const storageData = localStorage.getItem("task");
    if (storageData) {
      setTaskList(JSON.parse(storageData));
    }
  }, [loaded]);

  return <div></div>;
};

export default TaskData;
