import axios from "axios";

const apiHostAddress = import.meta.env.VITE_NODE_API_HOST;

const api = axios.create({
  baseURL: apiHostAddress,
});

export const getCargoById = async (cargoId: number) => {
  const user = JSON.parse(localStorage.getItem("user") || "");
  const token = user?.accessToken;
  const response = await api.post(
    "/cargo/get",
    { cargoId: cargoId },
    {
      headers: { "x-access-token": token },
    }
  );
  return response.data;
};
