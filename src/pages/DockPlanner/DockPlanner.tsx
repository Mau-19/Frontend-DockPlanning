import { useState, useEffect } from "react";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { DateTime } from "luxon";

import Stack from "react-bootstrap/Stack";
import Spinner from "react-bootstrap/Spinner";

import { DockColumn } from "./components/DockColumn/DockColumn";

import { getDocksByDate } from "../../api/apiDocks";
import { getWarehouses } from "../../api/apiWarehouses";

import { WarehouseDropdown } from "../../components/Dropdowns/WarehouseDropdown";

import { Warehouse } from "../../types/Warehouse";
import { Dock } from "../../types/Dock";

export const DockPlanner = () => {
  const todaysDate = DateTime.local().toISODate();

  const [date, setDate] = useState(todaysDate);
  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse>();
  const { data: warehouses = [], isLoading: isWarehousesLoading } = useQuery(
    ["warehouses"],
    getWarehouses
  );
  const { data: docks, isLoading: isDocksLoading } = useQuery<Dock[]>(
    ["docks", selectedWarehouse?.id, date],
    () => getDocksByDate(selectedWarehouse?.id, date),
    {
      enabled: !!selectedWarehouse,
    }
  );

  useEffect(() => {
    if (warehouses) {
      setSelectedWarehouse(warehouses[0]);
    }
  }, [warehouses]);

  return (
    <div
      style={{
        padding: "8px",
        height: "calc(100vh - 71px)",
        background: "rgb(217,217,217)",
      }}
    >
      <Stack direction="horizontal" gap={3}>
        <h1>Edit Planning</h1>
        <div className="ms-auto">
          <input
            type="date"
            onChange={(e) => setDate(e.target.value)}
            value={date}
          />
          <WarehouseDropdown
            selectedWarehouse={selectedWarehouse}
            setSelectedWarehouse={setSelectedWarehouse}
          />
        </div>
      </Stack>
      {isDocksLoading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <div style={{ display: "flex", overflowX: "auto", width: "100%" }}>
          {docks?.map((dock, index) => (
            <DockColumn key={index} dock={dock} />
          ))}
        </div>
      )}
    </div>
  );
};
