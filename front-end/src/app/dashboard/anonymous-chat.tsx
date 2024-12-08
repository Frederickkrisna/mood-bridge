import ChatSidebar from "@/components/chat-sidebar";
import { useState } from "react";

export default function AnonymousChat() {
  const [category, setCategory] = useState("");
  return (
    <>
      <div className="flex items-center justify-center h-screen dark:bg-slate-950 bg-slate-50">
        {category === "" ? (
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl font-bold">Anonymous Chat</h1>
            <p className="text-lg mt-5">
              Choose a topic to chat with others anonymously
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl font-bold">Chatting about {category}</h1>
            <p className="text-lg mt-5">
              Chat with others anonymously about {category}
            </p>
          </div>
        )}
      </div>
      <ChatSidebar setChatType={setCategory} />;
    </>
  );
}
