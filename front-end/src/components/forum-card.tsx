import { ChevronDown, Salad } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import React, { useEffect, useState } from "react";
import { CommentInterface, PostInterface } from "@/interfaces/interface";
import Positive from "@/assets/Positive.png";
import Negative from "@/assets/Negative.png";
import Neutral from "@/assets/Neutral.png";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

const ForumCard: React.FC<PostInterface> = (props) => {
  const [comments, setComments] = useState<CommentInterface[]>([]);

  const Emoji = () => {
    switch (props.mood) {
      case "Positive":
        return (
          <img src={Positive} alt="positive" className="w-8 h-8 object-cover" />
        );
      case "Negative":
        return (
          <img src={Negative} alt="negative" className="w-8 h-8 object-cover" />
        );
      case "Neutral":
        return (
          <img src={Neutral} alt="neutral" className="w-8 h-8 object-cover" />
        );
      default:
        return <Salad />;
    }
  };

  useEffect(() => {
    const fetchComments = async (postId: string) => {
      try {
        const MsComment = collection(db, "MsComment");
        const q = query(MsComment, where("postId", "==", postId));
        const snapshot = await getDocs(q);
        const comments = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setComments(comments as CommentInterface[]);
      } catch (e) {
        console.log(e);
        return;
      }
    };
    fetchComments(props.id);
  }, [props.id]);

  return (
    <Card className="border rounded-lg">
      <CardHeader className="flex flex-row justify-between">
        <div className="flex-col">
          <div className="text-lg font-bold">
            {props.first_name} {props.last_name}
          </div>
          <div className="text-xs font-extralight">{props.createdAt}</div>
        </div>
        <Emoji />
      </CardHeader>
      <CardContent>
        <p>{props.content}</p>
      </CardContent>
      <CardFooter>
        <div className="flex gap-2 font-medium leading-none">
          {comments.length}
        </div>
        <button>
          <ChevronDown className="ml-4" />
        </button>
      </CardFooter>
    </Card>
  );
};

export default ForumCard;
