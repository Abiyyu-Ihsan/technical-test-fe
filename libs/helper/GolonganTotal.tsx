import { LalinRow } from "@libs/types/LalinTypes"

const renderGolonganCell = (row: LalinRow, golongan: number) => {
    return row.Golongan === golongan ? row.jumlah : 0
}