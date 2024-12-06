import { ChevronDown, Salad } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import React from "react";
import { PostInterface } from "@/interfaces/interface";
import Positive from "@/assets/Positive.png";
import Negative from "@/assets/Negative.png";
import Neutral from "@/assets/Neutral.png";

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
          <div className="text-2xl font-semibold">{props.userId}</div>
          <div className="text-xs font-extralight">{props.createdAt}</div>
        </div>
        <Emoji />
      </CardHeader>
      <CardContent>
        <p>{props.content}</p>
      </CardContent>
      <CardFooter>
        <div className="flex gap-2 font-medium leading-none">20 Comments</div>
        <button>
          <ChevronDown className="ml-4" />
        </button>
      </CardFooter>
    </Card>
  );
};

export default ForumCard;
