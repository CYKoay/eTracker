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
import { Tasks } from "../App";
import { GrSort } from "react-icons/gr";

interface Props {
  onSelectSortOrder: (key: keyof Tasks) => void;
  sortCriteria: string;
}

const SortSelector = ({ onSelectSortOrder, sortCriteria }: Props) => {
  const sortOrders = [
    { value: "tat", label: "Turn-around-time" },
    { value: "creationDate", label: "Creation Date" },
    { value: "category", label: "Category" },
    { value: "title", label: "Title" },
  ];

  const currentSortOrder = sortOrders.find(
    (order) => order.value == sortCriteria
  );

  return (
    <Menu>
      <MenuButton
        bg="#9F838C"
        as={Button}
        color="white"
        rightIcon={<BsChevronDown />}
      >
        <HStack>
          <GrSort fontSize="20px" className="icon" />

          <Text
            marginLeft={1}
            fontWeight={"400"}
            className="toHide"
            fontFamily={"'Belanosima', sans-serif"}
          >
            Order by: {currentSortOrder?.label || "Turn-around-time"}
          </Text>
        </HStack>
      </MenuButton>
      <MenuList fontFamily={"'Belanosima', sans-serif"}>
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

export default SortSelector;
