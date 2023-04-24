import { useState } from "react";

import { DateTime } from "luxon";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

interface Props {
  years: number[];
}

export const YearDropdown: React.FC<Props> = ({ years }) => {
  const [selectedYear, setSelectedYear] = useState(DateTime.now().year);

  const handleSelectYear = (e) => {
    const valueNumber = +e;
    setSelectedYear(valueNumber);
  };
  return (
    <Dropdown
      as={ButtonGroup}
      style={{ width: "130px" }}
      onSelect={handleSelectYear}
    >
      <Button variant="dark">{selectedYear}</Button>
      <Dropdown.Toggle split style={{ maxWidth: "25px" }} variant="dark" />
      <Dropdown.Menu>
        {years.map((year, index) => (
          <Dropdown.Item key={index} eventKey={year}>
            {year}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};
