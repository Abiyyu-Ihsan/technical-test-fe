"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"
import { CalendarIcon} from "lucide-react"
import dayjs from "dayjs";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@shadcn/components/ui/chart"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@shadcn/components/ui/card"

import { LalinRow } from "@libs/types/LalinTypes"
import { fetchListLalin } from "@libs/service/LalinService"
import { Popover, PopoverContent, PopoverTrigger } from "@shadcn/components/ui/popover"
import { Button } from "@shadcn/components/ui/button"
import { Calendar } from "@shadcn/components/ui/calendar"
import { DateRange } from "react-day-picker";
import { GerbangRow } from "@libs/types/GerbangType";
import { fetchListGerbang } from "@libs/service/GerbangService";
import { buildChartDataFromGerbang } from "@libs/helper/TotalGerbang";

const chartConfig = {
    total: {
        label: "Jumlah Lalin",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig

export function OverviewBarGerbang() {
    const [rawRows, setRawRows] = React.useState<LalinRow[]>([])
    const [isDesktop, setIsDesktop] = React.useState(false)
    const [dateRange, setDateRange] = React.useState<DateRange | undefined>()

    const [gerbangs, setGerbangs] = React.useState<GerbangRow[]>([])
    const [lalinRows, setLalinRows] = React.useState<LalinRow[]>([])
    const [chartData, setChartData] = React.useState<any[]>([])


    React.useEffect(() => {
        const media = window.matchMedia("(min-width: 768px)")
        setIsDesktop(media.matches)

        const listener = () => setIsDesktop(media.matches)
        media.addEventListener("change", listener)

        return () => media.removeEventListener("change", listener)
    }, [])

    React.useEffect(() => {
        const fetchData = async () => {
            const [gerbangRes, lalinRes] = await Promise.all([
                fetchListGerbang({}),
                fetchListLalin(),
            ])

            const gerbangRows = gerbangRes?.data?.rows?.rows ?? []

            setGerbangs(gerbangRows)
            setLalinRows(lalinRes)
        }

        fetchData()
    }, [])


    React.useEffect(() => {
        if (!gerbangs.length || !lalinRows.length) return

        setChartData(
            buildChartDataFromGerbang(gerbangs, lalinRows, dateRange)
        )
    }, [gerbangs, lalinRows, dateRange])

    const handleResetDate = () => {
        setDateRange(undefined)
    }



    return (
        <Card>
            <CardHeader>
                <div className="lg:flex lg:justify-between items-center gap-2">
                    <div>
                        <CardTitle>Jumlah Gerbang</CardTitle>
                        <CardDescription className="mt-2">
                            Akumulasi seluruh Gerbang
                        </CardDescription>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-row gap-2 items-center">
                        <div className="relative">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="min-w-[220px] justify-start font-normal"
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        <span className="truncate">
                                            {dateRange?.from ? (
                                                dateRange.to ? (
                                                    <>
                                                        {dayjs(dateRange.from).format("DD MMM YYYY")} -{" "}
                                                        {dayjs(dateRange.to).format("DD MMM YYYY")}
                                                    </>
                                                ) : (
                                                    dayjs(dateRange.from).format("DD MMM YYYY")
                                                )
                                            ) : (
                                                "Pilih tanggal"
                                            )}
                                        </span>
                                    </Button>
                                </PopoverTrigger>

                                <PopoverContent
                                    align="start"
                                    side="bottom"
                                    sideOffset={8}
                                    className="
        w-[86vw]
        max-w-[86vw]
        md:w-auto
        md:max-w-none
        max-h-[70vh]
        overflow-y-auto
        p-0
        overscroll-contain
        touch-pan-y
      "
                                >
                                    <div className="w-[86vw] max-w-[86vw] md:w-auto md:max-w-none p-2">
                                        <Calendar
                                            mode="range"
                                            selected={dateRange}
                                            onSelect={setDateRange}
                                            numberOfMonths={2}
                                            toMonth={new Date()}
                                            disabled={{ after: new Date() }}
                                            showOutsideDays={false}
                                            className="rounded-lg w-full md:w-auto"
                                        />
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>

                        <Button
                            variant="ghost"
                            className="shrink-0"
                            onClick={handleResetDate}
                            disabled={!dateRange?.from}
                        >
                            Reset
                        </Button>
                    </div>

                </div>
            </CardHeader>

            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart data={chartData} margin={{ top: 20 }}>
                        <CartesianGrid vertical={false} />

                        <XAxis
                            dataKey="gerbang"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />


                        <ChartTooltip content={<ChartTooltipContent />} />

                        <Bar dataKey="total" fill="var(--color-total)" radius={8}>
                            <LabelList position="top" fontSize={12} />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>


        </Card>
    )
}
