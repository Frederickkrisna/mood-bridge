import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { Salad, TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { IconArrowBack } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LampContainer } from "@/components/ui/lamp";
import axios from "axios";
import Positive from "@/assets/Positive.png";
import Negative from "@/assets/Negative.png";
import Neutral from "@/assets/Neutral.png";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { MoodInterface, PredictionInterface } from "@/interfaces/interface";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { AuthContext } from "@/context/AuthContext";

export default function SentimentAnalysis() {
  const { userData } = useContext(AuthContext);
  const [moods, setMoods] = useState(userData.moods);
  const [mood, setMood] = useState<MoodInterface>({ mood: "", date: "" });
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [salr, setSalr] = useState<PredictionInterface>({
    prediction: "",
  });
  const placeholders = [
    "What has been the highlight of your day so far?",
    "Did anything make you feel stressed or upset today?",
    "What's something that brought you joy recently?",
    "If you could sum up your mood in one sentence, what would it be?",
    "What thoughts are running through your mind right now?",
    "Is there anything that's been bothering you lately?",
  ];
  const chartData = [
    { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
    { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
    { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
    { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
    { browser: "other", visitors: 90, fill: "var(--color-other)" },
  ];
  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    chrome: {
      label: "Chrome",
      color: "hsl(var(--chart-1))",
    },
    safari: {
      label: "Safari",
      color: "hsl(var(--chart-2))",
    },
    firefox: {
      label: "Firefox",
      color: "hsl(var(--chart-3))",
    },
    edge: {
      label: "Edge",
      color: "hsl(var(--chart-4))",
    },
    other: {
      label: "Other",
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig;

  const [animateOut, setAnimateOut] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [display, setDisplay] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const salr_predict = async (text: string) => {
    try {
      const response = await axios.post("http://localhost:5000/salr-predict", {
        input: text,
      });
      return response.data;
    } catch (error) {
      console.log("Error: ", error);
      throw error;
    }
  };

  const updateUser = async () => {
    try {
      await updateDoc(doc(db, "MsUser", userData.email), {
        email: userData.email,
        first_name: userData.first_name,
        last_name: userData.last_name,
        password: userData.password,
        moods: [...userData.moods, mood],
        userId: userData.userId,
      });
      console.log(userData.moods);
    } catch (error) {
      console.log("Error: ", error);
      alert("Error updating user");
      return;
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input) {
      alert("Please enter some text");
      return;
    }
    try {
      const data = await salr_predict(input);
      setSalr(data);

      const prediction =
        data.prediction.charAt(0).toUpperCase() + data.prediction.slice(1);
      const now = new Date();
      const formattedDate = `${now.toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })} at ${now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      })} ${Intl.DateTimeFormat().resolvedOptions().timeZone}`;

      setSalr(data);
      setMood({ mood: prediction, date: formattedDate });
      await updateUser();
      setAnimateOut(false);
      setTimeout(() => {
        setAnimateOut(true);
        setShowChart(true);
        setDisplay(false);
      }, 1000);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const Emoji = () => {
    switch (salr.prediction) {
      case "positive":
        return (
          <img
            src={Positive}
            alt="positive"
            className="max-w-44 object-cover"
          />
        );
      case "negative":
        return (
          <img
            src={Negative}
            alt="negative"
            className="max-w-44 object-cover"
          />
        );
      case "neutral":
        return (
          <img src={Neutral} alt="neutral" className="max-w-44 object-cover" />
        );
      default:
        return <Salad />;
    }
  };

  const Quotes = () => {
    switch (salr.prediction) {
      case "positive":
        return (
          <h2 className="flex justify-center items-center">
            You feel happy, Keep up the good works!
          </h2>
        );
      case "negative":
        return (
          <h2 className="flex justify-center items-center">
            Daily Reminder: Be Grateful for what you have while working for what
            you want
          </h2>
        );
      case "neutral":
        return (
          <h2 className="flex justify-center items-center">
            Be Proud of your progress
          </h2>
        );
      default:
        return <h2 className="flex justify-center items-center">Quotes</h2>;
    }
  };

  return (
    <LampContainer>
      <div className="flex items-start w-screen fixed  ml-5 z-50">
        <Button
          className="rounded-full"
          onClick={() => navigate("/dashboard/home")}
        >
          <IconArrowBack />
        </Button>
      </div>
      <div className="w-screen h-screen items-center justify-center flex flex-col fixed">
        {display && (
          <motion.div
            initial={{ opacity: 0.5, y: 100 }}
            animate={animateOut ? { opacity: 0, y: -50 } : { opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className=" flex flex-col justify-center items-center mb-10 sm:mb-20"
          >
            <h2 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl text-white">
              How are you feeling today?
            </h2>
            <PlaceholdersAndVanishInput
              placeholders={placeholders}
              onChange={handleChange}
              onSubmit={onSubmit}
            />
          </motion.div>
        )}

        {showChart && (
          <div className="flex flex-col items-center justify-center mb-10 sm:mb-20">
            {/* Chart and Emoji Cards */}
            <div className="flex flex-row items-center justify-center">
              {/* Chart Card */}
              <Card className="mx-5 min-h-80 max-h-80">
                <CardHeader>
                  <CardTitle>Bar Chart - Mixed</CardTitle>
                  <CardDescription>January - June 2024</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig}>
                    <BarChart
                      accessibilityLayer
                      data={chartData}
                      layout="vertical"
                      margin={{ left: 0 }}
                    >
                      <YAxis
                        dataKey="browser"
                        type="category"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) =>
                          chartConfig[value as keyof typeof chartConfig]?.label
                        }
                      />
                      <XAxis dataKey="visitors" type="number" hide />
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                      />
                      <Bar dataKey="visitors" layout="vertical" radius={5} />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
                <CardFooter className="flex-col items-start gap-2 text-sm">
                  <div className="flex gap-2 font-medium leading-none">
                    Trending up by 5.2% this month{" "}
                    <TrendingUp className="h-4 w-4" />
                  </div>
                  <div className="leading-none text-muted-foreground">
                    Showing total visitors for the last 6 months
                  </div>
                </CardFooter>
              </Card>

              {/* Emoji Card */}
              <Card className="mx-5">
                <CardHeader>
                  <CardTitle>{salr.prediction}</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center p-[-6]">
                  <Emoji />
                </CardContent>
                <CardFooter>
                  <div className="flex justify-center items-center p-5 w-96">
                    <Quotes />
                  </div>
                </CardFooter>
              </Card>
            </div>

            {/* Cancel and Post Buttons */}
            <div className="flex flex-row gap-5 justify-center p-5">
              <Button
                className="px-20 py-2 bg-red-500 text-white rounded-lg"
                onClick={() => {
                  setShowChart(false);
                  setDisplay(true);
                  setAnimateOut(false);
                }}
              >
                Cancel
              </Button>
              <Button className="px-20 py-2 bg-blue-500 text-white rounded-lg">
                Post
              </Button>
            </div>
          </div>
        )}
      </div>
    </LampContainer>
  );
}
