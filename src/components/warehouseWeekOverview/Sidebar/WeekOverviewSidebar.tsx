import Row from "react-bootstrap/Row";

import { WeekOverviewCard } from "./WeekOverviewCard";

interface props {
  reservations: any[];
  weeks?: number[];
}

export const WeekOverviewSidebar: React.FC<props> = ({
  reservations,
  weeks,
}) => {
  return (
    <div
      style={{
        padding: "0px 4px",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {reservations.map((reservation, index) => (
        <Row
          style={{
            margin: "2px 0px",
          }}
          key={index}
        >
          <WeekOverviewCard reservation={reservation} week={weeks[index]} />
        </Row>
      ))}
    </div>
  );
};
