import { Button, HStack } from "@chakra-ui/react";

interface Props {
  onSelect: (value: string) => void;
  filterCriteria: string;
}

const Filter = ({ onSelect, filterCriteria }: Props) => {
  const categories = [
    { value: "", label: "Show All" },
    { value: "Chores", label: "Chores" },
    { value: "Learning", label: "Learning" },
    { value: "Work", label: "Work" },
    { value: "Others", label: "Others" },
  ];
  return (
    <HStack margin="15px">
      {categories.map((category) => (
        <Button
          key={category.value}
          style={{
            backgroundColor:
              category.value == filterCriteria ? "teal" : "black",
          }}
          onClick={() => onSelect(category.value)}
        >
          {category.label}
        </Button>
      ))}
    </HStack>
  );
};

export default Filter;
