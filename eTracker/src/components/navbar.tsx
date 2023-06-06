import { Box, Button, Flex, Spacer } from "@chakra-ui/react";
import CreateTask from "./CreateTask";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const navigate = useNavigate();

  const signUserOut = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div>
      <Flex>
        <Box bg="white" color={"black"} margin={3} height={10} borderRadius={5}>
          <CreateTask />
        </Box>
        <Box>
          <Link to={"/task"}>Task List</Link>
        </Box>
        <Spacer />
        <Box bg="white" color={"black"} margin={3} height={10} borderRadius={5}>
          <Button onClick={signUserOut}>Log Out</Button>
        </Box>
      </Flex>
    </div>
  );
};

export default Navbar;
