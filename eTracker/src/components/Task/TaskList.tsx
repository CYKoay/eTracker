import { useEffect, useState, useContext } from "react";
import { auth, db } from "../../firebase/firebaseConfig";
import { BsFillCircleFill } from "react-icons/bs";
import { collection, getDocs } from "firebase/firestore";
import {
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { IconContext } from "react-icons";
import Task from "./Task";
import { useAuthState } from "react-firebase-hooks/auth";
import { AppContext } from "../../App";
import SortSelector from "../SortSelector";

export interface Tasks {
  id: string;
  category: string;
  title: string;
  creationDate: string;
  creator: string;
  status: boolean;
  completionDate: string;
  deadline: string;
  description: string;
  creatorId: string;
  tat: number;
  comment: string;
}

const TaskList = () => {
  const { dataChange, setDataChange } = useContext(AppContext);
  const [sortCriteria, setSortCriteria] = useState<keyof Tasks>("tat");
  const listRef = collection(db, "task");
  const [taskList, setTaskList] = useState<Tasks[] | null>();

  const [user] = useAuthState(auth);
  const getList = async () => {
    const data = await getDocs(listRef);
    const rawTaskList = (await data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }))) as Tasks[];
    setTaskList(
      rawTaskList
        ?.filter((e) => e.creatorId == user?.uid && e.status === false)
        ?.map((e) => ({ ...e, tat: getTAT(e.deadline) }))
        ?.sort((e, prev) => e.tat - prev.tat)
    );
    setDataChange(!dataChange);
  };

  useEffect(() => {
    getList();
  }, [dataChange]);

  const onSelectSortOrder = (key: keyof Tasks) => {
    setSortCriteria(key);
    console.log(sortCriteria);
  };

  const sortedData = taskList?.sort((a, b) => {
    const valA = a[sortCriteria];
    const valB = b[sortCriteria];

    return valA < valB ? -1 : 1;
  });

  const getTAT = (deadline: any) => {
    const current = new Date();
    const tat =
      (Date.parse(deadline) - Date.parse(current.toDateString())) /
      (1000 * 3600 * 24);
    return tat;
  };

  return (
    <>
      <div className="header">
        <HStack>
          <h1> List of Current Task</h1>
          <SortSelector
            onSelectSortOrder={() => onSelectSortOrder(sortCriteria)}
          />
        </HStack>
      </div>
      <TableContainer margin="15px">
        <Table size="sm" variant="striped" width="100%" align="center">
          <Thead>
            <Tr>
              <Th>Status</Th>
              <Th>Category</Th>
              <Th>Title</Th>
              <Th>Created By</Th>
              <Th>Creation Date</Th>
              <Th>Time Remaining</Th>
            </Tr>
          </Thead>
          <Tbody>
            {sortedData?.map((e) => (
              <Tr key={e.id}>
                <Td>
                  {getTAT(e.deadline) <= 0 ? (
                    <IconContext.Provider value={{ color: "red" }}>
                      <div>
                        <BsFillCircleFill />
                      </div>
                    </IconContext.Provider>
                  ) : getTAT(e.deadline) < 2 ? (
                    <IconContext.Provider value={{ color: "yellow" }}>
                      <div>
                        <BsFillCircleFill />
                      </div>
                    </IconContext.Provider>
                  ) : (
                    <IconContext.Provider value={{ color: "green" }}>
                      <div>
                        <BsFillCircleFill />
                      </div>
                    </IconContext.Provider>
                  )}
                </Td>
                <Td>{e.category}</Td>
                <Td>
                  <Task task={e} />
                </Td>
                <Td>{e.creator}</Td>
                <Td>{e.creationDate}</Td>
                <Td>
                  {getTAT(e.deadline) < 0
                    ? "Expired"
                    : getTAT(e.deadline) + " Days"}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TaskList;
