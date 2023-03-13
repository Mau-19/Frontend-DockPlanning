import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { DockOverviewCard } from "./DockOverviewCard";

interface Props {
  reservationWeekArray: any[];
}

export const DockOverviewRow: React.FC<Props> = ({ reservationWeekArray }) => {
  return (
    <Row>
      {reservationWeekArray.map((reservation, index) => (
        <Col key={index}>
          <DockOverviewCard
            key={index}
            reservation={reservation}
            index={index}
          />
        </Col>
      ))}
      <Col>
        <DockOverviewCard reservation={reservationWeekArray[0]} index={5} />
      </Col>
      <Col>
        <DockOverviewCard reservation={reservationWeekArray[1]} index={6} />
      </Col>
    </Row>
  );
};
