import { Button } from "@/components/ui/button";
import { IconArrowBack } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export default function Journaling() {
  const navigate = useNavigate();
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
            <h2 className="text-xl font-semibold ml-4 ">Start your own journal here!</h2>
          </div>
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 bg-gray-200 rounded-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
        {/* Scrollable Cards */}
        <div className="flex-grow overflow-y-auto p-5 space-y-4">
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className="bg-white text-black rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="font-bold text-lg">TitleText</h3>
              <p className="text-sm text-gray-500">July 2nd, 2022</p>
              <p className="text-sm mt-2">
                Lorem ipsum dolor sit amet, aut pariatur dolores eum quod
                dolores est molestias earum...
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div className="flex-grow h-full bg-gray-200 mx-5 my-5 rounded-lg shadow-lg p-6 flex flex-col space-y-6">
        {/* Title and Save Button */}
        <div className="flex items-center justify-between">
          <input
            type="text"
            placeholder="Enter Title"
            className="w-2/3 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button className="px-6 py-2 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 transition">
            Save
          </button>
        </div>

        {/* Formatting Toolbar */}
        <div className="flex items-center space-x-4">
          <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
            <option>Arial</option>
            <option>Roboto</option>
            <option>Times New Roman</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
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
          placeholder="Start writing..."
          className="w-full flex-grow h-[300px] p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none bg-white"
        ></textarea>
      </div>
    </div>
  );
}
