import dayjs from "dayjs"
import { DateRange } from "react-day-picker"
import { GerbangRow } from "@libs/types/GerbangType"
import { LalinRow } from "@libs/types/LalinTypes"
import isSameOrAfter from "dayjs/plugin/isSameOrAfter"
import isSameOrBefore from "dayjs/plugin/isSameOrBefore"

dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

export const buildChartDataFromGerbang = (
  gerbangs: GerbangRow[],
  lalinRows: LalinRow[],
  dateRange?: DateRange
) => {
  const safe = (v?: number) => Number(v ?? 0)

  return gerbangs.map((g) => {
    const lalinGerbang = lalinRows.filter((l) => {
      if (l.IdGerbang !== g.id) return false

      if (!dateRange?.from) return true

      const tgl = dayjs(l.Tanggal)
      const from = dayjs(dateRange.from)
      const to = dateRange.to ? dayjs(dateRange.to) : from

      return (
        tgl.isSameOrAfter(from, "day") &&
        tgl.isSameOrBefore(to, "day")
      )
    })

    return {
      gerbang: g.NamaGerbang,
      total: lalinGerbang.reduce(
        (sum, r) =>
          sum +
          safe(r.Tunai) +
          safe(r.DinasOpr) +
          safe(r.DinasMitra) +
          safe(r.DinasKary) +
          safe(r.eMandiri) +
          safe(r.eBri) +
          safe(r.eBni) +
          safe(r.eBca) +
          safe(r.eNobu) +
          safe(r.eDKI) +
          safe(r.eMega) +
          safe(r.eFlo),
        0
      ),
    }
  })
}
