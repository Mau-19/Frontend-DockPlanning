import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";

import { StyledProgressBar } from "./StyledProgressBar";

interface Props {
  reservation: any;
  week?: number;
}

export const WeekOverviewCard: React.FC<Props> = ({ reservation, week }) => {
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
        <span style={{ fontWeight: "bold" }}>Week {week}</span>
        <h1>{reservation.currentReservations}</h1>
        <span>Reservations</span>
        <Row style={{ width: "100%" }}>
          <StyledProgressBar
            currentReservations={reservation.currentReservations}
            maxReservations={reservation.maxReservations}
          />
        </Row>
      </Card.Body>
    </Card>
  );
};
