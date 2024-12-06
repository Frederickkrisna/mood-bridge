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
    <Layout>
      <div className="flex flex-row min-h-screen">
        {/* Main Content */}
        <div className="flex-1 flex flex-col w-[50vw] overflow-x-hidden px-4 ml-[45vh]">
          {Array.from({ length: 36 }).map((_, index) => (
            <ForumCard key={index} {...dummyItem} />
          ))}
        </div>

        {/* Right Sidebar */}
        <div className="flex-shrink-0 w-[25rem]">
          <RightSidebar />
        </div>
      </div>
    </Layout>
  );
}
