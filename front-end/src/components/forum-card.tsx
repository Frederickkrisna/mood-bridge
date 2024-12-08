import { MessagesSquare, Salad } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import React from "react";
import { PostInterface } from "@/interfaces/interface";
import Positive from "@/assets/Positive.png";
import Negative from "@/assets/Negative.png";
import Neutral from "@/assets/Neutral.png";
import { Link } from "react-router-dom";

const ForumCard: React.FC<PostInterface> = (props) => {
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
        <Link
          to={{
            pathname: `/dashboard/comment/${props.id}`,
          }}
          className="flex flex-row gap-4 hover:dark:bg-slate-900 p-1 rounded-lg items-center justify-center"
        >
          <MessagesSquare />
          <div className="flex gap-2 font-medium leading-none">
            View Comments
          </div>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ForumCard;
