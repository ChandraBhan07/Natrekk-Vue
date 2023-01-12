import { defineStore } from 'pinia';
import axios from 'axios';
export const useTrekStore = defineStore('trek', {
    state: () => ({
        treks: []
    }),

    getters: {
        getTreks: (state) => state.treks
    },
    actions: {
        async fetchTreks() {
            try {
                const res = await axios('treks');
                this.treks = res.data.data;
            }
            catch (err) {
                console.log('Trek store, fetch treks', err);
            }
        },

        getIdFromSlug(slug) {
            return this.treks.filter(trek => trek.slug === slug);
        },

        async fetchTrek(id) {
            try {
                const res = await axios('treks/' + id);
                return res.data.data;
            }
            catch (err) {
                console.log('Trek store, fetch trek', err);
            }
        }
    }
});