import type { AsesorI } from "./asesors.types";
import type { InstrumenI } from "./instrumen.types";
import type { SatkerI } from "./satker.types";
import type { UserI } from "./user.types";

export type BaseResponse<T> = {
  success: string;
  message: string;
  data: T;
};

export type LoginSuccessResponseT = BaseResponse<{
  token: string;
  user: UserI;
}>;

export type LoginErrorResponseT = {
  status: string;
  error: {
    code: string;
    message: string[];
  };
};

export type GetAsesorsResponseT = BaseResponse<AsesorI[]>;
export type GetAsesorsByIDResponseT = BaseResponse<AsesorI>;

export type GetInstrumenResponseT = BaseResponse<InstrumenI[]>;

export type GetSatkerRefResponseT = BaseResponse<SatkerI[]>;

// GET {api_base}/users
export type GetUsersResponseT = BaseResponse<UserI[]>;
