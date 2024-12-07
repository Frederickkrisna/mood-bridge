import { Button } from "@/components/ui/button";
import { IconArrowBack } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { JournalInterface } from "@/interfaces/interface";
import { db } from "@/lib/firebase";

export default function Journaling() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<JournalInterface[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const MsJournal = collection(db, "MsJournal");
        const snapshot = await getDocs(MsJournal);
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
        setPosts(posts as JournalInterface[]);
      } catch (e) {
        console.error("Error fetching posts: ", e);
      }
    };
    fetchPosts();
  }, []);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Title and content cannot be empty!");
      return;
    }
  
    try {
      const newPost: Omit<JournalInterface, "id"> = {
        userId: "defaultUser",
        title,
        content,
        createdAt: new Date(),
      };
  
      const MsJournal = collection(db, "MsJournal");
      const docRef = await addDoc(MsJournal, newPost);
  
      setPosts((prevPosts) => [
        ...prevPosts,
        {
          id: docRef.id,
          ...newPost,
        },
      ]);

      setTitle("");
      setContent("");
      alert("Journal entry saved successfully!");
    } catch (e) {
      console.error("Error saving journal entry: ", e);
      alert("Failed to save the journal entry. Try again later.");
    }
  };
  

  return (
    <div className="flex h-screen w-screen">
      {/* Sidebar */}
      <div className="w-1/3 h-full flex flex-col">
        {/* Static Header */}
        <div className="p-5 border-b border-gray-700">
          <div className="flex items-center mb-5">
            <Button
              className="rounded-full hover:bg-gray-600"
              onClick={() => navigate("/dashboard/home")}
            >
              <IconArrowBack />
            </Button>
            <h2 className="text-xl font-semibold ml-4">
              Start your own journal here!
            </h2>
          </div>
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 text-black bg-gray-200 rounded-full placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
        {/* Scrollable Cards */}
        <div className="flex-grow overflow-y-auto p-5 space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow border border-gray-300"
            >
              <h3 className="font-bold text-lg">{post.title}</h3>
              <p className="text-sm text-gray-500">{post.createdAt.toString()}</p>
              <p className="text-sm mt-2">{post.content.slice(0, 100)}...</p>
            </div>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div className="flex-grow h-screen bg-gray-200 mx-10 my-10 rounded-lg shadow-lg p-6 flex flex-col space-y-6 text-black">
        {/* Title and Save Button */}
        <div className="flex items-center justify-between">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Title"
            className="w-2/3 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 transition"
          >
            Save
          </button>
        </div>

        {/* Formatting Toolbar */}
        <div className="flex items-center space-x-4">
          <select className="px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
            <option>Arial</option>
            <option>Roboto</option>
            <option>Times New Roman</option>
          </select>
          <select className="px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
            <option>12px</option>
            <option>14px</option>
            <option>16px</option>
          </select>
          <div className="flex space-x-2">
            <button className="px-3 py-2 bg-gray-300 rounded-lg font-semibold hover:bg-gray-400 transition">
              B
            </button>
            <button className="px-3 py-2 bg-gray-300 rounded-lg font-semibold hover:bg-gray-400 transition">
              I
            </button>
            <button className="px-3 py-2 bg-gray-300 rounded-lg font-semibold hover:bg-gray-400 transition">
              U
            </button>
          </div>
        </div>

        {/* Textarea */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start writing..."
          className="w-full flex-grow h-[300px] p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none bg-white"
        ></textarea>
      </div>
    </div>
  );
}
