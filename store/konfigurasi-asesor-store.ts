import type { AsesorI } from "~/types/asesors.types";

export const useKonfigurasiAsesorStore = defineStore("konfigurasi-asesor", {
  state: () => ({
    editState: {
      open: false as boolean,
      data: null as AsesorI | null,
    },
    deleteState: {
      open: false as boolean,
      data: null as AsesorI | null,
    },
  }),
  actions: {
    setEditState(newState: { open?: boolean; data?: AsesorI | null }) {
      this.editState = { ...this.editState, ...newState };
    },
    setDeleteState(newState: { open?: boolean; data?: AsesorI | null }) {
      this.deleteState = { ...this.deleteState, ...newState };
    },
  },
});
