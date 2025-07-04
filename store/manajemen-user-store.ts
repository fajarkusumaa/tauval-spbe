import type { AsesorI } from "~/types/asesors.types";
import type { UserI } from "~/types/user.types";

export const useManajemenUserStore = defineStore("manajemen-user", {
  state: () => ({
    createState: {
      open: false as boolean,
      data: null as UserI | null,
    },
    editState: {
      open: false as boolean,
      data: null as UserI | null,
    },
  }),
  actions: {
    setCreateState(newState: { open?: boolean; data?: UserI | null }) {
      this.createState = { ...this.createState, ...newState };
    },
    setEditState(newState: { open?: boolean; data?: UserI | null }) {
      this.editState = { ...this.editState, ...newState };
    },
  },
});
