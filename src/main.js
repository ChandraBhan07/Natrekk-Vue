import { createApp, markRaw } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import axios from 'axios';
import { useAuthStore } from './stores/authStore';

const app = createApp(App)

const pinia = createPinia();
pinia.use(({ store }) => {
    store.router = markRaw(router)
})

app.use(pinia);
app.use(router);

const store = useAuthStore();
store.authenticateUser();

axios.defaults.baseURL = import.meta.env.VITE_APP_URL + 'api/v1/';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Authorization'] = `Bearer ${store.getStorageObj() ? store.getStorageObj().token : ''}`;
app.config.globalProperties.$axios = axios;

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {

        if (!store.userAuthenticated && to.name !== 'Login') {
            sessionStorage.setItem('redirectPath', to.path)
            next({ name: 'Login' })
        }
        else next();
    }
    if (to.meta.requiresGuest) {
        if (store.userAuthenticated) next({ name: 'Home' });
        else next();
    }

    else next();
});

app.mount('#app')



