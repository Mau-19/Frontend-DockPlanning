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
}

export interface TimeslotByDay {
  [day: string]: Timeslot[];
}
