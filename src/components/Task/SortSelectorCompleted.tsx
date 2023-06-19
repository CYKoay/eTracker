import {
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import { Tasks } from "../../App";
import { GrSort } from "react-icons/gr";

interface Props {
  onSelectSortOrder: (key: keyof Tasks) => void;
  sortCriteria: string;
}

const SortSelectorCompleted = ({ onSelectSortOrder, sortCriteria }: Props) => {
  const sortOrders = [
    { value: "completionDate", label: "Completion Date" },
    { value: "creationDate", label: "Creation Date" },
    { value: "category", label: "Category" },
    { value: "title", label: "Title" },
  ];

  const currentSortOrder = sortOrders.find(
    (order) => order.value == sortCriteria
  );

  return (
    <Menu>
      <MenuButton bg="#9F838C" as={Button} rightIcon={<BsChevronDown />}>
        <HStack>
          <GrSort />
          <Text marginLeft={1} className="toHide">
            Order by: {currentSortOrder?.label || "Completion Date"}
          </Text>
        </HStack>
      </MenuButton>
      <MenuList>
        {sortOrders.map((order) => (
          <MenuItem
            onClick={() => onSelectSortOrder(order.value as keyof Tasks)}
            key={order.value}
            value={order.value}
          >
            {order.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default SortSelectorCompleted;
