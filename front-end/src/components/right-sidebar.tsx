import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import { useTheme } from "./theme-provider";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function RightSidebar() {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log(searchQuery);
    }
  };

  const trendingTopics = [
    { title: "Depression", post: 100 },
    { title: "Anxiety", post: 90 },
    { title: "Stress", post: 80 },
    { title: "Mental Health", post: 77 },
    { title: "Therapy", post: 75 },
    { title: "Counselling", post: 60 },
  ];

  return (
    <nav className=" min-h-screen pt-10 top-0 right-0 fixed min-w-[58vh] flex flex-col items-center space-y-4">
      <div
        className={`flex items-center border border-primary rounded-lg ml-10 mx-10 ${
          theme === "dark" ? "bg-white text-black" : "bg-slate-600 text-white"
        } text-sm w-[20rem]`}
      >
        <IconSearch className="mx-2" />
        <input
          className="bg-transparent border-none outline-none w-full py-[0.5rem]"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearchKeyDown}
        />
      </div>
      <Card className="w-[20rem]">
        <CardHeader>
          <CardTitle className="font-semibold text-2xl">
            What's happening
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col">
            {trendingTopics.map((topic, index) => (
              <div key={index}>
                <button className="flex justify-between p-2 w-full hover:dark:bg-gray-600 hover:bg-slate-50 rounded-lg">
                  <p className="text-lg font-semibold">{topic.title}</p>
                  <p className="text-xs font-extralight text-slate-500 pt-1">
                    {topic.post} posts
                  </p>
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </nav>
  );
}
