import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { OrderOverviewCard } from "./OrderOverviewCard";
import { EmptyCard } from "./EmptyCard";

import { Timeslot } from "../../../types/Timeslot";
import { TimeslotByDay } from "../../../types/Timeslot";
import { daysOfTheWeek } from "../../../../SampleData";

interface Props {
  timeslots: Timeslot[];
  timeslotsByDay: TimeslotByDay;
}

export const OrderOverview: React.FC<Props> = ({ timeslotsByDay }) => {
  if (
    Object.values(timeslotsByDay).every((timeslots) => timeslots.length === 0)
  ) {
    return (
      <Container fluid>
        <h1>No reservations found</h1>
      </Container>
    );
  }

  return (
    <>
      <Container
        fluid
        style={{
          display: "flex",
          flexDirection: "column",
          overflowX: "auto",
          overflowY: "hidden",
        }}
      >
        {daysOfTheWeek.map((day, index) => (
          <Row key={index}>
            <Col style={{ maxHeight: "160px" }}>
              {timeslotsByDay[day]?.length === 0 ? (
                <EmptyCard />
              ) : (
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {timeslotsByDay[day]?.map((timeslot, index) => (
                    <OrderOverviewCard timeslot={timeslot} key={index} />
                  ))}
                </div>
              )}
            </Col>
          </Row>
        ))}
      </Container>
    </>
  );
};
