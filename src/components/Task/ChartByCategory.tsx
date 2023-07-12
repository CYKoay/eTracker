import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js/auto";
import { useState } from "react";
import { Card, CardBody, Text } from "@chakra-ui/react";
import { Tasks } from "../../App";

ChartJS.register(ArcElement, Legend, Tooltip);
ChartJS.defaults.plugins.legend.position = "right";

interface Props {
  category: string;
  tasks: Tasks[];
}

const ChartByCategory = ({ category, tasks }: Props) => {
  const tatCategory = ["<1 days", "1-2 days", ">2 days"];

  const filteredList = tasks?.filter((e) => e.category == category);

  const [data] = useState({
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
    tasks?.filter((e) => e.category == category && e.status == false).length ==
    0
  ) {
    return null;
  }

  return (
    <Card
      width="90%"
      height="90%"
      marginX="auto"
      borderRadius={15}
      bg="#FFF2F2"
      border="none"
      boxShadow={"none"}
    >
      <CardBody paddingTop={-2} paddingBottom={4} textAlign={"center"}>
        <Text
          paddingTop={1}
          fontFamily={"'Belanosima', sans-serif"}
          fontWeight={"600"}
          color="#222E50"
          fontSize={"medium"}
        >
          {category}
        </Text>
        <Doughnut data={data}></Doughnut>
      </CardBody>
    </Card>
  );
};

export default ChartByCategory;
