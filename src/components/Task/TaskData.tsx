import { AppContext, TaskContext, Tasks } from "../../App";
import { useContext, useEffect, useState } from "react";
import { db, auth } from "../../firebase/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, getDocs } from "firebase/firestore";

const TaskData = () => {
  const { setTaskList } = useContext(TaskContext);
  const { dataChange, setDataChange } = useContext(AppContext);
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
