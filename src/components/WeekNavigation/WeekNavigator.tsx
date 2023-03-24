import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import Aler from "react-bootstrap/Alert";
import { Alert } from "react-bootstrap";

interface Props {
  dockId: string;
  weekNr: number;
}

export const WeekNavigator: React.FC<Props> = ({ dockId, weekNr }) => {
  const [weekToDisplay, setWeekToDisplay] = useState<string | number>(weekNr);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dockIdToNumber: number = +dockId;

  useEffect(() => {
    setWeekToDisplay(weekNr);
  }, [weekNr]);

  const submitHandler = (e) => {
    if (weekToDisplay < 1 || weekToDisplay > 52) {
      setError("The week you have chosen is not valid");
    } else {
      e.preventDefault();
      navigate(`/dock/${dockIdToNumber}/${weekToDisplay}`);
      setError("");
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div style={{ padding: "0px 8px" }}>
        <form
          onSubmit={submitHandler}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <label htmlFor="weekNrInput" style={{ fontWeight: "bold" }}>
            Week
          </label>
          <input
            type="text"
            value={weekToDisplay}
            id="weekNrInput"
            style={{ maxWidth: "30px", marginLeft: "4px" }}
            onChange={(e) => setWeekToDisplay(e.target.value)}
          />
          {error && <Alert variant="warning">{error}</Alert>}
        </form>
      </div>
    </div>
  );
};
