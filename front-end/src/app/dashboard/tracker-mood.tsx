import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
} from "recharts";
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
import { Button } from "@/components/ui/button";
import { IconArrowBack } from "@tabler/icons-react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ChartDataInterface } from "@/interfaces/interface";
import Happy from "@/assets/happy.jpg";
import Sad from "@/assets/sad.gif";
import Neutral from "@/assets/neutral.jpg";

const chartConfig = {
  desktop: {
    label: "Mood",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function TrackerMood() {
  const navigate = useNavigate();
  const { userData } = useContext(AuthContext);
  const [chartData, setChartData] = useState<ChartDataInterface[]>([]);
  useEffect(() => {
    const data = [];
    for (const mood of userData.moods || []) {
      const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        timeZone: "UTC",
      };
      let day;
      try {
        const timestamp = mood.date;
        const date = new Date((timestamp as any).seconds * 1000);
        day = new Intl.DateTimeFormat("en-US", options).format(date);
      } catch (error) {
        console.error("Error parsing timestamp:", mood.date, error);
        day = "Invalid Date";
      }
      const value =
        mood.mood === "Positive" ? 1 : mood.mood === "Neutral" ? 0 : -1;
      data.push({ desktop: value, day: day });
    }
    setChartData(data);
  }, [userData]);

  const Image = () => {
    if (chartData[chartData.length - 1]?.desktop == 1) {
      return <img src={Happy} className="object-fill w-96 rounded-lg" />;
    } else if (chartData[chartData.length - 1]?.desktop == 0) {
      return <img src={Neutral} className="object-fill w-96 rounded-lg" />;
    } else {
      return <img src={Sad} className="object-fill w-96 rounded-lg" />;
    }
  };

  return (
    <Card className="w-screen h-screen">
      <CardHeader>
        <div className="flex flex-row">
          <Button
            className="mr-5 rounded-full"
            onClick={() => navigate("/dashboard/home")}
          >
            <IconArrowBack />
          </Button>
          <CardTitle className="font-semibold text-2xl">
            Your Current Mood:
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row overflow-visible">
          <ChartContainer config={chartConfig} className="flex-grow">
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
                top: 12,
                bottom: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                dataKey="desktop"
                type="monotone"
                stroke="var(--color-desktop)"
                strokeWidth={4}
                dot={false}
              ></Line>
            </LineChart>
          </ChartContainer>
          <CardFooter className="flex-col items-start justify-center p-[-6] gap-2 text-sm">
            <div>
              <CardDescription className="my-4">
                {chartData[chartData.length - 1]?.desktop == 1
                  ? "Your mood is currently trending up."
                  : chartData[chartData.length - 1]?.desktop == 0
                  ? "Your mood is normal."
                  : "Your mood is currently trending down."}
              </CardDescription>
              <div className="flex justify-center min-h-96 border rounded-lg">
                <Image />
              </div>
              <Button
                className="bg-slate-800 text-white hover:text-black w-full my-4"
                onClick={() => navigate("/dashboard/history")}
              >
                View Mood History
              </Button>
            </div>
          </CardFooter>
        </div>
      </CardContent>
    </Card>
  );
}
