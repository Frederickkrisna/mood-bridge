import { IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useTheme } from "./theme-provider";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { PostInterface } from "@/interfaces/interface";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface RightSideBarInterface {
  readonly filterPosts: (filter: string) => void;
}

const RightSidebar: React.FC<RightSideBarInterface> = ({ filterPosts }) => {
  const { theme } = useTheme();
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log(searchQuery);
    }
  };

  const handleFilter = (filter: string) => {
    filterPosts(filter);
  };

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
        return;
      }
    };
    fetchPosts();
  }, []);

  const getTrendingTopics = (posts: PostInterface[]) => {
    const topics: { [key: string]: number } = {};
    for (const post of posts) {
      topics[post.mental_state] = (topics[post.mental_state] || 0) + 1;
    }
    const sortedTopics = Object.entries(topics).sort((a, b) => b[1] - a[1]);
    return sortedTopics;
  };

  const trendingTopics = getTrendingTopics(posts);

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
            {trendingTopics.map(([topic, count]) => (
              <div key={topic}>
                <button
                  onClick={() => handleFilter(topic)}
                  className="flex justify-between p-2 w-full hover:dark:bg-gray-600 hover:bg-slate-50 rounded-lg"
                >
                  <p className="text-lg font-semibold">{topic}</p>
                  <p className="text-xs font-extralight text-slate-500 pt-1">
                    {count} posts
                  </p>
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </nav>
  );
};

export default RightSidebar;
