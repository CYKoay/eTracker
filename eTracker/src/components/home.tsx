import { auth } from "../firebase/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "./Login";
import GeneralChart from "./Task/GeneralChart";
import ChartByCategory from "./Task/ChartByCategory";
import { Box, Card, CardBody, Grid, GridItem, Text } from "@chakra-ui/react";

export const categories = ["Chores", "Learning", "Work", "Others"];

const Home = () => {
  const [user] = useAuthState(auth);

  if (!user) {
    return <Login />;
  }
  return (
    <>
      <Grid
        templateAreas={{
          base: `"main" "side"`,
          lg: `"main side"`,
        }}
        templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
      >
        <GridItem area={"main"} margin="auto">
          <Card
            width="500px"
            height="550px"
            margin="25px"
            border="none"
            shadow={"none"}
          >
            <CardBody bg="#DBD3D8" border="none">
              <Box
                borderRadius={15}
                bg="#222E50"
                height={"50px"}
                textAlign={"center"}
              >
                <Text
                  fontSize="xl"
                  paddingY="10px"
                  fontFamily={"cursive"}
                  fontWeight={"bold"}
                  color="white"
                >
                  Breakdown of Pending Tasks by Categories
                </Text>
              </Box>
              <GeneralChart />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem
          area={"side"}
          marginX="5vh"
          marginY="2vh"
          height="600px"
          width="90%"
          bg="#C1BABA"
          borderRadius={15}
        >
          <Box textAlign={"center"} marginX="auto" marginY={4} paddingX="auto">
            <Text
              marginLeft="15px"
              fontSize="xl"
              paddingY="10px"
              color="black"
              fontFamily={"cursive"}
              fontWeight={"bold"}
            >
              Pending Tasks in each Categories
            </Text>
          </Box>
          <Grid templateColumns={"repeat(2,1fr)"}>
            {categories.map((category) => (
              <ChartByCategory category={category} key={category} />
            ))}
          </Grid>
        </GridItem>
      </Grid>
    </>
  );
};

export default Home;
