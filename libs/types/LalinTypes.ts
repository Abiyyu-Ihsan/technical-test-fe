export interface LalinRow {
  id: number
  IdCabang: number
  IdGerbang: number
  Tanggal: string
  IdGardu: number
  Golongan: number
  IdAsalGerbang: number
  Tunai: number
  DinasOpr: number
  DinasMitra: number
  DinasKary: number
  eMandiri: number
  eBri: number
  eBni: number
  jumlah: number,
  eBca: number
  eNobu: number
  eDKI: number
  eMega: number
  eFlo: number
    Shift: 1 | 2 | 3,
  rows: number,
}

export type LalinRows = {
    id: number;
    IdCabang: number;
    IdGerbang: number;
    Tanggal: string;
    Shift: number;
    IdGardu: number;
    Golongan: number;
    IdAsalGerbang: number;
    Tunai: number;
    DinasOpr: number;
    DinasMitra: number;
    DinasKary: number;
    eMandiri: number;
    eBri: number;
    eBni: number;
    eBca: number;
    eNobu: number;
    eDKI: number;
    eMega: number;
    eFlo: number;
};




export type AggregatedRow = {
    no: number;
    ruas: string;
    gerbang: string;
    gardu: string;
    hari: string;
    tanggal: string;
    kategoriPembayaran: string;
    metodePembayaran: string;
    gol1: number;
    gol2: number;
    gol3: number;
    gol4: number;
    gol5: number;
    totalLalin: number;
};

export interface LalinApiResponse {
  status: boolean
  message: string
  code: number
  data: {
    total_pages: number
    current_page: number
    count: number
    rows: {
      count: number
      rows: LalinRow[]
    }
  }
}
