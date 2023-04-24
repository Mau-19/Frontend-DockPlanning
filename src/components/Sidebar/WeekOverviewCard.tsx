import { useEffect, useState } from "react";

import { DateTime } from "luxon";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import ProgressBar from "react-bootstrap/ProgressBar";

import { StyledProgressBar } from "./StyledProgressBar";
import { Timeslot } from "../../types/Timeslot";

interface Props {
  item?: number | string;
  totalCapacity?: number;
  capacity?: Timeslot[];
  week?: boolean;
}

export const WeekOverviewCard: React.FC<Props> = ({
  item,
  totalCapacity,
  capacity,
  week,
}) => {
  const [totalTimeSlots, setTotalTimeslots] = useState<number>(0);
  let timeslotTotal = 0;

  useEffect(() => {
    capacity?.forEach((cap, index) => {
      const startTime = DateTime.fromISO(cap.start_time);
      const endTime = DateTime.fromISO(cap.end_time);
      const difference = endTime.diff(startTime).as("minute") / 15;
      timeslotTotal += difference;
    });
    setTotalTimeslots(timeslotTotal);
  }, [totalCapacity, capacity]);
  return (
    <Card
      style={{
        background: "rgba(32, 58, 129, 0.2)",
        border: "none",
        padding: "0px 4px",
        maxHeight: "160px",
      }}
    >
      <Card.Body
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {week ? (
          <span style={{ fontWeight: "bold" }}>Week {item}</span>
        ) : (
          <span style={{ fontWeight: "bold" }}>{item}</span>
        )}

        {capacity ? <h1>{capacity?.length}</h1> : <h1>0</h1>}

        {capacity?.length === 1 ? (
          <span>Reservation</span>
        ) : (
          <span>Reservations</span>
        )}
        <Row style={{ width: "100%" }}>
          <ProgressBar
            max={totalCapacity}
            now={totalTimeSlots}
            style={{
              paddingLeft: "0px",
            }}
          />
        </Row>
      </Card.Body>
    </Card>
  );
};
