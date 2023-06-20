import {
  Box,
  Button,
  Flex,
  Spacer,
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  Text,
  HStack,
  Tooltip,
} from "@chakra-ui/react";
import CreateTask from "./CreateTask";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";
import { HiUserCircle } from "react-icons/hi";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaHome } from "react-icons/fa";
import { MdPendingActions, MdDownloadDone } from "react-icons/md";

const Navbar = () => {
  const navigate = useNavigate();

  const signUserOut = async () => {
    await signOut(auth);
    navigate("/");
  };

  const [user] = useAuthState(auth);

  return (
    <div>
      <Flex marginLeft={3}>
        <Box>
          <Tooltip label="Home">
            <Button
              bg="#8B635C"
              fontFamily={"cursive"}
              color={"white"}
              marginY={3}
              marginLeft={2}
              height={10}
              borderRadius={5}
              onClick={() => navigate("/")}
            >
              <FaHome />
              <Text className="toHide" marginLeft={1}>
                Home
              </Text>
            </Button>
          </Tooltip>
          <Tooltip label="Pending Tasks">
            <Button
              bg="#8B635C"
              color={"white"}
              fontFamily={"cursive"}
              marginY={3}
              marginLeft={2}
              height={10}
              borderRadius={5}
              onClick={() => navigate("/task")}
            >
              <MdPendingActions />
              <Text className="toHide" marginLeft={1}>
                Pending Tasks
              </Text>
            </Button>
          </Tooltip>
          <Tooltip label="Completed Tasks">
            <Button
              bg="#8B635C"
              color={"white"}
              fontFamily={"cursive"}
              marginY={3}
              marginLeft={2}
              height={10}
              borderRadius={5}
              onClick={() => navigate("/history")}
            >
              <MdDownloadDone />
              <Text className="toHide" marginLeft={1}>
                Completed Tasks
              </Text>
            </Button>
          </Tooltip>
        </Box>
        <Spacer />
        {user && (
          <>
            <Box
              bg="#F9E4BB"
              color={"black"}
              fontFamily={"cursive"}
              margin={3}
              height={10}
              borderRadius={5}
            >
              <CreateTask />
            </Box>

            <Popover>
              <PopoverTrigger>
                <Button
                  height="40px"
                  width="40px"
                  padding="0px"
                  marginRight={3}
                  marginY={3}
                >
                  <HiUserCircle />
                </Button>
              </PopoverTrigger>
              <Portal>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverHeader fontFamily={"cursive"} fontWeight={"bold"}>
                    Current User
                  </PopoverHeader>
                  <PopoverCloseButton />
                  <PopoverBody>
                    <Text marginBottom={2} fontFamily={"cursive"}>
                      {user?.displayName}
                    </Text>
                    <Text marginBottom={2} fontFamily={"cursive"}>
                      {user?.email}
                    </Text>
                    <HStack justify={"right"} marginTop={8}>
                      <Button onClick={signUserOut}>Log Out</Button>
                    </HStack>
                  </PopoverBody>
                </PopoverContent>
              </Portal>
            </Popover>
          </>
        )}
      </Flex>
    </div>
  );
};

export default Navbar;
