import Container from "react-bootstrap/Container";

import { DockOverviewRow } from "./DockOverviewRow";
import { Dock } from "../../types/Dock";

interface Props {
  docks: Dock[];
  reservations: any[];
}

export const DockOverview: React.FC<Props> = ({ reservations, docks }) => {
  return (
    <Container fluid style={{ display: "flex", flexDirection: "column" }}>
      {/* {reservations.map((reservationWeekArray, index) =>
        reservationWeekArray == reservations[reservations.length - 1] ? (
          <DockOverviewRow
            key={index}
            reservationWeekArray={reservationWeekArray}
          />
        ) : (
          <DockOverviewRow
            key={index}
            reservationWeekArray={reservationWeekArray}
          />
        )
      )} */}
      {docks.map((dock) => (
        <div>
          <span>Active: {dock.active}</span>
          <span>Code: {dock.code}</span>
          <span>Closing: {dock.params.closing_time}</span>
          <span>Opening: {dock.params.opening_time}</span>
          <span>Warehouse: {dock.params.warehouseId}</span>
        </div>
      ))}
    </Container>
  );
};
