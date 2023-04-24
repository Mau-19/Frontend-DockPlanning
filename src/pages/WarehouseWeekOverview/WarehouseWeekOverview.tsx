import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronUp,
  faCircleChevronDown,
} from "@fortawesome/free-solid-svg-icons";

import { OrderOverview } from "./components/OrderOverview";
import { WeekDaySidebar } from "./components/WeekDaySidebar";
import { DockDropdown } from "../../components/Dropdowns/DockDropdown";
import { WarehouseDropdown } from "../../components/Dropdowns/WarehouseDropdown";
import { WeekNavigator } from "../../components/WeekNavigation/WeekNavigator";

import { Dock } from "../../types/Dock";
import { Warehouse } from "../../types/Warehouse";
import { Timeslot } from "../../types/Timeslot";
import { TimeslotByDay } from "../../types/Timeslot";

interface Props {
  decrementWeek: () => void;
  incrementWeek: () => void;
  daysOfTheWeek: string[];
  weekNr: number;
  dockId: string | undefined;
  warehouses: Warehouse[];
  setSelectedWarehouse: React.Dispatch<React.SetStateAction<Warehouse>>;
  selectedWarehouse: Warehouse;
  filteredDocks: Dock[];
  selectedDock: Dock | undefined;
  setSelectedDock: React.Dispatch<React.SetStateAction<Dock | undefined>>;
  filteredTimeslots: Timeslot[] | undefined;
  timeslotsByDay: TimeslotByDay | undefined;
  dockTimeslotCapacity: number;
}

export const WarehouseWeekOverview: React.FC<Props> = ({
  decrementWeek,
  incrementWeek,
  weekNr,
  dockId,
  warehouses,
  setSelectedWarehouse,
  selectedWarehouse,
  filteredDocks,
  selectedDock,
  setSelectedDock,
  filteredTimeslots,
  timeslotsByDay,
  dockTimeslotCapacity,
}) => {
  return (
    <Container fluid>
      <Row style={{ maxHeight: "calc(100vh - 71px)" }}>
        <Col lg={2} style={{ padding: "0px 4px", marginTop: "4px" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <FontAwesomeIcon
              icon={faCircleChevronUp}
              style={{
                cursor: "pointer",
                height: "37",
                width: "37",
                userSelect: "none",
              }}
              onClick={decrementWeek}
            />
          </div>
          <WeekDaySidebar
            timeslotsByDay={timeslotsByDay}
            dockTimeslotCapacity={dockTimeslotCapacity}
          />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <FontAwesomeIcon
              icon={faCircleChevronDown}
              style={{
                cursor: "pointer",
                height: "37",
                width: "37",
                userSelect: "none",
              }}
              onClick={incrementWeek}
            />
          </div>
        </Col>
        <Col lg={10} style={{ background: "#D9D9D9", paddingTop: "4px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <WeekNavigator weekNr={weekNr} dockId={dockId} />
            {filteredTimeslots?.length == 1 ? (
              <h3>1 reservation</h3>
            ) : (
              <h3>{filteredTimeslots?.length} Reservations</h3>
            )}

            <div>
              <WarehouseDropdown
                warehouses={warehouses}
                setSelectedWarehouse={setSelectedWarehouse}
                selectedWarehouse={selectedWarehouse}
              />
              {filteredDocks && (
                <DockDropdown
                  docks={filteredDocks}
                  weekNr={weekNr}
                  selectedDock={selectedDock}
                  setSelectedDock={setSelectedDock}
                />
              )}
            </div>
          </div>
          <OrderOverview
            timeslots={filteredTimeslots}
            timeslotsByDay={timeslotsByDay}
          />
        </Col>
      </Row>
    </Container>
  );
};
