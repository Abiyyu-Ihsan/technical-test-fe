import { LalinApiResponse, LalinRow } from "@libs/types/LalinTypes"
import { axiosAuth } from "@libs/utils/axios"

type FetchLalinParams = {
  tanggal?: string
}

export async function fetchListLalin(
  params?: FetchLalinParams
): Promise<LalinRow[]> {
  const res = await axiosAuth.get<LalinApiResponse>("lalins", {
    params: {
      tanggal: params?.tanggal,
    },
  })

  return res.data.data.rows.rows
}
export type LalinListResponse = {
  rows: LalinRow[]
  total: number
  totalPages: number
  currentPage: number
}

export async function fetchListLalins(
  params?: FetchLalinParams
): Promise<LalinListResponse> {
  const res = await axiosAuth.get("lalins", { params })

  const data = res.data.data

  return {
    rows: data.rows.rows,
    total: data.rows.count,
    totalPages: data.total_pages,
    currentPage: data.current_page,
  }
}

