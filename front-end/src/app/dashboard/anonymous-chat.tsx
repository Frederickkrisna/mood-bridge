import ChatSidebar from "@/components/chat-sidebar";
import { useState } from "react";

export default function AnonymousChat() {
  const [category, setCategory] = useState("");
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>(
    []
  );
  const [input, setInput] = useState("");

  const handleSendMessage = (e: any) => {
    e.preventDefault();
    if (input.trim() !== "") {
      setMessages([...messages, { text: input, sender: "You" as any }]);
      setInput("");
      // Here you can also add logic to send the message to other users
    }
  };

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
            <div className="w-full max-w-md mt-5">
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4 h-64 overflow-y-auto">
                {messages.map((msg, index) => (
                  <div key={index} className="mb-2">
                    <strong>{msg.sender}: </strong>
                    <span>{msg.text}</span>
                  </div>
                ))}
              </div>
              <form onSubmit={handleSendMessage} className="mt-4 flex">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 border rounded-l-lg p-2"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white rounded-r-lg p-2"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      <ChatSidebar setChatType={setCategory} />
    </>
  );
}
