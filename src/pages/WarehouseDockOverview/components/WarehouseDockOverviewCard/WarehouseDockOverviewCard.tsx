import { useState, useEffect } from "react";

import { DateTime } from "luxon";

import { Timeslot } from "../../../../types/Timeslot";

import Card from "react-bootstrap/Card";

interface Props {
  timeslot: Timeslot;
}

export const WarehouseDockOverviewCard: React.FC<Props> = ({ timeslot }) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    const startTimeSimple = DateTime.fromISO(timeslot.start_time)?.toFormat(
      "HH:mm"
    );
    const endTimeSimple = DateTime.fromISO(timeslot.end_time)?.toFormat(
      "HH:mm"
    );
    setStartTime(startTimeSimple);
    setEndTime(endTimeSimple);
  }, [timeslot]);
  return (
    <Card
      style={{
        height: "160px",
        maxWidth: "9rem",
        margin: "2px 4px",
      }}
    >
      <Card.Body
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          width: "144px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              margin: "0px 12px",
              fontWeight: "bolder",
              fontSize: "x-large",
            }}
          >
            {timeslot.id}
          </span>
        </div>
        <div
          style={{
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div>
            <span style={{ fontSize: "smaller" }}>
              {startTime} - {endTime}
            </span>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};
