import { useContext, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { v4 as uuidv4 } from "uuid";
import { AuthContext } from "@/context/AuthContext";

interface InputCommentProps {
  readonly postId: string;
  readonly refreshComments: () => void;
}

export default function InputComment({
  postId,
  refreshComments,
}: InputCommentProps) {
  const [comment, setComment] = useState<string>("");
  const { userData } = useContext(AuthContext);
  const handlePost = async () => {
    try {
      const commentId = uuidv4();
      const docRef = await setDoc(doc(db, "MsComment", commentId), {
        postId: postId,
        content: comment,
        createdAt: Timestamp.fromDate(new Date()),
        first_name: userData.first_name,
        last_name: userData.last_name,
        userId: userData.email,
      });
      setComment("");
      console.log("Document written: ", docRef);
      alert("Comment posted");
      refreshComments();
    } catch (e) {
      console.log(e);
      alert("Failed to post comment");
    }
  };
  return (
    <Card className="border rounded-none">
      <CardContent className="flex flex-row p-5">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={2}
          placeholder="Post your reply"
          className="w-full rounded-sm outline-none flex items-center mr-5 justify-center bg-transparent"
        ></textarea>
        <button className="text-blue-500" onClick={handlePost}>
          Post
        </button>
      </CardContent>
    </Card>
  );
}
