import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebaseConfig";
import { HStack, Image, Text } from "@chakra-ui/react";

const SideBar = () => {
  const [user] = useAuthState(auth);

  return (
    <>
      <HStack marginLeft={5} marginTop={5}>
        <Image
          src={user?.photoURL || ""}
          alt="User profile picture"
          height="50px"
          width="50px"
          borderRadius={10}
          marginRight={3}
        />
        <Text fontSize={"xl"}>{user?.displayName}</Text>
      </HStack>
    </>
  );
};

export default SideBar;
