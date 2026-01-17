"use client"

import * as React from "react"
import dayjs from "dayjs"
import { Pie, PieChart, Sector, Label } from "recharts"
import { type PieSectorDataItem } from "recharts/types/polar/Pie"

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
import { LalinRow } from "@libs/types/LalinTypes"


type PieData = {
  name: string
  total: number
  percent: number
  fill: string
}


const chartConfig = {
  total: { label: "Total Kendaraan" },
} satisfies ChartConfig


export function OverviewPieGerbang() {
  const chartId = "pie-ruas-lalin"

  const [rawLalin, setRawLalin] = React.useState<LalinRow[]>([])
  const [data, setData] = React.useState<PieData[]>([])
  const [activeIndex, setActiveIndex] = React.useState(0)
  const [loading, setLoading] = React.useState(false)

  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>()


  const loadLalin = async () => {
    try {
      setLoading(true)

      const res = await fetchListLalin({
        tanggal: selectedDate
          ? dayjs(selectedDate).format("YYYY-MM-DD")
          : undefined,
      })

      const rows: LalinRow[] = res ?? []
      setRawLalin(rows)
    } catch (e) {
      console.error("Failed load lalin:", e)
      setRawLalin([])
    } finally {
      setLoading(false)
    }
  }


  React.useEffect(() => {
    loadLalin()
  }, [selectedDate])

  React.useEffect(() => {
    buildChartData()
    setActiveIndex(0)
  }, [rawLalin])


  const buildChartData = () => {
    const map = new Map<number, number>()

    rawLalin.forEach((r) => {
      const total =
        r.Tunai +
        r.DinasOpr +
        r.DinasMitra +
        r.DinasKary +
        r.eMandiri +
        r.eBri +
        r.eBni +
        r.eBca +
        r.eNobu +
        r.eDKI +
        r.eMega +
        r.eFlo

      map.set(r.IdCabang, (map.get(r.IdCabang) ?? 0) + total)
    })

    const totalAll = Array.from(map.values()).reduce((a, b) => a + b, 0)

    const colors = [
      "var(--chart-1)",
      "var(--chart-2)",
      "var(--chart-3)",
      "var(--chart-4)",
      "var(--chart-5)",
    ]

    const pieData: PieData[] = Array.from(map.entries()).map(
      ([cabang, total], i) => ({
        name: `Ruas ${cabang}`,
        total,
        percent: totalAll === 0 ? 0 : Math.round((total / totalAll) * 100),
        fill: colors[i % colors.length],
      })
    )

    setData(pieData)
  }


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
<div className="flex justify-between items-center">

      <CardHeader className="pb-2">
        <CardTitle>Distribusi Lalu Lintas per Ruas</CardTitle>
        <CardDescription>
          Jumlah kendaraan per hari berdasarkan ruas (cabang)
        </CardDescription>
      </CardHeader>

      <div className="flex gap-2 px-6">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate
                ? dayjs(selectedDate).format("DD MMM YYYY")
                : "Pilih tanggal"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-2">
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
          className="mx-auto aspect-square w-full max-w-[340px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  formatter={(_, __, item) => {
                    const p = item.payload as PieData
                    return (
                      <>
                        <div className="font-medium">{p.name}</div>
                        <div>{p.percent}%</div>
                        <div className="text-muted-foreground">
                          {p.total.toLocaleString()} kendaraan
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
              nameKey="name"
              innerRadius={70}   
              strokeWidth={5}
              activeIndex={activeIndex}
              onMouseEnter={(_, i) => setActiveIndex(i)}
              activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 8} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 18}
                    innerRadius={outerRadius + 8}
                  />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (!viewBox || !("cx" in viewBox)) return null
                  const active = data[activeIndex]
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan className="fill-foreground text-xl font-bold">
                        {active?.percent ?? 0}%
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 22}
                        className="fill-muted-foreground"
                      >
                        {active?.name}
                      </tspan>
                    </text>
                  )
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
