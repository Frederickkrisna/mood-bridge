import { CommentInterface } from "@/interfaces/interface";
import { Card, CardContent, CardHeader } from "./ui/card";

const CommentCard: React.FC<CommentInterface> = (props) => {
  return (
    <Card className="border rounded-lg">
      <CardHeader className="flex flex-row justify-between">
        <div className="flex-col">
          <div className="text-lg font-bold">
            {props.first_name} {props.last_name}
          </div>
          <div className="text-xs font-extralight">{props.createdAt}</div>
        </div>
      </CardHeader>
      <CardContent>
        <p>{props.content}</p>
      </CardContent>
    </Card>
  );
};

export default CommentCard;
