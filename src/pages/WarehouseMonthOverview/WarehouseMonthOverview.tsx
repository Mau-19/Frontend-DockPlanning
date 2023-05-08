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
import { getDocksByWarehouseMonthAndYear } from "../../api/apiDocks";

import { MonthSidebar } from "./Sidebar/MonthSidebar";
import { DockOverview } from "./DockOverview";
import { WarehouseDropdown } from "../../components/Dropdowns/WarehouseDropdown";
import { MonthDropdown } from "../../components/Dropdowns/MonthDropdown";
import { YearDropdown } from "../../components/Dropdowns/YearDropdown";

import { Dock } from "../../types/Dock";
import { Warehouse } from "../../types/Warehouse";

export const WarehouseMonthOverview = () => {
  const currentYear: number = DateTime.now().year;
  const currentMonth: number = DateTime.now().month;

  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse>();
  const [weeks, setWeeks] = useState<number[]>([DateTime.now().weekNumber]);
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);

  const { data: warehouses = [], isLoading: isWarehousesLoading } = useQuery(
    ["warehouses"],
    getWarehouses
  );

  const { data: docks = [], isLoading: isDocksLoading } = useQuery(
    ["docks", selectedWarehouse?.id, month, year],
    () => getDocksByWarehouseMonthAndYear(selectedWarehouse?.id, month, year)
  );

  const getWeekNumber = (year: number, month: number, day: number) => {
    const date = new Date(Date.UTC(year, month - 1, day));
    date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    return Math.ceil(((date - yearStart) / 86400000 + 1) / 7);
  };

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
    const firstDay = DateTime.local(year, month, 1);
    const lastDay = DateTime.local(year, month, firstDay.daysInMonth);
    const weeks: number[] = [];

    let currentDay = firstDay;

    while (currentDay <= lastDay) {
      const weekNumber = getWeekNumber(
        currentDay.year,
        currentDay.month,
        currentDay.day
      );
      if (!weeks.includes(weekNumber)) {
        weeks.push(weekNumber);
      }
      currentDay = currentDay.plus({ days: 1 });
    }
    setWeeks(weeks);
  };

  useEffect(() => {
    if (warehouses.length > 0) {
      setSelectedWarehouse(warehouses[0]);
    }
  }, [warehouses]);

  //Fetch data
  useEffect(() => {
    getWeeksInMonth(year, month);
  }, []);

  useEffect(() => {
    getWeeksInMonth(undefined, month);
  }, [month]);

  const incrementMonth = () => {
    setMonth(() => month + 1);
  };

  const decrementMonth = () => {
    setMonth(() => month - 1);
  };

  if (isWarehousesLoading || isDocksLoading) {
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
          <MonthSidebar
            warehouseId={selectedWarehouse?.id}
            weekNumbers={weeks}
            year={year}
          />
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
                setSelectedWarehouse={setSelectedWarehouse}
                selectedWarehouse={selectedWarehouse}
              />
              <MonthDropdown setMonth={setMonth} month={month} />
              <YearDropdown years={[2020, 2021, 2023]} />
            </div>
            <DockOverview weeks={weeks} docks={docks} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};
