import { useState, useEffect } from "react";

import { useQueryClient } from "@tanstack/react-query";
import { DateTime } from "luxon";
import Stack from "react-bootstrap/Stack";

import { DockColumn } from "./components/DockColumn/DockColumn";

import { getDocksByDate } from "../../api/apiDocks";
import { Warehouse } from "../../types/Warehouse";
import { WarehouseDropdown } from "../../components/Dropdowns/WarehouseDropdown";

export const DockPlanner = () => {
  const todaysDate = DateTime.local().toISODate();
  const queryClient = useQueryClient();
  const warehouses = queryClient.getQueryData(["warehouses"]);

  const [date, setDate] = useState(todaysDate);
  const [docks, setDocks] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse>();

  useEffect(() => {
    const e = async () => {
      const s = await getDocksByDate(selectedWarehouse?.id, date);
      if (s) {
        setDocks(s);
      }
    };
    e();
  }, [date, selectedWarehouse]);

  useEffect(() => {
    if (warehouses) {
      setSelectedWarehouse(warehouses[0]);
    }
  }, [warehouses]);
  console.log("helo");
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
      <div style={{ display: "flex", overflowX: "auto", width: "100%" }}>
        {docks.map((dock) => (
          <DockColumn dock={dock} />
        ))}
      </div>
    </div>
  );
};
