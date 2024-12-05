import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
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

  return (
    <Card>
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
        <div className="flex flex-row">
          <ChartContainer config={chartConfig} className="flex-grow">
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
                top: 50,
                bottom: 50,
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
                type="natural"
                stroke="var(--color-desktop)"
                strokeWidth={2}
                dot={false}
              ></Line>
            </LineChart>
          </ChartContainer>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <CardDescription>
              Your mood is currently trending up.
            </CardDescription>
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="fill-foreground" />
              <span className="font-semibold text-foreground">+1.5%</span>
            </div>
          </CardFooter>
        </div>
      </CardContent>
    </Card>
  );
}
