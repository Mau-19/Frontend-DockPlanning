import { Goods } from "./Goods";

export interface Cargo {
  id: number;
  code: number;
  description: string;
  block_type_id: number;
  params: {
    transporterId: number;
    goodsIds: number[];
  };
  cargoTypeId: number;
  active: boolean;
  goods: Goods[];
}
