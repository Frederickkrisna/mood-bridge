import { User } from "firebase/auth";

export interface AuthProviderProps {
  children: React.ReactNode;
}

export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  userData: UserDataInterface;
  setUserData: (userData: UserDataInterface) => void;
}

export interface UserDataInterface {
  userId: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

export interface MoodInterface {
  mood: string;
  date: string;
}

export interface TrackerMoodInterface{
  moods: MoodInterface[];
}
