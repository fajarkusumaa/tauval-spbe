import type { UserI } from "./user.types";
// {api_base}asesors
export interface AsesorI {
  id: number;
  user_id: number;
  satker_id: number;
  user: UserI & {
    satker_id: null;
    satker: AssesorSatkerI;
  };
  nama: string;
  jabatan: string;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt: null;
}

export interface AssesorSatkerI {
  ID: number;
  Nama: string;
  PICWA: string;
  PICEmail: string;
  CreatedAt: Date;
  UpdatedAt: Date;
}
