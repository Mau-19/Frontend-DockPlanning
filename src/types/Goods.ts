export interface Goods {
  id: number;
  code: string;
  description: string;
  block_type_id: number;
  params: {
    clientId: number;
    identifier: string;
    reserved: boolean;
  };
}
