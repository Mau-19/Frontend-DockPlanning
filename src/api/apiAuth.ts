import axios from "axios";

const apiHostAddress = import.meta.env.VITE_NODE_API_HOST;

const api = axios.create({
  baseURL: apiHostAddress,
});

export const login = async (username: string, password: string) => {
  const response = await api.post(`${apiHostAddress}/auth/signin`, {
    username: username,
    password: password,
  });
  return response.data;
};
