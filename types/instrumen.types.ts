// {api_base}instrumen/indikator
export interface InstrumenI {
  id: number;
  nama: string;
  aspeks: AspekI[];
}

export interface AspekI {
  id: number;
  aspek: string;
  indikators: IndikatorI[];
}

export interface IndikatorI {
  id: number;
  indikator: string;
  index_before: number;
  index_target: number;
  assesor: {
    id: number;
    name: string;
  } | null;
  satker: {
    id: number;
    name: string;
  } | null;
}
