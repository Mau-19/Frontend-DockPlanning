import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import { DateTime } from "luxon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronUp,
  faCircleChevronDown,
} from "@fortawesome/free-solid-svg-icons";

import { getWarehouses } from "../../api/apiWarehouses";
import { getDocks } from "../../api/apiDocks";
import { getTimeslots } from "../../api/apiTimeslots";

import { MonthSidebar } from "./Sidebar/MonthSidebar";
import { DockOverview } from "./DockOverview";
import { WarehouseDropdown } from "../../components/Dropdowns/WarehouseDropdown";
import { MonthDropdown } from "../../components/Dropdowns/MonthDropdown";
import { YearDropdown } from "../../components/Dropdowns/YearDropdown";

import { Dock } from "../../types/Dock";
import { Warehouse } from "../../types/Warehouse";
import { Timeslot } from "../../types/Timeslot";
import { TimeslotByWeekNr } from "../../types/Timeslot";

export const WarehouseMonthOverview = () => {
  const currentYear: number = DateTime.now().year;
  const currentMonth: number = DateTime.now().month;

  const [filteredDocks, setFilteredDocks] = useState<Dock[]>([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse>();
  const [weeks, setWeeks] = useState<number[]>([DateTime.now().weekNumber]);
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  const [filteredTimeslots, setFilteredTimeslots] = useState<Timeslot[]>([]);
  const [timeslotsByWeekNr, setTimeslotsByWeekNr] = useState({});

  const { data: warehouses = [], isLoading: isWarehousesLoading } = useQuery(
    ["warehouses"],
    getWarehouses
  );

  const { data: docks = [], isLoading: isDocksLoading } = useQuery(
    ["docks"],
    getDocks
  );

  const {
    data: timeslots = [],
    isLoading: isTimeslotsLoading,
    error,
  } = useQuery(["timeslots"], getTimeslots);

  /**
   * Function that generates a list of weeks numbers based on given
   * year and month.
   *
   * @param year
   * @param month month in number form. i.e. 1 for january
   */
  const getWeeksInMonth = (
    year: number = DateTime.now().year,
    month: number
  ) => {
    const first: number = DateTime.local(year, month).startOf(
      "month"
    ).weekNumber;
    const last: number = DateTime.local(year, month).endOf("month").weekNumber;
    const weeks: number[] = [];

    for (let i = first; i <= last; i++) {
      weeks.push(i);
    }
    setWeeks(weeks);
  };

  const filterTimeslotOnWarehouse = (timeslots: Timeslot[]) => {
    const filterTimeslots = timeslots.filter(
      (timeslot) => timeslot.params.warehouseId == selectedWarehouse?.id
    );
    return filterTimeslots;
  };

  const groupTimeslotsByWeekNr = (
    timeslots: Timeslot[] | undefined,
    timeslotsByWeekNr: TimeslotByWeekNr
  ) => {
    const newTimeslotsByWeekNr: TimeslotByWeekNr = {};
    timeslots?.forEach((timeslot) => {
      const timeslotToDateTime = DateTime.fromISO(timeslot?.start_time);
      const timeslotWeekNr = timeslotToDateTime?.weekNumber;
      if (timeslotWeekNr in timeslotsByWeekNr) {
        if (!newTimeslotsByWeekNr[timeslotWeekNr]) {
          newTimeslotsByWeekNr[timeslotWeekNr] = [];
        }
        newTimeslotsByWeekNr[timeslotWeekNr]?.push(timeslot);
      }
    });
    const updatedTimeslots = updateTimeslotsByWeekNr(
      timeslotsByWeekNr,
      newTimeslotsByWeekNr
    );
    setTimeslotsByWeekNr(updatedTimeslots);
  };

  const updateTimeslotsByWeekNr = (
    timeslotsByWeekNr: TimeslotByWeekNr,
    newTimeslotsByWeekNr: TimeslotByWeekNr
  ): TimeslotByWeekNr => {
    const updatedTimeslotsByWeekNr = { ...timeslotsByWeekNr };
    Object.keys(newTimeslotsByWeekNr).forEach((week: number) => {
      if (week in updatedTimeslotsByWeekNr) {
        updatedTimeslotsByWeekNr[week] = newTimeslotsByWeekNr[week];
      }
    });
    return updatedTimeslotsByWeekNr;
  };

  useEffect(() => {
    if (warehouses.length > 0) {
      setSelectedWarehouse(warehouses[0]);
    }
  }, [warehouses]);

  //Fetch data
  useEffect(() => {
    setFilteredTimeslots(timeslots);
    getWeeksInMonth(year, month);
  }, []);

  useEffect(() => {
    getWeeksInMonth(undefined, month);
  }, [month]);

  useEffect(() => {
    const timeslotsByWarehouse = filterTimeslotOnWarehouse(timeslots);
    setFilteredTimeslots(timeslotsByWarehouse);
  }, [selectedWarehouse]);

  useEffect(() => {
    setFilteredDocks(docks);
    filterDocksOnSelectedWarehouse();
  }, [selectedWarehouse]);

  useEffect(() => {
    // Group timeslots array on their corresponding week numbers
    const newWeeksToObject = weeks?.reduce((acc, week) => {
      return {
        ...acc,
        [week]: [],
      };
    }, {});
    groupTimeslotsByWeekNr(filteredTimeslots, newWeeksToObject);
  }, [weeks, filteredTimeslots]);

  const filterDocksOnSelectedWarehouse = () => {
    const filterDocks = docks.filter(
      (dock) => dock.params.warehouseId == selectedWarehouse?.id
    );
    setFilteredDocks(filterDocks);
  };

  const incrementMonth = () => {
    setMonth(() => month + 1);
  };

  const decrementMonth = () => {
    setMonth(() => month - 1);
  };

  if (isWarehousesLoading || isDocksLoading || isTimeslotsLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <Container fluid>
      <Row style={{ maxHeight: "calc(100vh - 71px)" }}>
        <Col lg={2} style={{ padding: "0px 4px", marginTop: "4px" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <FontAwesomeIcon
              icon={faCircleChevronUp}
              onClick={decrementMonth}
              style={{
                cursor: "pointer",
                height: "37",
                width: "37",
                userSelect: "none",
              }}
            />
          </div>
          <MonthSidebar timeslotsByWeekNr={timeslotsByWeekNr} />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <FontAwesomeIcon
              icon={faCircleChevronDown}
              onClick={incrementMonth}
              style={{
                cursor: "pointer",
                height: "37",
                width: "37",
                userSelect: "none",
              }}
            />
          </div>
        </Col>
        <Col lg={10} style={{ background: "#D9D9D9", paddingTop: "4px" }}>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "end",
              }}
            >
              <WarehouseDropdown
                warehouses={warehouses}
                setSelectedWarehouse={setSelectedWarehouse}
                selectedWarehouse={selectedWarehouse}
              />
              <MonthDropdown setMonth={setMonth} month={month} />
              <YearDropdown years={[2020, 2021, 2023]} />
            </div>
            <DockOverview docks={filteredDocks} weeks={weeks} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};
