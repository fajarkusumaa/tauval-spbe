import type { User } from "./user.types";

export type BaseResponse<T> = {
  success: string;
  message: string;
  data: T;
};

export type LoginSuccessResponseT = BaseResponse<{
  token: string;
  user: User;
}>;

export type LoginErrorResponseT = {
  status: string;
  error: {
    code: string;
    message: string[];
  };
};
