import { defineStore } from "pinia";
import type { State, LGA, Category } from "~/types";

export const useAppResourceInfoStore = defineStore("appResourceInfoStore", {
  state: () => ({
    userName: "Donzoby",
    states: [] as State[],
    state: null as State | null,
    lga: null as LGA | null,
    categories: [] as Category[],
  }),
  getters: {},
  actions: {
    setLocation(state: State, lga?: LGA) {
        this.state = state;
        this.lga = lga || null;
    },
    setStates(states: State[]) {
        this.states = states;
    },
    setCategories(categories: Category[]) {
        this.categories = categories;
    }
  },
});
