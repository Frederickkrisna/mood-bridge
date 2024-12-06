import RightSidebar from "@/components/right-sidebar";
import Layout from "../layout";
import ForumCard from "@/components/forum-card";

export default function Forum() {
  return (
    <>
      <Layout>
        <div className="scroll-container ml-[45vh] flex flex-col min-w-[50vw] max-w-[50vw] overflow-x-hidden">
          <ForumCard />
        </div>
      </Layout>
      <RightSidebar />
    </>
  );
}
