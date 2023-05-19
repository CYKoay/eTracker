import { Box, Flex, Text } from "@chakra-ui/react";
import errorImage from "../images/unauthorisedUser.jpg";
import { auth, provider } from "../firebase/firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const logInWithGoogle = async () => {
    await signInWithPopup(auth, provider);
    navigate("/");
  };

  return (
    <>
      <Flex alignItems={"center"} flexDirection={"column"}>
        <img src={errorImage} alt="Error" width={400} />
        <Box alignItems={"center"} marginTop={3}>
          <Text fontSize="2xl">
            Please Log In with Google Account To Proceed
          </Text>
        </Box>
        <Box
          bg="white"
          alignItems={"center"}
          margin={3}
          paddingX={3}
          borderRadius={5}
        >
          <button onClick={logInWithGoogle}>Log in with Google Account</button>
        </Box>
      </Flex>
    </>
  );
};

export default Login;
