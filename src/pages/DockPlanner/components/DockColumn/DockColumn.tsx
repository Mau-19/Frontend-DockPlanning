import Col from "react-bootstrap/Col";
import { DockColumnCard } from "../DockColumnCard/DockColumnCard";
import { Dock } from "../../../../types/Dock";

interface Props {
  dock: Dock[];
}

export const DockColumn: React.FC<Props> = ({ dock }) => {
  return (
    <Col
      xs={12}
      sm={12}
      style={{
        background: "white",
        margin: "0px 8px",
        padding: "8px",
        borderRadius: "0.375rem",
        minHeight: "calc(100vh - 150px)",
        width: "226px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          background: "white",
        }}
      >
        <h3>{dock?.code}</h3>
      </div>
      {dock.timeslots.map((timeslot) => (
        <DockColumnCard key={timeslot.id} timeslot={timeslot} />
      ))}
    </Col>
  );
};
