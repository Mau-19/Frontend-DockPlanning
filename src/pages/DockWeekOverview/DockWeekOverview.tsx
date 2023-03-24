import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronUp,
  faCircleChevronDown,
} from "@fortawesome/free-solid-svg-icons";

import { OrderOverview } from "./components/OrderOverview";
import { WeekOverviewSidebar } from "../../components/Sidebar/WeekOverviewSidebar";
import { DockDropdown } from "../../components/Dropdowns/DockDropdown";

import { Dock } from "../../types/Dock";
import { Warehouse } from "../../types/Warehouse";

import { daysOfTheWeek } from "../../../SampleData";
import { WarehouseDropdown } from "../../components/Dropdowns/WarehouseDropdown";
import { WeekNavigator } from "../../components/WeekNavigation/WeekNavigator";

export const DockWeekOverview = () => {
  const { dockId, weekNr } = useParams();
  const weekNrFromParams: number = +weekNr;

  const [docks, setDocks] = useState<Dock[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [weekNumber, setWeekNumber] = useState<number>(weekNrFromParams);

  const navigate = useNavigate();

  const apiHostAddress = import.meta.env.VITE_NODE_API_HOST;
  const user = JSON.parse(localStorage.getItem("user") || "");

  //Fetch docks
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
  }, []);
  //Fetch warehouses
  useEffect(() => {
    const fetchWarehouses = async () => {
      const response = await axios.get(`${apiHostAddress}/warehouse/list`);
      if (response.status == 200) {
        setWarehouses(() => response.data);
      }
    };
    fetchWarehouses();
  }, []);

  useEffect(() => {
    setWeekNumber(weekNrFromParams);
  }, [weekNrFromParams]);

  const incrementWeek = () => {
    if (weekNrFromParams != 52) {
      const navigateWeek = weekNumber + 1;
      navigate(`/dock/${dockId}/${navigateWeek}`);
    }
  };

  const decrementWeek = () => {
    if (weekNrFromParams != 1) {
      const navigateWeek = weekNumber - 1;
      navigate(`/dock/${dockId}/${navigateWeek}`);
    }
  };

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
          <WeekOverviewSidebar mapping={daysOfTheWeek} />
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
            <WeekNavigator weekNr={weekNumber} dockId={dockId} />
            <h3>30 Reservations</h3>
            <div>
              <WarehouseDropdown warehouses={warehouses} />
              {docks && <DockDropdown docks={docks} />}
            </div>
          </div>
          <OrderOverview />
        </Col>
      </Row>
    </Container>
  );
};
