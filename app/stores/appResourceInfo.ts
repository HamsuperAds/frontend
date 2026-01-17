import { defineStore } from "pinia";
import type { State, LGA, Category } from "~/types";
import type { PromotionPlan } from "~/types/promotionPlan";

export const useAppResourceInfoStore = defineStore("appResourceInfoStore", {
  state: () => ({
    userName: "Donzoby",
    states: [] as State[],
    state: null as State | null,
    lga: null as LGA | null,
    categories: [] as Category[],
    promotionPlans: [] as PromotionPlan[],
    toastMessage: null as string | null,
    loading: reactive<Record<string, boolean>>({}),
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
    },
    async fetchPromotionPlans() {
      this.loading.promotionPlans = true;
      try {
        const { data } = await useApi().fetchGet<{
            success: boolean;
            data: PromotionPlan[];
        }>('/promotion-plans', {
            requiresAuth: false
        })
        if (data) {
            this.promotionPlans = data
            return data;
        }
    } catch (err) {
        console.error('Error fetching promotion plans:', err)
        this.toastMessage = 'Error fetching promotion plans';
    }finally{
      this.loading.promotionPlans = false;
    }
    },
  },
});
