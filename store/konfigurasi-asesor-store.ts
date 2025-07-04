import type { AsesorI } from "~/types/asesors.types";

export const useKonfigurasiAsesorStore = defineStore("konfigurasi-asesor", {
  state: () => ({
    editState: {
      open: false as boolean,
      data: null as AsesorI | null,
    },
  }),
  actions: {
    setEdit(newState: { open?: boolean; data?: AsesorI | null }) {
      this.editState = { ...this.editState, ...newState };
    },
  },
});
