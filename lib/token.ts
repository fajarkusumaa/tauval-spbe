import type { User } from "~/types/user.types";

export const useToken = () =>
  useCookie<string | null>("token", {
    default: () => null,
    watch: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

export const useUser = () =>
  useCookie<User | null>("user", {
    default: () => null,
    watch: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
