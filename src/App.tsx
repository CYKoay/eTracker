import { Grid, GridItem, Show } from "@chakra-ui/react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import TaskList from "./components/Task/TaskList";
import "./App.css";
import { useState, createContext, Dispatch, SetStateAction } from "react";
import SideBar from "./components/SideBar";
import TaskData from "./components/Task/TaskData";
import History from "./components/Task/History";

export interface AppContextProps {
  dataChange: boolean;
  setDataChange: Dispatch<SetStateAction<boolean>>;
}

export const AppContext = createContext<AppContextProps>({
  dataChange: true,
  setDataChange: () => {},
});

export interface Tasks {
  id: string;
  category: string;
  title: string;
  creationDate: string;
  creator: string;
  status: boolean;
  completionDate: string;
  deadline: string;
  description: string;
  creatorId: string;
  tat: number;
  comment: string;
}

export interface TaskContextProps {
  taskList: Tasks[] | null;
  setTaskList: Dispatch<SetStateAction<Tasks[] | null>>;
}

export const TaskContext = createContext<TaskContextProps>({
  taskList: null,
  setTaskList: () => {},
});

function App() {
  const [dataChange, setDataChange] = useState(true);
  const [taskList, setTaskList] = useState<Tasks[] | null>(null);

  return (
    <>
      <AppContext.Provider value={{ dataChange, setDataChange }}>
        <TaskContext.Provider value={{ taskList, setTaskList }}>
          <Router basename="/eTracker">
            <Grid
              height="100vh"
              templateAreas={{
                base: `"nav" "main"`,
                lg: `"nav nav" "side main"`,
              }}
              templateColumns={{ base: "1fr", lg: "1fr 4fr" }}
            >
              <GridItem
                bg="#6F5060"
                area={"nav"}
                height="10vh"
                minHeight="60px"
              >
                <Navbar />
                <TaskData />
              </GridItem>
              <Show above="lg">
                <GridItem bg="#BCABAE" area={"side"}>
                  <SideBar />
                </GridItem>
              </Show>

              <GridItem
                bg="#DBD3D8"
                area={"main"}
                height="90vh"
                maxHeight="90vh"
                overflowY="auto"
              >
                <Routes>
                  <Route path="/" element={<Home />}></Route>
                  <Route path="/task" element={<TaskList />}></Route>
                  <Route path="/history" element={<History />}></Route>
                </Routes>
              </GridItem>
            </Grid>
          </Router>
        </TaskContext.Provider>
      </AppContext.Provider>
    </>
  );
}

export default App;
