import RightSidebar from "@/components/right-sidebar";
import Layout from "../layout";

export default function Forum() {
  return (
    <>
      <Layout>
        <div className="scroll-container ml-[45vh] flex flex-col min-w-[50vw] max-w-[50vw] overflow-x-hidden">
          <h1 className="w-screen">Forum</h1>
        </div>
      </Layout>
      <RightSidebar />
    </>
  );
}
