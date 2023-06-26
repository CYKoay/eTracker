import { useState, useContext, useEffect } from "react";
import { BsFillCircleFill } from "react-icons/bs";
import {
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
} from "@chakra-ui/react";
import { IconContext } from "react-icons";
import Task from "./Task";
import { TaskContext, Tasks } from "../../App";
import SortSelector from "../SortSelector";
import Filter from "./Filter";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebaseConfig";
import Login from "../Login";

const TaskList = () => {
  const [sortCriteria, setSortCriteria] = useState<keyof Tasks>("tat");
  const [filterCriteria, setFilterCriteria] = useState("");
  const [pendingTaskList, setPendingTaskList] = useState<Tasks[] | null>(null);
  const [user] = useAuthState(auth);

  const { taskList } = useContext(TaskContext);

  useEffect(() => {
    const storedData = localStorage.getItem("task");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setPendingTaskList(parsedData.filter((e: Tasks) => e.status === false));
    }
  }, [taskList]);

  const onSelectSortOrder = (key: keyof Tasks) => {
    setSortCriteria(key);
  };

  useEffect(() => {
    document.title = "Pending Tasks";
  }, []);

  const sortedData = pendingTaskList?.sort((a, b) => {
    const valA = a[sortCriteria];
    const valB = b[sortCriteria];
    return valA < valB ? -1 : 1;
  });

  const onSelect = (category: string) => {
    setFilterCriteria(category);
  };

  if (!user) {
    return <Login />;
  }
  return (
    <>
      <HStack justify={"space-between"} marginX="20px">
        <div className="header">
          <Text
            fontSize="4xl"
            fontFamily={"'Belanosima', sans-serif"}
            color="#222E50"
            fontWeight={"600"}
          >
            List of Current Task
          </Text>
        </div>
        <SortSelector
          sortCriteria={sortCriteria}
          onSelectSortOrder={(e) => onSelectSortOrder(e)}
        />
      </HStack>

      <Filter filterCriteria={filterCriteria} onSelect={(e) => onSelect(e)} />
      <TableContainer
        margin="20px"
        maxH="70%"
        overflowY="auto"
        className="darkBackground"
        borderRadius={10}
      >
        <Table size="sm" variant="unstyled" width="100%" align="center">
          <Thead bg="#3F403F">
            <Tr height="40px">
              <Th style={{ width: "10%" }}>Status</Th>
              <Th style={{ width: "10%" }}>Category</Th>
              <Th style={{ width: "40%" }}>Title</Th>
              <Th className="toHide" style={{ width: "20%" }}>
                Created By
              </Th>
              <Th style={{ width: "10%" }}>Creation Date</Th>
              <Th style={{ width: "10%" }}>Time Remaining</Th>
            </Tr>
          </Thead>

          <Tbody fontWeight={"bold"}>
            {filterCriteria == ""
              ? sortedData?.map((e) => (
                  <Tr key={e.id} className="tableRow">
                    <Td>
                      {e.tat <= 0 ? (
                        <IconContext.Provider value={{ color: "#FF4A4A" }}>
                          <div>
                            <BsFillCircleFill />
                          </div>
                        </IconContext.Provider>
                      ) : e.tat < 3 ? (
                        <IconContext.Provider value={{ color: "#FFE766" }}>
                          <div>
                            <BsFillCircleFill />
                          </div>
                        </IconContext.Provider>
                      ) : (
                        <IconContext.Provider value={{ color: "#90EC65" }}>
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
                    <Td className="toHide">{e.creator}</Td>
                    <Td>{e.creationDate}</Td>
                    <Td>{e.tat < 0 ? "Expired" : e.tat + " Days"}</Td>
                  </Tr>
                ))
              : sortedData
                  ?.filter((e) => e.category == filterCriteria)
                  .map((e) => (
                    <Tr className={"tableRow"} key={e.id}>
                      <Td>
                        {e.tat <= 0 ? (
                          <IconContext.Provider value={{ color: "#FF4A4A" }}>
                            <div>
                              <BsFillCircleFill />
                            </div>
                          </IconContext.Provider>
                        ) : e.tat < 3 ? (
                          <IconContext.Provider value={{ color: "#FFE766" }}>
                            <div>
                              <BsFillCircleFill />
                            </div>
                          </IconContext.Provider>
                        ) : (
                          <IconContext.Provider value={{ color: "#90EC65" }}>
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
                      <Td className="toHide">{e.creator}</Td>
                      <Td>{e.creationDate}</Td>
                      <Td>{e.tat < 0 ? "Expired" : e.tat + " Days"}</Td>
                    </Tr>
                  ))}
          </Tbody>
        </Table>
      </TableContainer>
      {filterCriteria !== "" &&
        sortedData?.filter((e) => e.category == filterCriteria).length == 0 && (
          <Text fontSize={"3xl"} color="#3F403F" className="emptyTable">
            No Pending Task
          </Text>
        )}
      {filterCriteria == "" && sortedData?.length == 0 && (
        <Text fontSize={"3xl"} color="#3F403F" className="emptyTable">
          No Pending Task
        </Text>
      )}
    </>
  );
};

export default TaskList;
