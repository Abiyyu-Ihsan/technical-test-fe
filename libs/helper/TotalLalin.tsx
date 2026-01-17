import { LalinRow } from "@libs/types/LalinTypes"

export function mapLalinToChart(rows: LalinRow[]) {
  const total = {
    eBca: 0,
    eBni: 0,
    eBri: 0,
    eDKI: 0,
    eMandiri: 0,
    eFlo: 0,
  }

  rows.forEach((row) => {
    total.eBca += row.eBca
    total.eBni += row.eBni
    total.eBri += row.eBri
    total.eDKI += row.eDKI
    total.eMandiri += row.eMandiri
    total.eFlo += row.eFlo
  })

  return [
    { method: "e-BCA", total: total.eBca },
    { method: "e-BNI", total: total.eBni },
    { method: "e-BRI", total: total.eBri },
    { method: "e-DKI", total: total.eDKI },
    { method: "e-Mandiri", total: total.eMandiri },
    { method: "e-Flo", total: total.eFlo },
  ]
}
