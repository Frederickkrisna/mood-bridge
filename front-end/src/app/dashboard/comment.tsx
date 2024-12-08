import RightSidebar from "@/components/right-sidebar";
import Layout from "../layout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CommentInterface, PostInterface } from "@/interfaces/interface";
import CommentCard from "@/components/comment-card";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import ForumCard from "@/components/forum-card";
import InputComment from "@/components/input-comment";

export default function Comment() {
  const { id } = useParams<string>();
  const [comments, setComments] = useState<CommentInterface[]>([]);
  const [post, setPost] = useState<PostInterface>({
    id: "",
    content: "",
    mood: "",
    createdAt: "",
    userId: "",
    first_name: "",
    last_name: "",
    mental_state: "",
  });

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

  useEffect(() => {
    const getPost = async (postId: string) => {
      try {
        const docRef = doc(db, "MsPost", postId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const createdAt = data.createdAt.toDate().toLocaleString();
          return {
            id: docSnap.id,
            ...data,
            createdAt,
          };
        } else {
          return null;
        }
      } catch (e) {
        console.error("Error getting document:", e);
        return null;
      }
    };

    if (id) {
      fetchComments(id);
      const docPost = getPost(id);
      docPost.then((data) => {
        if (data) {
          setPost(data as PostInterface);
        }
      });
    }
  }, [id]);

  const refreshComments = async () => {
    if (id) {
      fetchComments(id);
    }
  };

  return (
    <Layout>
      <div className="flex flex-row min-h-screen">
        <div className="flex-1 flex flex-col w-[75vw] overflow-x-hidden px-4 ml-[45vh]">
          {post && <ForumCard {...post} />}
          <InputComment
            postId={id as string}
            refreshComments={refreshComments}
          />
          <div className="flex flex-col">
            {comments.map((comment) => (
              <CommentCard key={comment.id} {...comment} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
