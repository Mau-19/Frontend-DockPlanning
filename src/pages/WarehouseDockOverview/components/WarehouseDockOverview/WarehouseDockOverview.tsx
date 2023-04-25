import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { TimeslotByDockId } from "../../../../types/Timeslot";
import { EmptyCard } from "../../../WarehouseWeekOverview/components/EmptyCard";
import { WarehouseDockOverviewCard } from "../WarehouseDockOverviewCard/WarehouseDockOverviewCard";
import { OrderOverviewCard } from "../../../WarehouseWeekOverview/components/OrderOverviewCard";

interface Props {
  timeslotsByDockId: TimeslotByDockId;
}

export const WarehouseDockOverview: React.FC<Props> = ({
  timeslotsByDockId,
}) => {
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
      {Object.keys(timeslotsByDockId).map((dockId, index) => (
        <Row key={index}>
          <Col style={{ maxHeight: "160px" }}>
            {timeslotsByDockId[dockId]?.length === 0 ? (
              <EmptyCard />
            ) : (
              <div div style={{ display: "flex", flexWrap: "wrap" }}>
                {timeslotsByDockId[dockId]?.map((timeslot) => (
                  <OrderOverviewCard timeslot={timeslot} />
                ))}
              </div>
            )}
          </Col>
        </Row>
      ))}
    </Container>
  );
};
