import { useContext } from "react";

import { useLocalStorage } from "./useLocalStorage";

export interface User {
  accessToken: string;
  email: string;
  username: string;
  id: string;
}

export const useUser = () => {
  const { setItem } = useLocalStorage();

  const addUser = (user: User) => {
    setItem("user", JSON.stringify(user));
  };

  const removeUser = () => {
    setItem("user", "");
  };
};
