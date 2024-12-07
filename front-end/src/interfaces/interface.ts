import { User } from "firebase/auth";
import { Timestamp } from "firebase/firestore";

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
  moods: MoodInterface[];
}

export interface PostInterface {
  id: string;
  userId: string;
  content: string;
  mood: string;
  createdAt: string;
  first_name: string;
  last_name: string;
}

export interface CommentInterface {
  id: string;
  content: string;
  createdAt: string;
  postId: string;
  userId: string;
  first_name: string;
  last_name: string;
}

export interface MoodInterface {
  mood: string;
  date: string | Timestamp;
}

export interface ChartDataInterface {
  desktop: number; // 1 = Positive, 0 = Neutral, -1 = Negative
  day: string;
}

export interface PredictionInterface {
  prediction: string;
}

export interface JournalInterface {
  id: string;
  userId: string;
  title: string;
  content: string;
  createdAt: Date;
}