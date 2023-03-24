import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";

import { StyledProgressBar } from "./StyledProgressBar";

interface Props {
  item?: number | string;
}

export const WeekOverviewCard: React.FC<Props> = ({ item }) => {
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

        <h1>129</h1>
        <span>Reservations</span>
        <Row style={{ width: "100%" }}>
          <StyledProgressBar />
        </Row>
      </Card.Body>
    </Card>
  );
};
