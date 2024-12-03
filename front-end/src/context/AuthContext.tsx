import { createContext } from "react";
import "firebase/auth";
import { AuthContextType } from "@/interfaces/interface";

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  userData: {
    userId: "undefined",
    email: "undefined@gmail.com",
    first_name: "undefined",
    last_name: "undefined",
    password: "undefined",
  },
  setUserData: () => {},
});
