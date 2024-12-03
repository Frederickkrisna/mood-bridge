import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

export default function Home() {
  const { userData } = useContext(AuthContext);
  return (
    <div>
      <h1>{userData.first_name}</h1>
    </div>
  );
}
