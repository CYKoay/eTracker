import { Grid, GridItem, Show } from "@chakra-ui/react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
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
          <Routes>
            <GridItem bg="green" area={"main"}>
              <Route path="/">Overview</Route>
              <Route path="/task">Tasks List</Route>
              <Route path="/history">Completed Tasks</Route>
              <Route>Overview</Route>
            </GridItem>
          </Routes>
        </Grid>
      </Router>
    </>
  );
}

export default App;
