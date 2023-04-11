import { useEffect, useState } from "react";

import axios from "axios";
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

import { WeekOverviewSidebar } from "../../components/Sidebar/WeekOverviewSidebar";
import { DockOverview } from "./DockOverview";
import { WarehouseDropdown } from "../../components/Dropdowns/WarehouseDropdown";
import { MonthDropdown } from "../../components/Dropdowns/MonthDropdown";
import { YearDropdown } from "../../components/Dropdowns/YearDropdown";

import { Dock } from "../../types/Dock";
import { Warehouse } from "../../types/Warehouse";
import { Timeslot } from "../../types/Timeslot";

export const WarehouseMonthOverview = () => {
  const apiHostAddress = import.meta.env.VITE_NODE_API_HOST;

  const currentYear: number = DateTime.now().year;
  const currentMonth: number = DateTime.now().month;

  const [docks, setDocks] = useState<Dock[]>([]);
  const [filteredDocks, setFilteredDocks] = useState<Dock[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse>(
    warehouses[0]
  );
  const [weeks, setWeeks] = useState<number[]>([]);
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  const [timeslots, setTimeslots] = useState<Timeslot[]>();
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "");

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
    setWeeks(() => weeks);
  };

  useEffect(() => {
    getWeeksInMonth(undefined, month);
  }, [month]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const dockData = await axios.get(
        `${apiHostAddress}/warehouse/list_docks`
      );
      const warehouseData = await axios.get(`${apiHostAddress}/warehouse/list`);
      const timeslotData = await axios.get(`${apiHostAddress}/timeslot/list`, {
        headers: {
          "x-access-token": user?.accessToken,
        },
      });
      if (
        dockData.status == 200 &&
        warehouseData.status == 200 &&
        timeslotData.status == 200
      ) {
        setDocks(dockData.data);
        setWarehouses(warehouseData.data);
        setTimeslots(timeslotData.data);
        setSelectedWarehouse(warehouseData.data[0]);
        setLoading(false);
      }
    };

    fetchData();
    getWeeksInMonth(year, month);
  }, []);

  useEffect(() => {
    setFilteredDocks(docks);
    filterDocksOnSelectedWarehouse();
  }, [selectedWarehouse]);

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
          <WeekOverviewSidebar mapping={weeks} />
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
            {loading && (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            )}
            <DockOverview docks={filteredDocks} weeks={weeks} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};
