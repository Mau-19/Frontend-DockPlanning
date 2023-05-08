import axios from "axios";
import { ClientFetchHttpMethod, clientFetch } from "./apiUtil";

const apiHostAddress = import.meta.env.VITE_NODE_API_HOST;

const api = axios.create({
  baseURL: apiHostAddress,
});

export const getDocks = async () => {
  const response = await api.get("/warehouse/list_docks");
  return response.data;
};

export const getDocksByWarehouseId = async (warehouseId: number) => {
  return await clientFetch(
    ClientFetchHttpMethod.GET,
    `/warehouse/${warehouseId}/docks`
  );
};

export const getDocksByDate = async (warehouseId: number, date: string) => {
  const response = await api.get(`/warehouse/${warehouseId}/docks/${date}`);
  return response.data;
};

export const getDocksByWarehouseMonthAndYear = async (
  warehouseId: number,
  month: number,
  year: number
) => {
  return await clientFetch(
    ClientFetchHttpMethod.GET,
    `/warehouse/${warehouseId}/docks/${month}/${year}`
  );
};
