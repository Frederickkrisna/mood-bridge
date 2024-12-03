import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import Layout from "../layout";

export default function Home() {
  const { userData } = useContext(AuthContext);
  return (
    <Layout>
      <div>
        <h1>{userData.first_name}</h1>
      </div>
    </Layout>
  );
}
