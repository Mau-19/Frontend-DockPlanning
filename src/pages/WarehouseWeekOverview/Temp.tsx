import { useState, useEffect } from "react";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { DateTime } from "luxon";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronUp,
  faCircleChevronDown,
} from "@fortawesome/free-solid-svg-icons";

import { getDocksByWarehouseId } from "../../api/apiDocks";
import { getTimeslotsByDockWeekAndYear } from "../../api/apiTimeslots";

import { OrderOverview } from "./components/OrderOverview";
import { WeekDaySidebar } from "./components/WeekDaySidebar";
import { DockDropdown } from "../../components/Dropdowns/DockDropdown";
import { WarehouseDropdown } from "../../components/Dropdowns/WarehouseDropdown";
import { YearDropdown } from "../../components/Dropdowns/YearDropdown";
import { WeekNavigator } from "../../components/WeekNavigation/WeekNavigator";

import { Dock } from "../../types/Dock";
import { Warehouse } from "../../types/Warehouse";
import { Timeslot } from "../../types/Timeslot";
import { TimeslotByDay } from "../../types/Timeslot";

interface timeslotByDaySet {
  [key: string]: Set<Timeslot>;
}

export const Temp = () => {
  const days: TimeslotByDay = {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
  };

  const { dockId, weekNr } = useParams();
  const weekNrFromParams: number = +weekNr;
  const dockIdFromParams: number = +dockId;

  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse>();
  const [selectedDock, setSelectedDock] = useState<Dock>();
  const [timeslotsByDay, setTimeslotsByDay] = useState<TimeslotByDay>(days);
  const queryClient = useQueryClient();
  const warehouses = queryClient.getQueryData(["warehouses"]);

  const navigate = useNavigate();

  const { data: docks, isLoading: isDocksLoading } = useQuery(
    ["docks", selectedWarehouse],
    () => getDocksByWarehouseId(selectedWarehouse?.id)
  );
  const { data: timeslots, isLoading: isTimeslotsLoading } = useQuery(
    ["timeslots", weekNr, dockId],
    () =>
      getTimeslotsByDockWeekAndYear(dockIdFromParams, weekNrFromParams, 2023)
  );

  const groupTimeslotsByWeekDay = (timeslots: Timeslot[] | undefined) => {
    const daysWithSet: timeslotByDaySet = {
      Monday: new Set<Timeslot>(),
      Tuesday: new Set<Timeslot>(),
      Wednesday: new Set<Timeslot>(),
      Thursday: new Set<Timeslot>(),
      Friday: new Set<Timeslot>(),
    };
    timeslots?.forEach((timeslot) => {
      const startTime = DateTime.fromISO(timeslot.start_time);
      const dayOfWeek = startTime.toFormat("EEEE");

      if (dayOfWeek in daysWithSet) {
        daysWithSet[dayOfWeek].add(timeslot);
      }
    });

    const newTimeslotsByDay: TimeslotByDay = {};

    for (const dayOfWeek in days) {
      newTimeslotsByDay[dayOfWeek] = Array.from(daysWithSet[dayOfWeek]);
    }
    setTimeslotsByDay(newTimeslotsByDay);
  };

  const incrementWeek = () => {
    if (weekNrFromParams != 52) {
      const navigateWeek = weekNrFromParams + 1;
      navigate(`/dock/${dockId}/${navigateWeek}`);
    }
  };

  const decrementWeek = () => {
    if (weekNrFromParams != 1) {
      const navigateWeek = weekNrFromParams - 1;
      navigate(`/dock/${dockId}/${navigateWeek}`);
    }
  };

  useEffect(() => {
    groupTimeslotsByWeekDay(timeslots);
  }, [timeslots]);

  useEffect(() => {
    if (warehouses?.length > 0) {
      setSelectedWarehouse(warehouses[0]);
    }
  }, [warehouses]);

  useEffect(() => {
    setSelectedDock(docks?.find((dock) => dock?.id === dockIdFromParams));
  }, [docks]);

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
            dockTimeslotCapacity={selectedDock?.maxTimeslotQuarterCapacity}
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
            {timeslots?.length == 1 ? (
              <h3>1 reservation</h3>
            ) : (
              <h3>{timeslots?.length} Reservations</h3>
            )}

            <div>
              <WarehouseDropdown
                setSelectedWarehouse={setSelectedWarehouse}
                selectedWarehouse={selectedWarehouse}
              />
              <DockDropdown
                docks={docks}
                weekNr={weekNr}
                selectedDock={selectedDock}
                setSelectedDock={setSelectedDock}
                dockId={dockIdFromParams}
              />
              <YearDropdown years={[2021, 2022, 2023]} />
            </div>
          </div>
          <OrderOverview timeslotsByDay={timeslotsByDay} />
        </Col>
      </Row>
    </Container>
  );
};
