import { useEffect, useState, Dispatch, SetStateAction } from "react";

import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import { months } from "../../../SampleData";

interface Props {
  preSelectedItem?: any;
  month: number;
  setMonth: Dispatch<SetStateAction<number>>;
  getWeeksInMonth?: (year: number, month: number) => {};
}

export const MonthDropdown: React.FC<Props> = ({
  month,
  setMonth,
  getWeeksInMonth,
}) => {
  const [dropdownMonth, setDropdownMonth] = useState("");

  useEffect(() => {
    setDropdownMonth(months.find((m) => m.monthValue === month)?.monthName);
  }, [month]);

  const handleSetMonth = (e: number) => {
    const valueNumber: number = +e;
    setMonth(() => valueNumber);
    setDropdownMonth(
      () => months.find((m) => m.monthValue === valueNumber)?.monthName
    );
  };

  return (
    <Dropdown
      as={ButtonGroup}
      onSelect={handleSetMonth}
      style={{ width: "130px" }}
    >
      <Button variant="dark">{dropdownMonth}</Button>
      <Dropdown.Toggle split style={{ maxWidth: "25px" }} variant="dark" />
      <Dropdown.Menu>
        {months?.map((month, index) => (
          <Dropdown.Item key={index} eventKey={month.monthValue}>
            {month.monthName}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};
