import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { motion } from "framer-motion";
import { useState } from "react";
import { TrendingUp } from 'lucide-react'
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { IconArrowBack } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export default function SentimentAnalysis(){
    const navigate = useNavigate();
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
        console.log(e.target.value);
      };
      const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        animateOut && setAnimateOut(false);
        setTimeout(() => {
          setAnimateOut(true);
          setShowChart(true);
          setDisplay(false);
        }, 1000);
      };

    return (
    <div className="flex flex-col my-5 mx-5">
      <div>
      <Button className="mr-5 rounded-full"
      onClick={() => navigate("/dashboard/home")}>
        <IconArrowBack/>
      </Button>
      </div>

    {display && (<motion.div
        initial={{ opacity: 0.5, y: 100 }}
        animate={animateOut ? { opacity: 0, y: -50 } : { opacity: 1, y: 0 }}
        transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
        }}
    className="h-[30rem] flex flex-col justify-center  items-center px-4">
      <h2 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-black">
        How are you feeling today?
      </h2>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </motion.div>
    )}

    <div className="flex flex-row min-h-screen items-center justify-center pb-20">
    <div>
    {showChart && (<Card className="mx-5">
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
            margin={{
              left: 0,
            }}
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
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )}
    </div>
    <div>
    {showChart && (<Card className="mx-5">
      <CardHeader>
        <CardTitle>Positive/Negative/Neutral</CardTitle>
        <CardDescription>
          desc for emotion bla bla bla bla bla
        </CardDescription>
      </CardHeader>
      <CardContent>
        <img
          // happy
          //src="https://cdn.pixabay.com/photo/2020/12/27/20/24/smile-5865208_1280.png"
          // sad 
          //src="https://www.cambridge.org/elt/blog/wp-content/uploads/2019/07/Sad-Face-Emoji.png"
          // neutral 
          src="https://freepngimg.com/download/icon/emoji/1000092-expressionless-face-emoji-free-icon.png"
          alt="emoticon"
          className="w-full h-48 rounded-lg"
        />
      </CardContent>
      <CardFooter>
        <h2>quotes here</h2>
      </CardFooter>
    </Card>
  )}
    </div>
    
    </div>
    </div>
    )
}