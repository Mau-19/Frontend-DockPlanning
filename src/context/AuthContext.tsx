import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

import { useEffect } from "react";
import { User } from "../types/User";

export interface UserContextInterface {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}

const defaultState = {
  user: {
    id: 0,
    accessToken: "",
    email: "",
    username: "",
  },
  setUser: (user: User) => {},
} as UserContextInterface;

export const AuthContext = createContext(defaultState);

interface Props {
  children: ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User>({
    id: 0,
    accessToken: "",
    email: "",
    username: "",
  });

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (localUser) {
      setUser({
        id: localUser.id,
        accessToken: localUser.accessToken,
        email: localUser.email,
        username: localUser.username,
      });
    }
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
