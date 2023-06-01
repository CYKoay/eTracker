import { Box, Button, Grid, GridItem } from "@chakra-ui/react";
import { useState } from "react";
import Popup from "reactjs-popup";
import { Tasks } from "./TaskList";

interface Props {
  task: Tasks;
}

const Task = ({ task }: Props) => {
  const [open, setOpen] = useState(false);
  const closePopup = () => setOpen(false);
  console.log(task.tat);
  return (
    <>
      <Button onClick={() => setOpen(!open)}>{task.title}</Button>
      <Popup open={open} onClose={closePopup} modal>
        {task.status === true ? (
          <Box className="statusBox" backgroundColor="green">
            <div className="status">COMPLETED</div>
          </Box>
        ) : task.tat >= 0 ? (
          <Box className="statusBox" backgroundColor="yellow.300">
            <div className="status"> PENDING</div>
          </Box>
        ) : (
          <Box className="statusBox" backgroundColor="red">
            <div className="status">EXPIRED</div>
          </Box>
        )}
        <Grid
          templateAreas={{
            base: `"main" "side" "bottom"`,
            lg: `"main side" "bottom bottom"`,
          }}
          templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
        >
          <GridItem area={"main"}>
            <div className="col25">Title:</div>
            <div className="col75">{task.title}</div>
            <div className="col25">Category: </div>
            <div className="col75">{task.category}</div>
          </GridItem>
          <GridItem area={"side"} bg="grey.500">
            <div className="col25">Status:</div>
            <div className="col75">
              {task.tat <= 0 ? (
                <p color="red">EXPIRED</p>
              ) : (
                <p color="yellow">PENDING</p>
              )}
            </div>
            <div className="col25">TAT:</div>
            <div className="col75">{task.tat}</div>
          </GridItem>
          <GridItem area={"bottom"} bg="grey.900">
            <div className="col25">Created by: </div>
            <div className="col75">{task.creator}</div>
            <div className="col25">Creation date: </div>
            <div className="col75">{task.creationDate}</div>
            <div className="col25">Deadline: </div>
            <div className="col75">{task.deadline}</div>
            <div className="col25">Description:</div>
            <div className="col75">{task.description}</div>
          </GridItem>
        </Grid>
      </Popup>
    </>
  );
};

export default Task;
