import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { IconArrowBack } from "@tabler/icons-react";

export default function ChatSidebar() {
  const navigate = useNavigate();
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet"
      ></link>
      <nav className="dark:bg-gray-900 bg-slate-400 drop-shadow-2xl min-h-screen pt-10 top-0 left-0 fixed p-5 min-w-[20vw] max-w-[20vw] flex flex-col">
        <div className="flex flex-col text-center ">
          <div className="text-2xl font-semibold text-white flex flex-row gap-5 items-center">
            <Button
              className="rounded-full"
              onClick={() => navigate("/dashboard/home")}
            >
              <IconArrowBack />
            </Button>
            Anonymous Chat
          </div>
          <div className="mt-5 ">
            <Button
              className="dark:bg-slate-400 bg-slate-500 hover:dark:bg-blue-500 hover:bg-cyan-200 mx-auto w-full my-1"
              onClick={() => navigate("/dashboard/anonymous-chat")}
            >
              Anxiety
            </Button>
            <Button
              className="dark:bg-slate-400 bg-slate-500 hover:dark:bg-blue-500 hover:bg-cyan-200 mx-auto w-full my-1"
              onClick={() => navigate("/dashboard/anonymous-chat")}
            >
              Bipolar
            </Button>
            <Button
              className="dark:bg-slate-400 bg-slate-500 hover:dark:bg-blue-500 hover:bg-cyan-200 mx-auto w-full my-1"
              onClick={() => navigate("/dashboard/anonymous-chat")}
            >
              Depression
            </Button>
            <Button
              className="dark:bg-slate-400 bg-slate-500 hover:dark:bg-blue-500 hover:bg-cyan-200 mx-auto w-full my-1"
              onClick={() => navigate("/dashboard/anonymous-chat")}
            >
              Normal
            </Button>
            <Button
              className="dark:bg-slate-400 bg-slate-500 hover:dark:bg-blue-500 hover:bg-cyan-200 mx-auto w-full my-1"
              onClick={() => navigate("/dashboard/anonymous-chat")}
            >
              Schizophrenia
            </Button>
            <Button
              className="dark:bg-slate-400 bg-slate-500 hover:dark:bg-blue-500 hover:bg-cyan-200 mx-auto w-full my-1"
              onClick={() => navigate("/dashboard/anonymous-chat")}
            >
              Stress
            </Button>
            <Button
              className="dark:bg-slate-400 bg-slate-500 hover:dark:bg-blue-500 hover:bg-cyan-200 mx-auto w-full my-1"
              onClick={() => navigate("/dashboard/anonymous-chat")}
            >
              Suicidal
            </Button>
          </div>
        </div>
      </nav>
    </>
  );
}
