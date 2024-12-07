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
import { v4 as uuidv4 } from "uuid";
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
import { PredictionInterface } from "@/interfaces/interface";
import { doc, updateDoc, Timestamp, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { AuthContext } from "@/context/AuthContext";

export default function SentimentAnalysis() {
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(AuthContext);
  const [input, setInput] = useState("");
  const [salr, setSalr] = useState<PredictionInterface>({
    prediction: "",
  });
  const [animateOut, setAnimateOut] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [display, setDisplay] = useState(true);
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

  const handleReRender = () => {
    console.log("Resetting state...");
    setSalr({ prediction: "" });
    setInput("");
    setAnimateOut(false);
    setShowChart(false);
    setDisplay(true);
  };

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

  const updateUser = async (prediction: string) => {
    try {
      const newMood = {
        mood: prediction.charAt(0).toUpperCase() + prediction.slice(1),
        date: Timestamp.fromDate(new Date()),
      };
      await updateDoc(doc(db, "MsUser", userData.email), {
        email: userData.email,
        first_name: userData.first_name,
        last_name: userData.last_name,
        password: userData.password,
        moods: [...userData.moods, newMood],
        userId: userData.userId,
      });
      setUserData({
        ...userData,
        moods: [...userData.moods, newMood],
      });
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
      await updateUser(data.prediction);
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
            className="max-w-44 p-2 object-fit"
          />
        );
      case "negative":
        return (
          <img
            src={Negative}
            alt="negative"
            className="max-w-44 p-2 object-fit"
          />
        );
      case "neutral":
        return (
          <img
            src={Neutral}
            alt="neutral"
            className="max-w-44 p-2 object-fit"
          />
        );
      default:
        return <Salad />;
    }
  };

  const Quotes = () => {
    switch (salr.prediction) {
      case "positive":
        return (
          <h2 className="flex font-semibold justify-center items-center text-center">
            You feel happy, Keep up the good works!
          </h2>
        );
      case "negative":
        return (
          <h2 className="flex font-semibold justify-center items-center text-center">
            Your feelings are negative, Hope you feel better!
          </h2>
        );
      case "neutral":
        return (
          <h2 className="flex justify-center items-center text-center">
            Be Proud of your progress!
          </h2>
        );
      default:
        return <h2 className="flex justify-center items-center">Quotes</h2>;
    }
  };

  const handlePost = async () => {
    try {
      const postId = uuidv4();
      const docRef = await setDoc(doc(db, "MsPost", postId), {
        content: input,
        createdAt: Timestamp.fromDate(new Date()),
        first_name: userData.first_name,
        last_name: userData.last_name,
        mood:
          salr.prediction.charAt(0).toUpperCase() + salr.prediction.slice(1),
        userId: userData.email,
      });
      console.log("Document written: ", docRef);
      alert("Post created successfully");
      handleReRender();
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Error creating post");
    }
  };

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet"
      ></link>
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
              animate={
                animateOut ? { opacity: 0, y: -50 } : { opacity: 1, y: 0 }
              }
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
                    <CardDescription>Mental Illness</CardDescription>
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
                            chartConfig[value as keyof typeof chartConfig]
                              ?.label
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
                    <CardTitle className="w-full flex items-center justify-center text-2xl">
                      {salr.prediction.charAt(0).toUpperCase() +
                        salr.prediction.slice(1)}
                    </CardTitle>
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
                  onClick={handleReRender}
                >
                  Cancel
                </Button>
                <Button
                  className="px-20 py-2 bg-blue-500 text-white rounded-lg"
                  onClick={handlePost}
                >
                  Post
                </Button>
              </div>
            </div>
          )}
        </div>
      </LampContainer>
    </>
  );
}
