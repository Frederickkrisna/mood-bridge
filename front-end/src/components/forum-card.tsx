import { ArrowDown, ChevronDown, Salad } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

export default function ForumCard() {
  const Emoji = () => {
    return (
      <div className="flex items-center justify-center">
        <Salad />
      </div>
    );
  };

  return (
    <Card className="border rounded-lg">
      <CardHeader className="flex flex-row justify-between">
        <div className="flex-col">
          <div className="text-2xl font-semibold">Ni Hao</div>
          <div className="text-xs font-extralight">20 Dec, 2024</div>
        </div>
        <Emoji />
      </CardHeader>
      <CardContent>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
          dignissim, lectus ac volutpat suscipit, nibh dui aliquam justo, eget
          tempus velit arcu at dolor. Nam ut quam non purus sodales bibendum.
          Nam molestie iaculis pulvinar. Pellentesque gravida et dolor sed
          tempor. Vestibulum id fermentum augue, vel vulputate turpis. Aenean
          consequat auctor arcu, sit amet maximus risus placerat ut. Suspendisse
          volutpat scelerisque ipsum, vitae elementum velit malesuada eget.
        </p>
      </CardContent>
      <CardFooter>
        <div className="flex gap-2 font-medium leading-none">20 Comments</div>
        <button>
          <ChevronDown className="ml-4" />
        </button>
      </CardFooter>
    </Card>
  );
}
