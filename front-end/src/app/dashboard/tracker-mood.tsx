import { TrendingUp } from "lucide-react"
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts"
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
import { Button } from "@/components/ui/button"
import { IconArrowBack } from "@tabler/icons-react"
import { useContext, useState } from "react"
import { AuthContext } from "@/context/AuthContext"
import { TrackerMoodInterface } from "@/interfaces/interface"

const chartData = [
    { month: "January", desktop: 1 },
    { month: "February", desktop: 2 },
    { month: "March", desktop: 3 },
    { month: "April", desktop: 1 },
    { month: "May", desktop: 2 },
    { month: "June", desktop: 3 },
]
  
const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

export default function TrackerMood(){
    const { userData } = useContext(AuthContext);
    // const [chartData, setChartData] = useState<TrackerMoodInterface[]>([{mood: "", date: ""}]);
    return (
        <Card>
            <CardHeader>
                <div className="flex flex-row">
                    <Button className="mr-5 rounded-full">
                        <IconArrowBack/>
                    </Button>
                    <CardTitle className="font-semibold text-2xl">Your Current Mood:</CardTitle>
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
                            dataKey="month"
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
                            >
                                <LabelList
                                    position="top"
                                    offset={12}
                                    className="fill-foreground"
                                    fontSize={12}
                                />    
                            </Line>
                        </LineChart>
                    </ChartContainer>
                    <CardFooter className="flex-col items-start gap-2 text-sm">
                        <CardDescription>
                            Your mood is currently trending up.
                        </CardDescription>
                        <div className="flex items-center gap-2">
                            <TrendingUp size={16} className="fill-foreground"/>
                            <span className="font-semibold text-foreground">+1.5%</span>
                        </div>
                    </CardFooter>
                </div>
            </CardContent>
        </Card>
    )
}