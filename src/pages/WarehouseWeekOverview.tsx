import { useEffect, useState } from "react";

import axios from "axios";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { DateTime } from "luxon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronUp,
  faCircleChevronDown,
} from "@fortawesome/free-solid-svg-icons";

import { WeekOverviewSidebar } from "../components/warehouseWeekOverview/Sidebar/WeekOverviewSidebar";
import { DockOverview } from "../components/warehouseWeekOverview/DockOverview";
import { DatePickerDropdown } from "../components/warehouseWeekOverview/DatepickerDropdown";
import { MonthDropdown } from "../components/Dropdowns/MonthDropdown";

import { Dock } from "../types/Dock";
import { Warehouse } from "../types/Warehouse";

const reservations = [
  [
    {
      weekNumber: 6,
      currentReservations: 162,
      maxReservations: 200,
    },
    {
      weekNumber: 7,
      currentReservations: 160,
      maxReservations: 200,
    },
    {
      weekNumber: 8,
      currentReservations: 125,
      maxReservations: 200,
    },
    {
      weekNumber: 9,
      currentReservations: 39,
      maxReservations: 200,
    },
    {
      weekNumber: 10,
      currentReservations: 166,
      maxReservations: 200,
    },
  ],
  [
    {
      weekNumber: 6,
      currentReservations: 162,
      maxReservations: 200,
    },
    {
      weekNumber: 7,
      currentReservations: 160,
      maxReservations: 200,
    },
    {
      weekNumber: 8,
      currentReservations: 125,
      maxReservations: 200,
    },
    {
      weekNumber: 9,
      currentReservations: 39,
      maxReservations: 200,
    },
    {
      weekNumber: 10,
      currentReservations: 166,
      maxReservations: 200,
    },
  ],
  [
    {
      weekNumber: 6,
      currentReservations: 162,
      maxReservations: 200,
    },
    {
      weekNumber: 7,
      currentReservations: 160,
      maxReservations: 200,
    },
    {
      weekNumber: 8,
      currentReservations: 125,
      maxReservations: 200,
    },
    {
      weekNumber: 9,
      currentReservations: 39,
      maxReservations: 200,
    },
    {
      weekNumber: 10,
      currentReservations: 166,
      maxReservations: 200,
    },
  ],
  [
    {
      weekNumber: 6,
      currentReservations: 162,
      maxReservations: 200,
    },
    {
      weekNumber: 7,
      currentReservations: 160,
      maxReservations: 200,
    },
    {
      weekNumber: 8,
      currentReservations: 125,
      maxReservations: 200,
    },
    {
      weekNumber: 9,
      currentReservations: 39,
      maxReservations: 200,
    },
    {
      weekNumber: 10,
      currentReservations: 166,
      maxReservations: 200,
    },
  ],
  [
    {
      weekNumber: 6,
      currentReservations: 162,
      maxReservations: 200,
    },
    {
      weekNumber: 7,
      currentReservations: 160,
      maxReservations: 200,
    },
    {
      weekNumber: 8,
      currentReservations: 125,
      maxReservations: 200,
    },
    {
      weekNumber: 9,
      currentReservations: 39,
      maxReservations: 200,
    },
    {
      weekNumber: 10,
      currentReservations: 166,
      maxReservations: 200,
    },
  ],
];

export const WarehouseWeekOverview = () => {
  const apiHostAddress = import.meta.env.VITE_NODE_API_HOST;

  const currentYear: number = DateTime.now().year;
  const currentMonth: number = DateTime.now().month;

  const [docks, setDocks] = useState<Dock[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [weeks, setWeeks] = useState<number[]>([]);
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);

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
    const fetchDocks = async () => {
      const response = await axios.get(
        `${apiHostAddress}/warehouse/list_docks`,
        {
          headers: user.accessToken,
        }
      );
      if (response.status == 200) {
        setDocks(() => response.data);
      }
    };

    fetchDocks();
    getWeeksInMonth(year, month);
  }, []);

  useEffect(() => {
    const fetchWarehouses = async () => {
      const response = await axios.get(`${apiHostAddress}/warehouse/list`);
      if (response.status == 200) {
        setWarehouses(() => response.data);
      }
    };
    fetchWarehouses();
  }, []);

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
          <WeekOverviewSidebar reservations={reservations[0]} weeks={weeks} />
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
          <div
            style={{
              display: "flex",
              justifyContent: "end",
            }}
          >
            <DatePickerDropdown
              type="warehouse"
              warehouses={warehouses}
              margin={true}
            />
            <MonthDropdown setMonth={setMonth} month={month} />
          </div>
          <DockOverview reservations={reservations} docks={docks} />
        </Col>
      </Row>
    </Container>
  );
};
