export interface Dock {
  active: boolean;
  code: string;
  params: {
    opening_time: string;
    closing_time: string;
    warehouseId: number;
  };
}
