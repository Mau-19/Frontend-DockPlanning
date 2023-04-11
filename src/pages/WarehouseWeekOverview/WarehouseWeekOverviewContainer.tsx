import { useState, useEffect } from "react";

import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { DateTime } from "luxon";

import { Dock } from "../../types/Dock";
import { Warehouse } from "../../types/Warehouse";
import { Timeslot } from "../../types/Timeslot";

import { WarehouseWeekOverview } from "./WarehouseWeekOverview";
import { daysOfTheWeek } from "../../../SampleData";
import { TimeslotByDay } from "../../types/Timeslot";

export const WareHouseWeekOverviewContainer = () => {
  const sample: TimeslotByDay = {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
  };

  const { dockId, weekNr } = useParams();
  const weekNrFromParams: number = +weekNr;
  const dockIdFromParams: number = +dockId;

  const [docks, setDocks] = useState<Dock[]>([]);
  const [filteredDocks, setFilteredDocks] = useState<Dock[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState({
    id: 0,
    description: "",
  });
  const [selectedDock, setSelectedDock] = useState<Dock>();
  const [dockTimeslotCapacity, setDockTimeslotCapacity] = useState<number>();
  const [timeslots, setTimeslots] = useState<Timeslot[]>();
  const [filteredTimeslots, setFilteredTimeslots] = useState<Timeslot[]>();
  const [timeslotsByDay, setTimeslotsByDay] = useState<TimeslotByDay>(sample);
  const [weekNumber, setWeekNumber] = useState<number>(weekNrFromParams);

  const navigate = useNavigate();

  const apiHostAddress = import.meta.env.VITE_NODE_API_HOST;
  const user = JSON.parse(localStorage.getItem("user") || "");

  //Filters timeslots so that only the timeslots that are on the current week (from the params) are selected
  const filterTimeSlotsOnWeek = (timeslots: Timeslot[]) => {
    const filterTimeSlots: Timeslot[] = [];
    timeslots?.map((timeslot) => {
      const timeSlotToDateTime = DateTime.fromISO(timeslot?.start_time);
      if (timeSlotToDateTime.weekNumber === weekNrFromParams) {
        filterTimeSlots.push(timeslot);
      }
    });
    return filterTimeSlots;
  };

  //Groups timeslots by weekday, i.e. monday: Timeslot[], tuesday: Timeslot[], etc.
  const groupTimeslotsByWeekDay = (timeslots: Timeslot[] | undefined) => {
    timeslots?.forEach((timeslot) => {
      const startTime = DateTime.fromISO(timeslot.start_time);
      const dayOfWeek = startTime.toFormat("EEEE");

      if (dayOfWeek in sample) {
        sample[dayOfWeek].push(timeslot);
      }
    });
    const updatedTimeslots = updateTimeslotsByDay(sample);
    setTimeslotsByDay(updatedTimeslots);
  };

  // Finds warehouse from dock with id.
  const determineSelectedWarehouse = (
    warehouseList: Warehouse[],
    dockFromParams: Dock | undefined
  ) => {
    return warehouseList.find(
      (warehouse) => warehouse.id === dockFromParams?.params.warehouseId
    );
  };

  const findDockFromParams = (dockList: Dock[]) => {
    return dockList.find((dock) => dock.id === dockIdFromParams);
  };

  const updateTimeslotsByDay = (test: TimeslotByDay) => {
    const updatedTimeslotsByDay: TimeslotByDay = {};
    Object.keys(test).forEach((day) => {
      const filteredTimeslotsOnDay = filterTimeSlotsOnWeek(test[day]);
      updatedTimeslotsByDay[day] = filteredTimeslotsOnDay;
    });
    return updatedTimeslotsByDay;
  };

  //Fetch Data and set states
  useEffect(() => {
    const fetchData = async () => {
      const warehouseData = await axios.get(`${apiHostAddress}/warehouse/list`);
      const dockData = await axios.get(
        `${apiHostAddress}/warehouse/list_docks`,
        {
          headers: user.accessToken,
        }
      );
      const timeSlotData = await axios.post(
        `${apiHostAddress}/timeslot/list_by_dock`,
        {
          dockId: dockIdFromParams,
        }
      );

      if (
        warehouseData.status == 200 &&
        dockData.status == 200 &&
        timeSlotData.status == 200
      ) {
        setWarehouses(warehouseData.data);
        setDocks(dockData.data);
        const dockFromParams = findDockFromParams(dockData.data);
        setSelectedDock(dockFromParams);
        const warehouseFromDock = determineSelectedWarehouse(
          warehouseData.data,
          dockFromParams
        );
        setSelectedWarehouse(warehouseFromDock);
        setTimeslots(timeSlotData.data);
        const filterTimeslots = filterTimeSlotsOnWeek(timeSlotData.data);
        setFilteredTimeslots(filterTimeslots);
      }
    };
    fetchData();
  }, [dockId, weekNr]);

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

  useEffect(() => {
    groupTimeslotsByWeekDay(timeslots);
  }, [timeslots]);

  useEffect(() => {
    const startTime = DateTime.fromISO(selectedDock?.params.opening_time);
    const endTime = DateTime.fromISO(selectedDock?.params.closing_time);
    const difference = endTime.diff(startTime).as("minutes") / 15;
    setDockTimeslotCapacity(difference);
  }, [selectedDock]);

  return (
    <WarehouseWeekOverview
      decrementWeek={decrementWeek}
      incrementWeek={incrementWeek}
      daysOfTheWeek={daysOfTheWeek}
      weekNr={weekNrFromParams}
      dockId={dockId}
      warehouses={warehouses}
      setSelectedWarehouse={setSelectedWarehouse}
      selectedWarehouse={selectedWarehouse}
      filteredDocks={filteredDocks}
      selectedDock={selectedDock}
      setSelectedDock={setSelectedDock}
      filteredTimeslots={filteredTimeslots}
      timeslotsByDay={timeslotsByDay}
      dockTimeslotCapacity={dockTimeslotCapacity}
    />
  );
};
