import RightSidebar from "@/components/right-sidebar";
import Layout from "../layout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CommentInterface } from "@/interfaces/interface";
import CommentCard from "@/components/comment-card";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function Comment() {
  const { id } = useParams<string>();
  const [comments, setComments] = useState<CommentInterface[]>([]);

  useEffect(() => {
    const fetchComments = async (postId: string) => {
      try {
        const MsComment = collection(db, "MsComment");
        const q = query(MsComment, where("postId", "==", postId));
        const snapshot = await getDocs(q);
        const comments = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt.toDate().toLocaleString(),
        }));
        setComments(comments as CommentInterface[]);
      } catch (e) {
        console.log(e);
        return;
      }
    };
    if (id) {
      fetchComments(id);
    }
  }, [id]);

  return (
    <Layout>
      <div className="flex flex-row min-h-screen">
        <div className="flex-1 flex flex-col w-[50vw] overflow-x-hidden px-4 ml-[45vh]">
          <div className="flex flex-col mt-4">
            {comments.map((comment) => (
              <CommentCard key={comment.id} {...comment} />
            ))}
          </div>
        </div>
        <div className="flex-shrink-0 w-[25rem]">
          <RightSidebar />
        </div>
      </div>
    </Layout>
  );
}
