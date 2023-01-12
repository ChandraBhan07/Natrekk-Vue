import axios from 'axios';
import { defineStore } from 'pinia';
export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: {},
        token: ''
    }),

    getters: {
        getUser: (state) => state.user,
        getToken: (state) => state.token,
        userAuthenticated: (state) => (state.user ? Object.keys(state.user).length > 0 : 'false'),
    },

    actions: {
        setStorageObj(token, user) {
            this.token = token;
            this.user = user;

            localStorage.setItem('natrekk', JSON.stringify({
                token,
                user
            }));
        },

        getStorageObj() {
            return localStorage.natrekk
                ? JSON.parse(localStorage.natrekk)
                : false;
        },

        async fetchUser(token) {
            try {
                const res = await axios.get(`/users/me`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!res.data.data) return;
                return res.data.data;
            }
            catch (err) {
                console.log('Auth store, authenticateUser', err);
            }
        },

        // I planned this (freshSetup) in case we change some userdetails directly in backend 
        authenticateUser(freshUser = false) {
            const natrekk = this.getStorageObj();

            // if nataours then login
            if (natrekk) {
                if (freshUser) {
                    async () => {
                        const user = await this.fetchUser(natrekk.token);
                        console.log('fresh user');
                        this.setStorageObj(natrekk.token, user);
                    }
                }
                this.setStorageObj(natrekk.token, natrekk.user);
            }
            else {
                this.user = {};
                this.token = '';
            }
        },

        async login(userObj) {
            const res = await axios.post(`/users/login`, userObj);
            const user = await this.fetchUser(res.data.token)
            this.setStorageObj(res.data.token, user);
            return true;
        },

        async register(userObj) {
            const res = await axios.post(`/users/signup`, userObj);
            this.setStorageObj(res.data.token, res.data.data.user);
            return true;
        },

        async profile(userObj) {
            const res = await axios.patch(`/users/updateMe`, userObj);
            this.setStorageObj(this.getStorageObj().token, res.data.data.user);
            return true;
        },

        async password(userObj) {
            const res = await axios.patch(`/users/updateMyPassword`, userObj);
            return true;
        },

        async logout() {
            this.token = null;
            this.user = {};
            localStorage.removeItem('natrekk');
            return true;
        }

    }
});
