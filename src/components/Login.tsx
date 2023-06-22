import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import errorImage from "../images/unauthorisedUser.jpg";
import { auth, provider } from "../firebase/firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();

  const logInWithGoogle = async () => {
    await signInWithPopup(auth, provider);
    navigate("/");
  };

  useEffect(() => {
    document.title = "Login";
  }, []);

  return (
    <>
      <Flex alignItems={"center"} flexDirection={"column"} marginTop={10}>
        <Image
          src={errorImage}
          alt="Error"
          width="80%"
          maxWidth={400}
          borderRadius={20}
        />
        <Box textAlign={"center"} marginTop={3}>
          <Text
            fontSize="2xl"
            fontFamily={"cursive"}
            color="black"
            fontWeight={"bold"}
          >
            Please Log In with Google Account To Proceed
          </Text>
        </Box>
        <Box
          bg="white"
          color="black"
          alignItems={"center"}
          margin={3}
          borderRadius={5}
        >
          <Button onClick={logInWithGoogle} width="100%">
            Log in with Google Account
          </Button>
        </Box>
      </Flex>
    </>
  );
};

export default Login;
