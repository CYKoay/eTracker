import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebaseConfig";
import { HStack, Image, Text } from "@chakra-ui/react";
import TaskCount from "./Task/TaskCount";

const SideBar = () => {
  const [user] = useAuthState(auth);

  return (
    <>
      {user && (
        <HStack marginLeft={5} marginTop={5}>
          <Image
            src={user?.photoURL || ""}
            alt="User profile picture"
            height="50px"
            width="50px"
            borderRadius={10}
            marginRight={3}
          />
          <Text fontFamily={"cursive"} fontSize={"xl"}>
            {user?.displayName}
          </Text>
        </HStack>
      )}
      {user && <TaskCount />}
    </>
  );
};

export default SideBar;
