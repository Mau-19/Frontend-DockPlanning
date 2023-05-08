import { Timeslot } from "./Timeslot";

export interface Dock {
  id: number;
  active: boolean;
  code: string;
  params: {
    opening_time: string;
    closing_time: string;
    warehouseId: number;
  };
  timeslots: Timeslot[];
  maxTimeslotQuarterCapacity: number;
}
