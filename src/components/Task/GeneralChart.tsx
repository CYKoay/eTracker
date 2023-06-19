import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js/auto";
import { TaskContext } from "../../App";
import { useContext, useState } from "react";
import { categories } from "../Home";
import { Box, HStack, Text } from "@chakra-ui/react";
import { AiOutlineFileDone } from "react-icons/ai";

ChartJS.register(ArcElement, Legend, Tooltip);
ChartJS.defaults.plugins.legend.position = "right";

const GeneralChart = () => {
  const { taskList } = useContext(TaskContext);
  const [data] = useState({
    labels: categories,
    datasets: [
      {
        label: "Number of tasks",
        data: categories.map(
          (category) =>
            taskList?.filter((e) => e.status == false && e.category == category)
              .length
        ),
        backgroundColor: ["#222E50", "#007991", "#439A86", "#BDF7B7"],
        borderColor: ["transparent"],
      },
    ],
  });
  if (taskList?.filter((e) => e.status == false).length == 0) {
    return (
      <Box textAlign={"center"} height="50%" marginY="150px">
        <HStack>
          <AiOutlineFileDone color="black" fontSize="100px" />
          <Text
            fontSize={"2xl"}
            color="black"
            fontFamily={"cursive"}
            fontWeight={"bold"}
          >
            You're all caught up! There are no pending tasks!
          </Text>
        </HStack>
      </Box>
    );
  }

  return <Doughnut data={data}></Doughnut>;
};
export default GeneralChart;
