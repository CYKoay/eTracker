import { auth } from "../firebase/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "./Login";
import GeneralChart from "./Task/GeneralChart";
import ChartByCategory from "./Task/ChartByCategory";
import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import { useEffect } from "react";

export const categories = ["Chores", "Learning", "Work", "Others"];

const Home = () => {
  const [user] = useAuthState(auth);
  useEffect(() => {
    document.title = "Home";
  }, []);

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
        <GridItem area={"main"} bg="#DBD3D8">
          <Box marginX="auto" className="generalChart">
            <Box
              marginX="auto"
              borderRadius={15}
              bg="#222E50"
              height={"50px"}
              textAlign={"center"}
              width="85%"
            >
              <Text className="generalChartTitle">
                Breakdown of Pending Tasks by Categories
              </Text>
            </Box>
            <Box marginX="auto">
              <GeneralChart />
            </Box>
          </Box>
        </GridItem>
        <GridItem
          area={"side"}
          marginX="5%"
          marginY="3%"
          height="95%"
          overflowY="auto"
          width="90%"
          bg="#C1BABA"
          borderRadius={15}
        >
          <Box textAlign={"center"} marginY={4} paddingX="auto">
            <Text
              marginLeft="15px"
              paddingY="10px"
              color="black"
              fontFamily={"'Belanosima', sans-serif"}
              fontWeight={"600"}
              className="categoryChart"
            >
              Pending Tasks in each Categories
            </Text>
          </Box>
          <Grid
            templateColumns={{ lg: "repeat(2,1fr)", base: "repeat(1,1fr)" }}
          >
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
