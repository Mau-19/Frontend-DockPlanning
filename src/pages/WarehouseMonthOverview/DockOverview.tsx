import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import { DockOverviewCard } from "./DockOverviewCard";
import { Dock } from "../../types/Dock";

interface Props {
  docks: Dock[];
  weeks: number[];
}

export const DockOverview: React.FC<Props> = ({ docks, weeks }) => {
  return (
    <Container
      fluid
      style={{
        display: "flex",
        flexDirection: "column",
        overflowX: "auto",
        overflowY: "hidden",
      }}
    >
      {weeks?.map((week, index) => (
        <Row key={index} style={{ flexWrap: "noWrap" }}>
          {docks?.map((dock, index) => (
            <DockOverviewCard
              dock={dock}
              key={index}
              index={index}
              weekNr={week}
            />
          ))}
        </Row>
      ))}
    </Container>
  );
};
