import { Box, Button, Grid, GridItem, HStack } from "@chakra-ui/react";
import { useState } from "react";
import Popup from "reactjs-popup";

import Complete from "./Complete";
import Delete from "./Delete";
import { Tasks } from "../../App";

interface Props {
  task: Tasks;
}

const Task = ({ task }: Props) => {
  const [open, setOpen] = useState(false);
  const closePopup = () => setOpen(false);

  return (
    <>
      <Button
        bg="#9F838C"
        className="taskButton"
        height={8}
        marginTop={2}
        marginBottom={2}
        overflow={"auto"}
        onClick={() => setOpen(!open)}
        width={"100%"}
      >
        {task.title}
      </Button>
      <Popup open={open} onClose={closePopup} nested modal>
        <button className="close" onClick={() => setOpen(false)}>
          &times;
        </button>
        {task.status === true ? (
          <Box className="statusBox" backgroundColor="#90EC65">
            <div className="status">COMPLETED</div>
          </Box>
        ) : task.tat >= 0 ? (
          <Box className="statusBox" backgroundColor="yellow">
            <div className="status"> PENDING</div>
          </Box>
        ) : (
          <Box className="statusBox" backgroundColor="#FF4A4A">
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
            <div className="col40">Title:</div>
            <div className="col60">{task.title}</div>
            <div className="col40">Category: </div>
            <div className="col60">{task.category}</div>
            <div className="col40">Turn-around-time:</div>
            <div className="col60">
              {task.tat >= 0 ? task.tat + " days" : "EXPIRED"}
            </div>
          </GridItem>
          <GridItem area={"side"}>
            <div className="col40">Created by: </div>
            <div className="col60">{task.creator}</div>
            <div className="col40">Creation date: </div>
            <div className="col60">{task.creationDate}</div>
            <div className="col40">Deadline: </div>
            <div className="col60">{task.deadline}</div>
          </GridItem>
          <GridItem area={"bottom"} marginTop={10}>
            <div className="col40">Description:</div>
            <div className="col60">
              <Box className="descriptionBox">{task.description}</Box>
            </div>
          </GridItem>
        </Grid>
        <HStack marginTop={10} justify="right">
          <Complete task={task} />
          <Delete task={task} />
        </HStack>
      </Popup>
    </>
  );
};

export default Task;
