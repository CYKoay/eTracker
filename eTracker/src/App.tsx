import { Grid, GridItem, Show } from "@chakra-ui/react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Router>
        <Grid
          templateAreas={{ base: `"nav" "main"`, lg: `"nav nav" "side main"` }}
          templateColumns={{ base: "1fr", lg: "1fr 2fr" }}
        >
          <GridItem bg="red" area={"nav"}>
            <Navbar />
          </GridItem>
          <Show above="lg">
            <GridItem bg="blue" area={"side"}>
              Side
            </GridItem>
          </Show>

          <GridItem bg="green" area={"main"}>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/task"></Route>
              <Route path="/history"></Route>
            </Routes>
          </GridItem>
        </Grid>
      </Router>
    </>
  );
}

export default App;
