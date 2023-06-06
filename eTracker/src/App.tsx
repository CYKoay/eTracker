import { Grid, GridItem, Show } from "@chakra-ui/react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import TaskList from "./components/Task/TaskList";
import "./App.css";
import { useState, createContext, Dispatch, SetStateAction } from "react";
import SideBar from "./components/SideBar";

export interface AppContextProps {
  dataChange: boolean;
  setDataChange: Dispatch<SetStateAction<boolean>>;
}

export const AppContext = createContext<AppContextProps>({
  dataChange: true,
  setDataChange: () => {},
});

function App() {
  const [dataChange, setDataChange] = useState(true);
  return (
    <>
      <AppContext.Provider value={{ dataChange, setDataChange }}>
        <Router>
          <Grid
            templateAreas={{
              base: `"nav" "main"`,
              lg: `"nav nav" "side main"`,
            }}
            templateColumns={{ base: "1fr", lg: "1fr 4fr" }}
          >
            <GridItem bg="red" area={"nav"} height="10vh">
              <Navbar />
            </GridItem>
            <Show above="lg">
              <GridItem bg="blue" area={"side"}>
                <SideBar />
              </GridItem>
            </Show>

            <GridItem bg="black" area={"main"} height="90vh">
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/task" element={<TaskList />}></Route>
                <Route path="/history"></Route>
              </Routes>
            </GridItem>
          </Grid>
        </Router>
      </AppContext.Provider>
    </>
  );
}

export default App;
