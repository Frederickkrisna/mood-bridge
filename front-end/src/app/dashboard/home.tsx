import { AuthContext } from "@/context/AuthContext";
import Layout from "../layout";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  Icon24Hours,
  IconActivityHeartbeat,
  IconChartAreaLine,
  IconMoodCheck,
  IconWriting,
} from "@tabler/icons-react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SentimentAnalysis from "@/assets/sentiment_analysis.png";
import MoodTracker from "@/assets/mood_tracker.jpg";
import Journaling from "@/assets/journaling.gif";
import AnonymousChat from "@/assets/texting.jpg";
import CallCenter from "@/assets/call_center.jpg";

const Image1 = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100">
    <img
      src={SentimentAnalysis}
      alt="Sentiment Analysis"
      className="object-cover w-full h-full"
    />
  </div>
);

const Image2 = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100">
    <img
      src={MoodTracker}
      alt="Mood Tracker"
      className="object-cover w-full h-full"
    />
  </div>
);

const Image3 = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100">
    <img
      src={Journaling}
      alt="Journaling"
      className="object-cover w-full h-full"
    />
  </div>
);

const Image4 = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100">
    <img
      src={AnonymousChat}
      alt="Anonymous Chat"
      className="object-cover w-full h-full"
    />
  </div>
);

const Image5 = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100">
    <img
      src={CallCenter}
      alt="Call Center"
      className="object-cover w-full h-full"
    />
  </div>
);

const items = [
  {
    title: "Sentiment Analysis",
    description: "Analyze your feelings and emotions with AI technology.",
    header: <Image1 />,
    icon: <IconMoodCheck className="h-4 w-4 text-neutral-500" />,
    url: "/dashboard/sentiment-analysis",
  },
  {
    title: "Mood Tracker",
    description: "Take a look back how's your mood progressions.",
    header: <Image2 />,
    icon: <IconChartAreaLine className="h-4 w-4 text-neutral-500" />,
    url: "/dashboard/tracker-mood",
  },
  {
    title: "Journaling and Reflections",
    description: "Write down your thoughts and reflections.",
    header: <Image3 />,
    icon: <IconWriting className="h-4 w-4 text-neutral-500" />,
    url: "/dashboard/journaling",
  },
  {
    title: "Chat with fellow sufferers",
    description:
      "Understand that you are not alone in this journey. Chat with others.",
    header: <Image4 />,
    icon: <IconActivityHeartbeat className="h-4 w-4 text-neutral-500" />,
    url: "/dashboard/anonymous-chat",
  },
  {
    title: "24/7 Support",
    description: "Get help from our team of experts.",
    header: <Image5 />,
    icon: <Icon24Hours className="h-4 w-4 text-neutral-500" />,
    url: "/dashboard/customer-service",
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
      <div className="scroll-container fixed ml-[45vh] mr-[5vh]">
        <BentoGrid>
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              icon={item.icon}
              className={`${
                i === 3 || i === 6 ? "md:col-span-2" : ""
              } border-2 border-slate-100 dark:border-neutral-700`}
              onClick={() => navigate(item.url)}
            />
          ))}
        </BentoGrid>
      </div>
    </Layout>
  );
}
