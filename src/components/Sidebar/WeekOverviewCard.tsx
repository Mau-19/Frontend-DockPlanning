import { useEffect, useState } from "react";

import { DateTime } from "luxon";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import ProgressBar from "react-bootstrap/ProgressBar";

import { StyledProgressBar } from "./StyledProgressBar";
import { Timeslot } from "../../types/Timeslot";

interface Props {
  item?: number | string;
  totalCapacity: number;
  capacity?: Timeslot[];
}

export const WeekOverviewCard: React.FC<Props> = ({
  item,
  totalCapacity,
  capacity,
}) => {
  const [totalTimeSlots, setTotalTimeslots] = useState<number>(0);
  let totalThing = 0;

  useEffect(() => {
    capacity?.forEach((cap, index) => {
      const e = DateTime.fromISO(cap.start_time);
      const e2 = DateTime.fromISO(cap.end_time);
      const difference = e2.diff(e).as("minute") / 15;
      totalThing += difference;
    });
    setTotalTimeslots(totalThing);
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
        {typeof item == "number" ? (
          <span style={{ fontWeight: "bold" }}>Week {item}</span>
        ) : (
          <span style={{ fontWeight: "bold" }}>{item}</span>
        )}

        <h1>{capacity?.length}</h1>
        <span>Reservations</span>
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
