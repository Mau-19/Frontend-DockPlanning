import axios from "axios";

const apiHostAddress = import.meta.env.VITE_NODE_API_HOST;

const user = JSON.parse(localStorage.getItem("user") || "");

const api = axios.create({
  baseURL: apiHostAddress,
});

export const getTimeslots = async () => {
  const response = await api.get(`${apiHostAddress}/timeslot/list`, {
    headers: {
      "x-access-token": user?.accessToken,
    },
  });
  return response.data;
};
