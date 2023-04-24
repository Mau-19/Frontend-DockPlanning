import { Dispatch, SetStateAction } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";

interface Props {
  weekNumber: number;
  setWeekNumber: Dispatch<SetStateAction<number>>;
  submitHandler?: () => void;
}

export const WeekPicker: React.FC<Props> = ({
  weekNumber,
  setWeekNumber,
  submitHandler,
}) => {
  const changeHandler = (e) => {
    const valueToNumber: number = +e.target.value;
    setWeekNumber(valueToNumber);
  };

  const incrementWeek = () => {
    setWeekNumber((prevWeek) => prevWeek + 1);
  };

  const decrementWeek = () => {
    setWeekNumber((prevWeek) => prevWeek - 1);
  };
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div
        style={{
          padding: "0px 8px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button variant="dark" onClick={decrementWeek}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </Button>
        <form
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0px 8px",
          }}
          onSubmit={(e) => e.preventDefault()}
        >
          <label htmlFor="weekNrInput" style={{ fontWeight: "bold" }}>
            Week
          </label>
          <input
            type="text"
            value={weekNumber}
            id="weekNrInput"
            style={{ maxWidth: "30px", marginLeft: "4px" }}
            onChange={changeHandler}
          />
        </form>

        <Button variant="dark" onClick={incrementWeek}>
          <FontAwesomeIcon icon={faChevronRight} />
        </Button>
      </div>
    </div>
  );
};
