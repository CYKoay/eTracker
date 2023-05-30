import { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import { BsFillCircleFill } from "react-icons/bs";
import { collection, getDocs } from "firebase/firestore";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { IconContext } from "react-icons";

interface Props {
  id: string;
  category: string;
  title: string;
  creationDate: string;
  tat: number;
  creator: string;
  status: boolean;
  completionDate: string;
  deadline: string;
}

const TaskList = () => {
  const listRef = collection(db, "task");
  const [taskList, setTaskList] = useState<Props[] | null>();
  const [pendingList, setPendingList] = useState<Props[] | null>();

  const getTAT = (deadline: any) => {
    const current = new Date();
    const tat =
      (Date.parse(deadline) - Date.parse(current.toDateString())) /
      (1000 * 3600 * 24);
    return tat;
  };

  const getList = async () => {
    const data = await getDocs(listRef);
    setTaskList(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Props[]
    );
    setPendingList(taskList?.filter((task) => task.status === false));
  };

  useEffect(() => {
    getList();
  });

  return (
    <>
      <div className="header">
        <h1> List of Current Task</h1>
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
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {pendingList?.map((e) => (
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
                <Td>{e.title}</Td>
                <Td>{e.creator}</Td>
                <Td>{e.creationDate}</Td>
                <Td>
                  {getTAT(e.deadline) < 0
                    ? "Expired"
                    : getTAT(e.deadline) + " Days"}
                </Td>
                <Td>Button</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TaskList;
