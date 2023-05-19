import { Grid, GridItem, Show } from "@chakra-ui/react";

function App() {
  return (
    <>
      <Grid
        templateAreas={{ base: `"nav" "main"`, lg: `"nav nav" "side main"` }}
        templateColumns={{ base: "1fr", lg: "1fr 2fr" }}
      >
        <GridItem bg="red" area={"nav"}>
          Navbar
        </GridItem>
        <Show above="lg">
          <GridItem bg="blue" area={"side"}>
            Side
          </GridItem>
        </Show>
        <GridItem bg="green" area={"main"}>
          Main
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
