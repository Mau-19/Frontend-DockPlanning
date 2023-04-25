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

import { WarehouseDropdown } from "../../components/Dropdowns/WarehouseDropdown";
import { WarehouseDockOverview } from "./components/WarehouseDockOverview/WarehouseDockOverview";
import { DockSidebar } from "./components/Sidebar/DockSidebar";
import { WeekPicker } from "./components/WeekPicker/WeekPicker";
// import { WeekNavigator } from "../../components/WeekNavigation/WeekNavigator";

import { Dock } from "../../types/Dock";
import { Warehouse } from "../../types/Warehouse";
import { Timeslot } from "../../types/Timeslot";
import { TimeslotByDockId } from "../../types/Timeslot";

export const WarehouseDockOverviewPage = () => {
  const apiHostAddress = import.meta.env.VITE_NODE_API_HOST;
  const currentWeekNumber = DateTime.now().weekNumber;

  const [docks, setDocks] = useState<Dock[]>([]);
  const [filteredDocks, setFilteredDocks] = useState<Dock[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse>(
    warehouses[0]
  );
  const [timeslots, setTimeslots] = useState<Timeslot[]>([]);
  const [filteredTimeslots, setFilteredTimeslots] = useState<Timeslot[]>([]);
  const [timeslotsByDockId, setTimeslotsByDockId] = useState({});
  const [dockPartitions, setDockPartitions] = useState<Dock[][]>([]);
  const [currentDockPartition, setCurrentDockPartition] = useState<Dock[]>([]);
  const [weekNumber, setWeekNumber] = useState(currentWeekNumber);
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "");

  useEffect(() => {
    const fetchWarehouses = async () => {
      setLoading(true);
      const warehouseData = await axios.get(`${apiHostAddress}/warehouse/list`);
      if (warehouseData.status == 200) {
        setWarehouses(warehouseData.data);
        setSelectedWarehouse(warehouseData.data[0]);
        setLoading(false);
      }
    };
    fetchWarehouses();
  }, []);

  useEffect(() => {
    const fetchDocks = async () => {
      setLoading(true);
      const dockData = await axios.get(
        `${apiHostAddress}/warehouse/list_docks`
      );
      if (dockData.status == 200) {
        setDocks(dockData.data);
        setLoading(false);
      }
    };
    fetchDocks();
  }, []);

  useEffect(() => {
    const fetchTimeslots = async () => {
      setLoading(true);
      const timeslotData = await axios.get(`${apiHostAddress}/timeslot/list`, {
        headers: {
          "x-access-token": user?.accessToken,
        },
      });
      if (timeslotData.status == 200) {
        setTimeslots(timeslotData.data);
        setFilteredTimeslots(filterTimeslotOnWarehouse(timeslotData.data));
        setLoading(false);
      }
    };
    fetchTimeslots();
  }, []);

  useEffect(() => {
    setFilteredDocks(docks);
    filterDocksOnSelectedWarehouse();
  }, [selectedWarehouse]);

  useEffect(() => {
    const timeslotsByWarehouse = filterTimeslotOnWarehouse(timeslots);
    setFilteredTimeslots(timeslotsByWarehouse);
  }, [selectedWarehouse]);

  useEffect(() => {
    partitionDockArray(filteredDocks);
  }, [filteredDocks]);

  useEffect(() => {
    const newDocksToObject =
      currentDockPartition?.reduce((acc, dock) => {
        return {
          ...acc,
          [dock?.id]: [],
        };
      }, {}) || {};
    groupTimeslotsByDockId(filteredTimeslots, newDocksToObject);
  }, [currentDockPartition, dockPartitions, filteredTimeslots]);

  useEffect(() => {
    const filtered = filterTimeSlotsOnWeek(timeslots);
    setFilteredTimeslots(filtered);
  }, [weekNumber, timeslots]);

  const filterTimeSlotsOnWeek = (timeslots: Timeslot[]) => {
    const filterTimeSlots: Timeslot[] = [];
    timeslots?.map((timeslot) => {
      const timeSlotToDateTime = DateTime.fromISO(timeslot?.start_time);
      if (timeSlotToDateTime.weekNumber === weekNumber) {
        filterTimeSlots.push(timeslot);
      }
    });
    return filterTimeSlots;
  };

  const filterTimeslotOnWarehouse = (timeslots: Timeslot[]) => {
    const filterTimeslots = timeslots.filter(
      (timeslot) => timeslot.params.warehouseId == selectedWarehouse?.id
    );
    return filterTimeslots;
  };

  const filterDocksOnSelectedWarehouse = () => {
    const filterDocks = docks.filter(
      (dock) => dock.params.warehouseId == selectedWarehouse?.id
    );
    setFilteredDocks(filterDocks);
  };

  const partitionDockArray = (docks: Dock[]) => {
    const partitionSize = 5;
    const partitions = [];
    for (let i = 0; i < docks.length; i += partitionSize) {
      partitions.push(docks.slice(i, i + partitionSize));
    }
    setDockPartitions(partitions);
    setCurrentDockPartition(partitions[0]);
  };

  const incrementDocks = () => {
    const currentIndex = dockPartitions.indexOf(currentDockPartition);
    if (currentIndex != dockPartitions.length - 1) {
      setCurrentDockPartition(dockPartitions[currentIndex + 1]);
    }
  };

  const decrementDocks = () => {
    const currentIndex = dockPartitions.indexOf(currentDockPartition);
    if (currentIndex != 0) {
      setCurrentDockPartition(dockPartitions[currentIndex - 1]);
    }
  };

  const groupTimeslotsByDockId = (
    timeslots: Timeslot[],
    timeslotsByDockId: TimeslotByDockId
  ) => {
    const newTimeslotsByDockId: TimeslotByDockId = timeslotsByDockId;
    timeslots?.forEach((timeslot) => {
      const dockIdFromTimeslot = timeslot.params.locationId;
      if (dockIdFromTimeslot in timeslotsByDockId) {
        if (!newTimeslotsByDockId[dockIdFromTimeslot]) {
          newTimeslotsByDockId[dockIdFromTimeslot] = [];
        }
        newTimeslotsByDockId[dockIdFromTimeslot]?.push(timeslot);
      }
    });
    setTimeslotsByDockId(newTimeslotsByDockId);
  };

  return (
    <Container fluid>
      <Row style={{ maxHeight: "calc(100vh - 71px)" }}>
        <Col lg={2} style={{ padding: "0px 4px", marginTop: "4px" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <FontAwesomeIcon
              icon={faCircleChevronUp}
              onClick={decrementDocks}
              style={{
                cursor: "pointer",
                height: "37",
                width: "37",
                userSelect: "none",
              }}
            />
          </div>
          <DockSidebar
            docks={currentDockPartition}
            timeslotsByDockId={timeslotsByDockId}
          />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <FontAwesomeIcon
              icon={faCircleChevronDown}
              onClick={incrementDocks}
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
            <WarehouseDropdown
              warehouses={warehouses}
              setSelectedWarehouse={setSelectedWarehouse}
              selectedWarehouse={selectedWarehouse}
            />
            <WeekPicker weekNumber={weekNumber} setWeekNumber={setWeekNumber} />
          </div>
          {loading && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}
          <WarehouseDockOverview timeslotsByDockId={timeslotsByDockId} />
        </Col>
      </Row>
    </Container>
  );
};
