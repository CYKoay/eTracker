import { Box, Flex, Spacer } from "@chakra-ui/react";
import CreateTask from "./CreateTask";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <Flex>
        <Box>
          <Link to={"/task"}>Task List</Link>
        </Box>
        <Spacer />
        <Box bg="white" color={"black"} margin={2} height={10} borderRadius={5}>
          <CreateTask />
        </Box>
      </Flex>
    </div>
  );
};

export default Navbar;
