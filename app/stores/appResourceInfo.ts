import { defineStore } from "pinia";
import type { State, LGA } from "~/types";

export const useAppResourceInfoStore = defineStore("appResourceInfoStore", {
  state: () => ({
    userName: "Donzoby",
    state: null as State | null,
    lga: null as LGA | null,
  }),
  getters: {},
  actions: {
    setLocation(state: State, lga?: LGA) {
        this.state = state;
        this.lga = lga || null;
    }
  },
});
