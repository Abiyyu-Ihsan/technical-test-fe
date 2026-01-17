export type GerbangRow = {
  id: number;
  IdCabang: number;
  NamaGerbang: string;
  NamaCabang: string;
};

export type ApiResponseLisGerbang = {
  total_page: number;
  current_page: number;
  count: number;
  rows: {
    count: number;
    rows: GerbangRow[];
  };
};

export interface GerbangParams {
  id?: number;
  IdCabang?: number;
  NamaCabang?: string;
  NamaGerbang?: string;
}

export interface ApiResponseDeleteGerbang {
  id?: number | undefined;
  IdCabang?: number | undefined;
}

export type ApiResponseCreateGerbang = {
    id: number | undefined,
    IdCabang: number | undefined,
    NamaGerbang: string,
    NamaCabang: string
};

export type ApiResponseUpdateGerbang = {
    id: number | undefined,
    IdCabang: number | undefined,
    NamaGerbang: string,
    NamaCabang: string
};