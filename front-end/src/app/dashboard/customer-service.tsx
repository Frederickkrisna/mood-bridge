import { useState, useEffect, useRef } from "react";
import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import { BeatLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import Markdown from "../../components/Markdown";
import { information } from "@/assets/InformationData";
import { auth as firebaseAuth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore"; 

const genAI = new GoogleGenerativeAI("AIzaSyDw2q5h-LRDhEcv83EXxy0qlYWsjg8f8v0");

export default function GeminiChatBot() {
    const [displayName, setDisplayname] = useState("");
    const [history, setHistory] = useState(information);
    const navigate = useNavigate();
    const [model, setModel] = useState<GenerativeModel | null>(null);
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);
    const [chatContent, setChatContent] = useState<{ user: string; bot: string }[]>([]);
    const [askContinue, setAskContinue] = useState(false);
    const [timeoutEnabled, setTimeoutEnabled] = useState(true); // State to enable/disable the timeout
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null); // State to store the timeout ID
    const [secondTimeoutId, setSecondTimeoutId] = useState<NodeJS.Timeout | null>(null); // State to store the second timeout ID
    
    const auth = firebaseAuth;

    useEffect(() => {
        // Tambahkan listener untuk mendapatkan pengguna saat ini
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
          if (user) {
            try {
              // Ambil email pengguna
              const email = user.email;
              if (!email) {
                navigate("/auth/login"); // Jika email tidak ada, arahkan ke login
                return;
              }
      
              // Query ke Firestore untuk mendapatkan first_name
              const userDocRef = doc(db, "MsUser", email); // Path ke dokumen berdasarkan email
              const userDoc = await getDoc(userDocRef);
      
              if (userDoc.exists()) {
                const userData = userDoc.data();
                const firstName = userData.first_name || "User"; // Ambil first_name atau gunakan default
                
                setDisplayname(firstName); // Set displayName
      
                // Tambahkan data ke history
                setHistory((prevHistory) => [
                  ...prevHistory,
                  {
                    role: "user",
                    parts: [
                      {
                        text: `Data diri: Nama Lengkap: ${firstName}, Email: ${email}`,
                      },
                    ],
                  },
                  {
                    role: "model",
                    parts: [
                      {
                        text: "Data diri berhasil kami ingat, Kami akan memberikan bantuan seputar mood dan mental illness",
                      },
                    ],
                  },
                ]);
              } else {
                console.error("User document not found in Firestore");
              }
            } catch (error) {
              console.error("Error fetching user data from Firestore:", error);
            }
          } else {
            navigate("/auth/login"); // Jika tidak ada user, arahkan ke login
          }
        });
      
        // Cleanup listener saat komponen unmount
        return () => unsubscribe();
      }, [auth, navigate, db]);

  useEffect(() => {
    // Fetch the generative model when the component mounts

    const fetchModel = async () => {
      try {
        setPageLoading(true);
        // classifier = await pipeline("sentiment-analysis");
        const generativeModel = await genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
        });

        setModel(generativeModel);
      } catch (error) {
        console.error("Error loading generative model:", error);
      } finally {
        setLoading(false);
        setPageLoading(false);
      }
    };
    fetchModel();
  }, []);

  useEffect(() => {
    adjustTextareaHeight();
  }, [prompt]);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset the height
      textarea.style.height = `${textarea.scrollHeight + 10}px`;
    }
  };

  const resetTimers = () => {
    if (timeoutId) {
      clearTimeout(timeoutId); // Clear the previous timeout
    }
    if (secondTimeoutId) {
      clearTimeout(secondTimeoutId); // Clear the second timeout if it exists
    }
    setAskContinue(false); // Hide the "Ask Continue" message
  };

  const resetTimer = () => {
    resetTimers();

    const newTimeoutId = setTimeout(() => {
      console.log("No response for 30 seconds");
      setAskContinue(true);

      const newSecondTimeoutId = setTimeout(() => {
        console.log("No response for 20 seconds after the first 30 seconds");
        if (timeoutEnabled) {
          setTimeoutEnabled(false);
          alert("Thank you for chatting with me!");
          navigate("/dashboard/home");
        }
      }, 20000); // 20 seconds in milliseconds

      setSecondTimeoutId(newSecondTimeoutId);
    }, 30000); // 30 seconds in milliseconds

    setTimeoutId(newTimeoutId); // Set the new timeout ID
  };

  const getResponse = async () => {
    if (model) {
      if (!prompt) {
        return;
      }
      try {
        setLoading(true);
        resetTimer();
        // Add the user's prompt to the chat content and history
        setChatContent((prevChatContent) => [
          ...prevChatContent,
          { user: prompt, bot: "" },
        ]);
        const newHistory = [
          ...history,
          { role: "user", parts: [{ text: prompt }] },
        ];
        setHistory(newHistory);
        const tempPrompt = prompt;
        setPrompt("");
        console.log(newHistory);

        const chat = model.startChat({
          history: newHistory,
          generationConfig: {},
        });
        const result = await chat.sendMessage(tempPrompt);
        const res = await result.response;
        const text = await res.text(); // Await the text response

        // Update the bot response in the chat content
        setChatContent((prevChatContent) => {
          const updatedChatContent = [...prevChatContent];
          updatedChatContent[updatedChatContent.length - 1].bot = text;
          return updatedChatContent;
        });
        setHistory((prevHistory) => [
          ...prevHistory,
          { role: "model", parts: [{ text: text }] },
        ]);
      } catch (error) {
        console.error("Error generating content:", error);
        setChatContent((prevChatContent) => {
          const updatedChatContent = [...prevChatContent];
          updatedChatContent[updatedChatContent.length - 1].bot =
            "Sorry, I couldn't answer that right now 😞, could you please ask another question?";
          return updatedChatContent;
        });
      } finally {
        setLoading(false);
        setPrompt("");
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      getResponse();
    }
  };

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&display=swap"
        rel="stylesheet"
      />

      <div className="w-screen min-h-screen flex flex-col font-sans">
        {pageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 bg-black">
            <BeatLoader loading={loading} size={25} color="white" margin={5} />
          </div>
        )}

        <div className="mx-auto py-5 items-center justify-center">
          <div className="w-[100vh] mb-20">
            {/* Display Name Greeting */}
            <div className="w-full">
              <div className="flex justify-start">
                {displayName ? (
                  <div className="mb-5 text-black bg-gray-200 p-5 rounded-xl max-w-[65%] shadow-md">
                    {`Halo ${displayName}👋, Bagaimana suasana hatimu hari ini?`}
                  </div>
                ) : (
                  <div className="my-5 text-black bg-gray-200 p-5 rounded-xl max-w-[65%] shadow-md">
                    <BeatLoader loading={true} size={10} color="white" margin={3} />
                  </div>
                )}
              </div>
            </div>

            {/* Chat Bubbles */}
            <div className="flex-1 overflow-y-auto w-full px-5">
              {chatContent.map((content, index) => (
                <div key={index} className="w-full flex flex-col mb-4">
                  {/* User Message */}
                  <div className="flex justify-end">
                    <div className="bg-purple-500 text-white p-4 rounded-xl max-w-[65%] shadow-md">
                      {content.user}
                    </div>
                  </div>
                  {/* Bot Response */}
                  <div className="flex justify-start mt-2">
                    {content.bot ? (
                      <div className="bg-gray-200 text-black p-4 rounded-xl max-w-[65%] shadow-md">
                        <Markdown key={index} markdown={content.bot} />
                      </div>
                    ) : (
                      <div className="my-5 text-black bg-gray-200 p-5 rounded-xl max-w-[65%] shadow-md">
                        <BeatLoader loading={loading} size={10} color="white" margin={3} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Question */}
            <div className="w-full">
              {askContinue && (
                <div className="flex justify-start">
                  <div className="mb-5 text-black bg-gray-200 p-5 rounded-xl max-w-[65%] shadow-md">
                    {`${displayName}, apakah masih ada yang ingin Anda tanyakan? 😊`}
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="fixed bottom-0 w-full min-h-[4vh] my-4 flex items-center">
              <textarea
                id="multiliner"
                placeholder="Type something ..."
                className="px-3 pt-3 rounded-xl bg-gray-200 text-black min-w-[100vh] font-sans mr-5 resize-none overflow-hidden"
                value={prompt}
                onKeyDown={handleKeyDown}
                onChange={(e) => {
                  setPrompt(e.target.value);
                  if (chatContent.length > 0) {
                    setTimeoutEnabled(true);
                    resetTimer();
                  }
                }}
                ref={textareaRef}
              />
              {/* <button
                onClick={getResponse}
                disabled={loading}
                className="rounded-xl border text-purple-500 border-purple-500 h-[4rem] px-5"
              >
                Send
              </button> */}
              <button onClick={getResponse}
                disabled={loading}
                className="mr-2 relative inline-flex h-12 w-20 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-4 focus:ring-offset-slate-50">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full text-white bg-slate-950 px-3 py-1 text-sm font-medium backdrop-blur-3xl">
                    Send
                </span>
            </button>
              {/* <button
                onClick={() => {
                  setTimeoutEnabled(false);
                  alert("Thank you for chatting with me!");
                  navigate("/dashboard/home");
                }}
                disabled={loading}
                className="ml-5 rounded-xl text-red-500 bg-background border-[2px] border-red-500 h-[4rem] px-5"
              >
                End Chat
              </button> */}
              <button 
              onClick={() => {
                setTimeoutEnabled(false);
                alert("Thank you for chatting with me!");
                navigate("/dashboard/home");
              }}
              disabled={loading}
              className="shadow-[inset_0_0_0_2px_#616467] px-5 py-3 rounded-full tracking-widest bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200">
                End Chat
            </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};