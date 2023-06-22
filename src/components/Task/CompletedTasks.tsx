import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { IconContext } from "react-icons";
import { BsFillCircleFill } from "react-icons/bs";
import { Tasks } from "../../App";

interface Props {
  task: Tasks;
}

const CompletedTasks = ({ task }: Props) => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  console.log(task.comment);
  return (
    <>
      <Button onClick={onOpen} bg="#9F838C" color="white">
        Expand details
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="lg">
        <DrawerOverlay />
        <DrawerContent
          backgroundColor="#4d3b44"
          fontFamily={"cursive"}
          color="white"
        >
          <Box marginLeft={3}>
            <DrawerCloseButton />
            <DrawerHeader
              fontSize="3xl"
              fontWeight={"bold"}
              marginY="30px"
              textAlign={"center"}
            >
              {task.title}
            </DrawerHeader>
            <DrawerBody className="historyDescription">
              <div className="col40">Status: </div>
              <div className="col60">
                {task.status == true && (
                  <>
                    <HStack spacing={3}>
                      <Text>Completed</Text>
                      <IconContext.Provider value={{ color: "#90EC65" }}>
                        <div>
                          <BsFillCircleFill />
                        </div>
                      </IconContext.Provider>
                    </HStack>
                  </>
                )}
              </div>
              <div className="col40">Category: </div>
              <div className="col60">{task.category}</div>
              <div className="col40">Created By:</div>
              <div className="col60">{task.creator}</div>
              <div className="col40">Creation Date: </div>
              <div className="col60">{task.creationDate}</div>
              <div className="col40">Completion Date:</div>
              <div className="col60">{task.completionDate}</div>

              <div className="col40">Description: </div>
              <div className="col60">{task.description}</div>

              <div className="col40">Comment: </div>
              <div className="col60">
                <Box className="descriptionBox">{task.comment}</Box>
              </div>
            </DrawerBody>
          </Box>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CompletedTasks;
