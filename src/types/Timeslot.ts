export interface Timeslot {
  id: number;
  start_time: string;
  end_time: string;
  status: number;
  params: {
    cargoId: number;
    locationId: number;
    warehouseId: number;
  };
  cargoTypeId: number;
}

export interface TimeslotByDay {
  [day: string]: Timeslot[];
}
export interface TimeslotByWeekNr {
  [key: number]: Timeslot[];
}
export interface TimeslotByDockId {
  [key: number]: Timeslot[];
}
