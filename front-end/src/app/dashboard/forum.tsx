import RightSidebar from "@/components/right-sidebar";
import Layout from "../layout";
import ForumCard from "@/components/forum-card";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { PostInterface } from "@/interfaces/interface";
import { db } from "@/lib/firebase";

export default function Forum() {
  const [posts, setPosts] = useState<PostInterface[]>([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const MsPost = collection(db, "MsPost");
        const snapshot = await getDocs(MsPost);
        const posts = snapshot.docs.map((doc) => {
          const data = doc.data();
          const createdAt = data.createdAt?.toDate
            ? data.createdAt.toDate()
            : new Date();
          return {
            id: doc.id,
            ...data,
            createdAt: createdAt.toLocaleString(),
          };
        });
        setPosts(posts as PostInterface[]);
      } catch (e) {
        console.log("Error fetching post: ", e);
        return;
      }
    };
    fetchPosts();
  }, []);

  return (
    <Layout>
      <div className="flex flex-row min-h-screen">
        <div className="flex-1 flex flex-col w-[50vw] overflow-x-hidden px-4 ml-[45vh]">
          <div className="flex flex-col mt-4">
            {posts.map((post) => (
              <ForumCard key={post.id} {...post} />
            ))}
          </div>
        </div>

        <div className="flex-shrink-0 w-[25rem]">
          <RightSidebar posts={posts} />
        </div>
      </div>
    </Layout>
  );
}
