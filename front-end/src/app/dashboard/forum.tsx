import RightSidebar from "@/components/right-sidebar";
import Layout from "../layout";
import ForumCard from "@/components/forum-card";

export default function Forum() {
  const dummyItem = {
    mood: "Positive",
    userId: "Ni Hao",
    createdAt: "20 Dec, 2024",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas",
    postId: "1",
  };
  return (
    <>
      <Layout>
        <div className="scroll-container ml-[48vh] flex flex-col min-w-[50vw] max-w-[50vw] overflow-x-hidden">
          <ForumCard {...dummyItem} />
        </div>
      </Layout>
      <RightSidebar />
    </>
  );
}
