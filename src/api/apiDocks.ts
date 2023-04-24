import axios from "axios";

const apiHostAddress = import.meta.env.VITE_NODE_API_HOST;

const api = axios.create({
  baseURL: apiHostAddress,
});

export const getDocks = async () => {
  const response = await api.get("/warehouse/list_docks");
  return response.data;
};
