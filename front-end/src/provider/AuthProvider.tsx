import { useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { AuthProviderProps, UserDataInterface } from "@/interfaces/interface";

const defaultUserData: UserDataInterface = {
  userId: "",
  email: "",
  first_name: "",
  last_name: "",
  password: "",
  moods: [],
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserDataInterface>(defaultUserData);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      if (!firebaseUser) {
        setUserData(defaultUserData);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
