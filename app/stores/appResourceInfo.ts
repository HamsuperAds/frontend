import { defineStore } from "pinia";
import type { State, LGA, Category } from "~/types";

export const useAppResourceInfoStore = defineStore("appResourceInfoStore", {
  state: () => ({
    userName: "Donzoby",
    states: [] as State[],
    lga: null as LGA | null,
    categories: [] as Category[],
  }),
  getters: {},
  actions: {
    setLocation(states: State[], lga?: LGA) {
        this.states = states;
        this.lga = lga || null;
    },
    setCategories(categories: Category[]) {
        this.categories = categories;
    }
  },
});
