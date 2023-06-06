import { Box, Button, Grid, GridItem, HStack } from "@chakra-ui/react";
import { useState } from "react";
import Popup from "reactjs-popup";
import { Tasks } from "./TaskList";
import Complete from "./Complete";
import Delete from "./Delete";

interface Props {
  task: Tasks;
}

const Task = ({ task }: Props) => {
  const [open, setOpen] = useState(false);
  const closePopup = () => setOpen(false);

  return (
    <>
      <Button
        height={8}
        marginTop={2}
        marginBottom={2}
        onClick={() => setOpen(!open)}
      >
        {task.title}
      </Button>
      <Popup open={open} onClose={closePopup} nested modal>
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
            <div className="col25">Turn-around-time:</div>
            <div className="col75">
              {task.tat >= 0 ? task.tat + " days" : "EXPIRED"}
            </div>
          </GridItem>
          <GridItem area={"side"}>
            <div className="col25">Created by: </div>
            <div className="col75">{task.creator}</div>
            <div className="col25">Creation date: </div>
            <div className="col75">{task.creationDate}</div>
            <div className="col25">Deadline: </div>
            <div className="col75">{task.deadline}</div>
          </GridItem>
          <GridItem area={"bottom"} marginTop={10}>
            <div className="col25">Description:</div>
            <div className="col75">
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
