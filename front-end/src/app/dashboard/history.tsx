import { useContext, useEffect, useState } from "react";
import Layout from "../layout";
import { PostInterface } from "@/interfaces/interface";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { AuthContext } from "@/context/AuthContext";
import ForumCard from "@/components/forum-card";

export default function History() {
  const { userData } = useContext(AuthContext);
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<PostInterface[]>([]);

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
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const filterPosts = () => {
      const filtered = posts.filter((post) => post.userId === userData.email);
      setFilteredPosts(filtered);
    };

    filterPosts();
  }, [posts, userData.email]);

  return (
    <Layout>
      <div className="flex flex-row min-h-screen">
        <div className="flex-1 flex flex-col w-[75vw] overflow-x-hidden px-4 ml-[45vh]">
          <div className="flex flex-col mt-4">
            {filteredPosts.map((post) => (
              <ForumCard key={post.id} {...post} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
