import { AuthContext } from "@/context/AuthContext";
import Layout from "../layout";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  IconArrowWaveRightUp,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);

const items = [
  {
    title: "Sentiment Analysis",
    description: "Analyze your feelings and emotions with AI technology.",
    header: <Skeleton />,
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Mood Tracker",
    description: "Take a look back how's your mood progressions.",
    header: <Skeleton />,
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Journaling and Reflections",
    description: "Write down your thoughts and reflections.",
    header: <Skeleton />,
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Chat with fellow sufferers",
    description:
      "Understand that you are not alone in this journey. Chat with others.",
    header: <Skeleton />,
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "24/7 Support",
    description: "Get help from our team of experts.",
    header: <Skeleton />,
    icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
  },
];

export default function Home() {
  const { userData } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(userData);
    if (userData.first_name === "") {
      navigate("/");
    }
  }, [userData, navigate]);
  return (
    <Layout>
      <BentoGrid className="max-w-8xl mx-auto ml-5 mt-5 my-10">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            icon={item.icon}
            className={i === 3 || i === 6 ? "md:col-span-2" : ""}
            onClick={() => console.log("clicked")}
          />
        ))}
      </BentoGrid>
    </Layout>
  );
}
