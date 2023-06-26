import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Divider,
  HStack,
  Tooltip,
} from "@chakra-ui/react";
import { IconContext } from "react-icons";
import { BsFillCircleFill } from "react-icons/bs";
import { TaskContext } from "../../App";
import { useContext } from "react";
import "./../../App.css";

const TaskCount = () => {
  const { taskList } = useContext(TaskContext);

  return (
    <Card
      marginTop="20%"
      marginX={5}
      backgroundColor={"#9F838C"}
      textAlign={"center"}
      borderRadius={10}
    >
      <CardHeader
        fontSize={"2xl"}
        fontFamily={"'Belanosima', sans-serif"}
        className="darkBackground"
      >
        Pending Tasks
      </CardHeader>
      <CardBody>
        <HStack marginBottom={3} justify={"space-evenly"}>
          <div>
            <IconContext.Provider value={{ color: "#FF4A4A" }}>
              <div>
                <BsFillCircleFill />
              </div>
            </IconContext.Provider>
          </div>
          <Tooltip
            placement="right"
            hasArrow
            label="Expired task or task with lesser than 1 day turn-around-time remaining"
          >
            <div>
              {taskList?.filter((e) => e.status == false && e.tat <= 0)
                .length == 0 ? (
                <Badge
                  width={10}
                  borderRadius={3}
                  fontSize="lg"
                  colorScheme="red"
                  fontFamily={"'Belanosima', sans-serif"}
                  className="darkBackground"
                >
                  0
                </Badge>
              ) : (
                <Badge
                  width={10}
                  borderRadius={3}
                  fontFamily={"'Belanosima', sans-serif"}
                  fontSize="lg"
                  colorScheme="red"
                  className="darkBackground"
                >
                  {
                    taskList?.filter((e) => e.status == false && e.tat <= 0)
                      .length
                  }
                </Badge>
              )}
            </div>
          </Tooltip>
        </HStack>
        <HStack marginBottom={3} justify={"space-evenly"}>
          <div>
            <IconContext.Provider value={{ color: "#FFE766" }}>
              <div>
                <BsFillCircleFill />
              </div>
            </IconContext.Provider>
          </div>
          <Tooltip
            placement="right"
            hasArrow
            label="Task with 1-2 days turn-around-time remaining"
          >
            <div>
              {taskList?.filter(
                (e) => e.status == false && e.tat > 0 && e.tat <= 2
              ).length == 0 ? (
                <Badge
                  width={10}
                  borderRadius={3}
                  fontSize="lg"
                  colorScheme="yellow"
                  fontFamily={"'Belanosima', sans-serif"}
                  className="darkBackground"
                >
                  0
                </Badge>
              ) : (
                <Badge
                  width={10}
                  borderRadius={3}
                  fontSize="lg"
                  colorScheme="yellow"
                  fontFamily={"'Belanosima', sans-serif"}
                  className="darkBackground"
                >
                  {
                    taskList?.filter(
                      (e) => e.status == false && e.tat > 0 && e.tat <= 2
                    ).length
                  }
                </Badge>
              )}
            </div>
          </Tooltip>
        </HStack>
        <HStack marginBottom={3} justify={"space-evenly"}>
          <div>
            <IconContext.Provider value={{ color: "#90EC65" }}>
              <div>
                <BsFillCircleFill />
              </div>
            </IconContext.Provider>
          </div>
          <Tooltip
            placement="right"
            hasArrow
            label="Task with 3 or more days turn-around-time remaining"
          >
            <div>
              {taskList?.filter((e) => e.status == false && e.tat > 2).length ==
              0 ? (
                <Badge
                  width={10}
                  borderRadius={3}
                  fontSize="lg"
                  colorScheme="green"
                  fontFamily={"'Belanosima', sans-serif"}
                  className="darkBackground"
                >
                  0
                </Badge>
              ) : (
                <Badge
                  width={10}
                  borderRadius={3}
                  fontSize="lg"
                  colorScheme="green"
                  fontFamily={"'Belanosima', sans-serif"}
                  className="darkBackground"
                >
                  {
                    taskList?.filter((e) => e.status == false && e.tat > 2)
                      .length
                  }
                </Badge>
              )}
            </div>
          </Tooltip>
        </HStack>
        <Divider
          orientation="horizontal"
          borderWidth={3}
          borderRadius={5}
          borderColor="white"
        />
        <HStack
          justify={"space-evenly"}
          marginTop={3}
          fontSize={"smaller"}
          fontWeight={"bold"}
          fontFamily={"'Belanosima', sans-serif"}
        >
          <div className="darkBackground">TOTAL: </div>
          <div>
            <Badge
              width={8}
              borderRadius={3}
              fontSize="medium"
              colorScheme="white"
              marginRight={5}
              fontFamily={"'Belanosima', sans-serif"}
              color="white"
            >
              {taskList?.filter((e) => e.status == false).length}
            </Badge>
          </div>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default TaskCount;
