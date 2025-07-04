import type { UserI } from "~/types/user.types";

export const useToken = () =>
  useCookie<string | null>("token", {
    default: () => null,
    watch: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 1,
  });

export const useUser = () =>
  useCookie<UserI | null>("user", {
    default: () => null,
    watch: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 1,
  });
