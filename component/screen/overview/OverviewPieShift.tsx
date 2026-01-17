"use client"

import * as React from "react"
import { Pie, PieChart, Sector, Label } from "recharts"
import { type PieSectorDataItem } from "recharts/types/polar/Pie"
import dayjs from "dayjs"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@shadcn/components/ui/card"
import {
    ChartContainer,
    ChartStyle,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@shadcn/components/ui/chart"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@shadcn/components/ui/popover"
import { Button } from "@shadcn/components/ui/button"
import { Calendar } from "@shadcn/components/ui/calendar"
import { CalendarIcon } from "lucide-react"

import { fetchListLalin } from "@libs/service/LalinService"

type ShiftPieData = {
    shift: string
    total: number
    percent: number
    fill: string
}

const chartConfig = {
    total: { label: "Total Kendaraan" },
    shift1: { label: "Shift 1", color: "var(--chart-1)" },
    shift2: { label: "Shift 2", color: "var(--chart-2)" },
    shift3: { label: "Shift 3", color: "var(--chart-3)" },
} satisfies ChartConfig

export function OverviewPieShift() {
    const chartId = "pie-shift-lalin"

    const [data, setData] = React.useState<ShiftPieData[]>([])
    const [activeIndex, setActiveIndex] = React.useState(0)
    const [loading, setLoading] = React.useState(false)
    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>()

    const loadData = async () => {
        try {
            setLoading(true)

            const res = await fetchListLalin({
                tanggal: selectedDate
                    ? dayjs(selectedDate).format("YYYY-MM-DD")
                    : undefined,
            })

            const summary: Record<1 | 2 | 3, number> = { 1: 0, 2: 0, 3: 0 }

            if (Array.isArray(res)) {
                res.forEach((row: any) => {
                    const shift = row.Shift as 1 | 2 | 3
                    if (summary[shift] !== undefined) {
                        summary[shift] += 1
                    }
                })
            }

            const totalAll =
                summary[1] + summary[2] + summary[3]

            const toPercent = (value: number) =>
                totalAll === 0 ? 0 : Math.round((value / totalAll) * 100)

            setData([
                {
                    shift: "Shift 1",
                    total: summary[1],
                    percent: toPercent(summary[1]),
                    fill: "var(--chart-1)",
                },
                {
                    shift: "Shift 2",
                    total: summary[2],
                    percent: toPercent(summary[2]),
                    fill: "var(--chart-2)",
                },
                {
                    shift: "Shift 3",
                    total: summary[3],
                    percent: toPercent(summary[3]),
                    fill: "var(--chart-3)",
                },
            ])
        } catch (error) {
            console.error("Failed load lalin:", error)
            setData([
                {
                    shift: "Shift 1",
                    total: 0,
                    percent: 0,
                    fill: "var(--chart-1)",
                },
                {
                    shift: "Shift 2",
                    total: 0,
                    percent: 0,
                    fill: "var(--chart-2)",
                },
                {
                    shift: "Shift 3",
                    total: 0,
                    percent: 0,
                    fill: "var(--chart-3)",
                },
            ])
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        loadData()
    }, [selectedDate])

    React.useEffect(() => {
        setActiveIndex(0)
    }, [data])

    if (loading) {
        return (
            <Card>
                <CardContent className="py-10 text-center text-muted-foreground">
                    Loading chart...
                </CardContent>
            </Card>
        )
    }

    return (
        <Card data-chart={chartId} className="flex flex-col">
            <ChartStyle id={chartId} config={chartConfig} />

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <CardHeader className="pb-0">
                    <CardTitle>Distribusi Lalu Lintas per Shift</CardTitle>
                    <CardDescription>
                        Persentase kendaraan berdasarkan shift
                    </CardDescription>
                </CardHeader>

                <div className="flex items-center gap-2 px-6 lg:px-0">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className="min-w-[220px] justify-start font-normal"
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {selectedDate
                                    ? dayjs(selectedDate).format("DD MMM YYYY")
                                    : "Pilih tanggal"}
                            </Button>
                        </PopoverTrigger>

                        <PopoverContent align="start" className="p-2">
                            <Calendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={setSelectedDate}
                                disabled={{ after: new Date() }}
                            />
                        </PopoverContent>
                    </Popover>

                    <Button
                        variant="ghost"
                        onClick={() => setSelectedDate(undefined)}
                        disabled={!selectedDate}
                    >
                        Reset
                    </Button>
                </div>
            </div>

            <CardContent className="flex flex-1 justify-center pb-0">
                <ChartContainer
                    id={chartId}
                    config={chartConfig}
                    className="mx-auto aspect-square w-full max-w-[300px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    formatter={(value, name, item) => {
                                        const payload = item.payload as ShiftPieData

                                        return (
                                            <>
                                                <div className="font-medium">{payload.shift}</div>
                                                <div>{payload.percent}%</div>
                                                <div className="text-muted-foreground">
                                                    {payload.total} kendaraan
                                                </div>
                                            </>
                                        )
                                    }}
                                />
                            }
                        />
                        <Pie
                            data={data}
                            dataKey="percent"
                            nameKey="shift"
                            innerRadius={60}
                            strokeWidth={5}
                            activeIndex={activeIndex}
                            onMouseEnter={(_, index) => setActiveIndex(index)}
                            activeShape={({
                                outerRadius = 0,
                                ...props
                            }: PieSectorDataItem) => (
                                <g>
                                    <Sector
                                        {...props}
                                        outerRadius={outerRadius + 8}
                                    />
                                    <Sector
                                        {...props}
                                        outerRadius={outerRadius + 20}
                                        innerRadius={outerRadius + 10}
                                    />
                                </g>
                            )}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (!viewBox || !("cx" in viewBox)) return null

                                    const activeShift = data[activeIndex]

                                    return (
                                        <text
                                            x={viewBox.cx}
                                            y={viewBox.cy}
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                        >
                                            <tspan className="fill-foreground text-3xl font-bold">
                                                {activeShift?.percent ?? 0}%
                                            </tspan>
                                            <tspan
                                                x={viewBox.cx}
                                                y={(viewBox.cy || 0) + 24}
                                                className="fill-muted-foreground"
                                            >
                                                {activeShift?.shift}
                                            </tspan>
                                        </text>
                                    )
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>

            <div className="mt-4 mb-9 flex justify-center gap-x-6 text-sm">
                {data.map((item) => (
                    <div key={item.shift} className="flex items-center gap-2">
                        <span
                            className="h-2.5 w-2.5 rounded-sm"
                            style={{ backgroundColor: item.fill }}
                        />
                        <span className="text-muted-foreground">
                            {item.shift} ({item.percent}%)
                        </span>
                    </div>
                ))}
            </div>
        </Card>
    )
}
