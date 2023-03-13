import { useState } from "react";

import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import { Warehouse } from "../../types/Warehouse";

interface Month {
  monthName: string;
  monthValue: number;
}

interface Props {
  type?: string;
  months?: Month[];
  warehouses?: Warehouse[] | [];
  year?: number;
  margin?: boolean;
  preSelectedItem?: any;
}

export const DatePickerDropdown: React.FC<Props> = ({
  type,
  months,
  warehouses,
  year,
  margin,
  preSelectedItem,
}) => {
  const [selectedItem, setSelectedItem] = useState<any>();

  return (
    <>
      <Dropdown as={ButtonGroup} style={{ margin: "0px 10px" }}>
        <Button variant="dark">
          Warehouse {selectedItem ? selectedItem : `1`}
        </Button>
        <Dropdown.Toggle split variant="dark" />
        <Dropdown.Menu>
          {warehouses?.map((warehouse, index) => (
            <Dropdown.Item
              key={index}
              onClick={() => setSelectedItem(() => warehouse?.id)}
            >
              Warehouse {warehouse?.id}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};
