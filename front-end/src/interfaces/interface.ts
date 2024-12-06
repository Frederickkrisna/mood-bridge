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
  moods: MoodInterface[];
}

export interface PostInterface {
  postId: string;
  userId: string;
  content: string;
  mood: string;
  createdAt: string;
}

export interface CommentInterface {
  commentId: string;
  content: string;
  createdAt: string;
  postId: string;
  userId: string;
}

export interface MoodInterface {
  mood: string;
  date: string;
}

export interface ChartDataInterface {
  desktop: number; // 1 = Positive, 0 = Neutral, -1 = Negative
  day: string;
}
