import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js/auto";
import { TaskContext } from "../../App";
import { useContext, useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  GridItem,
  Text,
} from "@chakra-ui/react";

ChartJS.register(ArcElement, Legend, Tooltip);
ChartJS.defaults.plugins.legend.position = "right";

interface Props {
  category: string;
}

const ChartByCategory = ({ category }: Props) => {
  const tatCategory = ["<1 days", "1-2 days", ">2 days"];

  const { taskList } = useContext(TaskContext);
  const filteredList = taskList?.filter((e) => e.category == category);

  const [data, setData] = useState({
    labels: tatCategory,
    datasets: [
      {
        label: "Number of tasks",
        data: [
          filteredList?.filter((e) => e.tat < 1 && e.status == false).length,
          filteredList?.filter(
            (e) => e.tat >= 1 && e.tat < 3 && e.status == false
          ).length,
          filteredList?.filter((e) => e.tat >= 3 && e.status == false).length,
        ],
        backgroundColor: ["#FF4A4A", "#FFE766", "#90EC65"],
        borderColor: ["transparent"],
      },
    ],
  });

  if (
    taskList?.filter((e) => e.category == category && e.status == false)
      .length == 0
  ) {
    return null;
  }

  return (
    <Card
      width="245px"
      height={"220px"}
      marginY={3}
      marginX="auto"
      borderRadius={15}
      bg="#FFF2F2"
      border="none"
      boxShadow={"none"}
    >
      <CardBody paddingTop={-2} paddingBottom={4} textAlign={"center"}>
        <Text
          paddingTop={1}
          fontFamily={"cursive"}
          fontWeight={"bold"}
          color="#222E50"
        >
          {category}
        </Text>
        <Doughnut data={data}></Doughnut>
      </CardBody>
    </Card>
  );
};

export default ChartByCategory;
