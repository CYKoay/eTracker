import { Box, Flex, Spacer } from "@chakra-ui/react";
import CreateTask from "./CreateTask";

const Navbar = () => {
  return (
    <div>
      <Flex>
        <Box>
          <div>Navbar</div>
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
