import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  HStack,
  TableContainer,
} from "@chakra-ui/react";
import { TaskContext, Tasks } from "../../App";
import { useContext, useEffect, useState } from "react";
import SortSelectorCompleted from "./SortSelectorCompleted";
import CompletedTasks from "./CompletedTasks";
import Filter from "./Filter";
import Login from "../Login";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebaseConfig";

const History = () => {
  const [filterCriteria, setFilterCriteria] = useState("");
  const [sortCriteria, setSortCriteria] =
    useState<keyof Tasks>("completionDate");
  const [user] = useAuthState(auth);
  const { taskList } = useContext(TaskContext);

  useEffect(() => {
    document.title = "Completed Tasks";
  }, []);

  const completedTask = taskList?.filter(
    (e) => e.status === true && e.creatorId === user?.uid
  );

  const onSelectSortOrder = (key: keyof Tasks) => [setSortCriteria(key)];

  const sortedData = completedTask?.sort((a, b) => {
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
      <HStack
        justify={"space-between"}
        marginX="20px"
        maxH="70%"
        overflowY="auto"
      >
        <div className="header">
          <Text
            fontSize="4xl"
            fontFamily={"'Belanosima', sans-serif"}
            color="#222E50"
            fontWeight={"600"}
          >
            List of Completed Task
          </Text>
        </div>
        <SortSelectorCompleted
          sortCriteria={sortCriteria}
          onSelectSortOrder={(e) => onSelectSortOrder(e)}
        />
      </HStack>
      <Filter filterCriteria={filterCriteria} onSelect={(e) => onSelect(e)} />
      <TableContainer
        margin="20px"
        maxH="60%"
        overflowY="auto"
        borderRadius={10}
      >
        <Table
          size="sm"
          width="100%"
          align="center"
          variant="unstyled"
          color="white"
        >
          <Thead bg="#3F403F">
            <Tr height="40px">
              <Th style={{ width: "10%" }}>Category</Th>
              <Th style={{ width: "40%" }}>Title</Th>
              <Th className="toHide" style={{ width: "15%" }}>
                Creation Date
              </Th>
              <Th style={{ width: "15%" }}>Completion Date</Th>
              <Th style={{ width: "20%" }}>Details</Th>
            </Tr>
          </Thead>
          <Tbody fontWeight={"bold"}>
            {filterCriteria == ""
              ? sortedData?.map((e) => (
                  <Tr height={"70px"} key={e.id} className="tableRow">
                    <Td>{e.category}</Td>
                    <Td>{e.title}</Td>
                    <Td className="toHide">{e.creationDate}</Td>
                    <Td>{e.completionDate}</Td>
                    <Td>
                      <CompletedTasks task={e} />
                    </Td>
                  </Tr>
                ))
              : sortedData
                  ?.filter((e) => e.category == filterCriteria)
                  .map((e) => (
                    <Tr key={e.id} className="tableRow" height={"70px"}>
                      <Td>{e.category}</Td>
                      <Td>{e.title}</Td>
                      <Td className="toHide">{e.creationDate}</Td>
                      <Td>{e.completionDate}</Td>
                      <Td>
                        <CompletedTasks task={e} />
                      </Td>
                    </Tr>
                  ))}
          </Tbody>
        </Table>
      </TableContainer>
      {filterCriteria == "" && sortedData?.length == 0 && (
        <Text fontSize={"3xl"} color="#3F403F" className="emptyTable">
          No Record Found
        </Text>
      )}
      {filterCriteria !== "" &&
        sortedData?.filter((e) => e.category == filterCriteria).length == 0 && (
          <Text fontSize={"3xl"} color="#3F403F" className="emptyTable">
            No Record Found
          </Text>
        )}
    </>
  );
};

export default History;
