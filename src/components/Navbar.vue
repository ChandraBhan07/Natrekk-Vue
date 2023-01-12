<script setup>
import Alert from './Alert.vue';
import { useAuthStore } from './../stores/authStore';
import { useNotificationStore } from './../stores/notificationStore';
const store = useAuthStore();
const appUrl = import.meta.env.VITE_APP_URL;
</script>

<template>
    <div>

        <Alert :alert="alert" :showAlert="showAlert" />
        <div class="flex h-20 w-full items-center justify-between rounded-t-md bg-neutral-700 px-12 select-none">
            <!-- mobile hamburger -->
            <div class="rounded p-2 text-white opacity-50 hover:bg-neutral-50/25 hover:opacity-100 sm:hidden"
                @click="toggleHamMenu">
                <svg class="block h-6 w-6 hover:text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </div>
            <!-- logo -->
            <RouterLink to="/">
                <svg class=" h-12 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080"
                    shape-rendering="geometricPrecision" text-rendering="geometricPrecision">
                    <path d="M231.522468,325.896982l1223.84714,539.734702h-952.686085L231.522468,325.896982Z"
                        fill="none" stroke="#fff" stroke-width="40" />
                    <path d="M231.522468,325.896982l1223.84714,539.734702h-952.686085L231.522468,325.896982Z"
                        transform="matrix(-1 0 0 1 1957.839264 0)" fill="none" stroke="#fff" stroke-width="40" />
                    <path d="M502.683523,865.631684L982.954219,325.896982l472.201522,539.734702" fill="none"
                        stroke="#fff" stroke-width="50" />
                </svg>
            </RouterLink>

            <!-- search -->
            <div v-if="showSearchTreks" class="hidden items-center text-white sm:flex">
                <div class="mx-1 border-b p-1">
                    <input type="text" class="mx-1 bg-neutral-700 outline-none" placeholder="Search Trek"
                        @input="$emit('search', $event)" />
                </div>
                <svg class="text-white" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#fff"
                    viewBox="0 0 16 16">
                    <path
                        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
            </div>

            <!-- login signup -->
            <div v-if="!store.userAuthenticated" class="flex items-center">
                <RouterLink to="/login">
                    <div class="px-4 py-2 text-white transition ease-in-out hover:-translate-y-0.5">
                        <button class="tracking-wide">Login</button>
                    </div>
                </RouterLink>

                <RouterLink to="/register">
                    <div
                        class="rounded-2xl border text-white transition ease-in-out hover:-translate-y-0.5 hover:bg-white hover:text-neutral-700">
                        <button class="px-6 py-2 tracking-wide">Signup</button>
                    </div>
                </RouterLink>
            </div>
            <!-- for authenticated user -->
            <div v-else="store.userAuthenticated" class="flex h-10 w-10 flex-shrink-0 overflow-hidden rounded-full">
                <img v-if="store.getUser && store.getUser.profileImg" crossorigin="anonymous"
                    :src="appUrl + 'img/users/' + store.getUser.profileImg" class="border-0 cursor-pointer"
                    @click="toggleMenu()">
                <div v-else @click="toggleMenu()"
                    class="bg-neutral-200 w-full h-full flex justify-center items-center shadow-xl cursor-pointer">
                    <div
                        class="theme-gradient-dark text-white justify-center items-center flex h-8 w-8 rounded-full hover:green-500 active:scale-95 active:opacity-80">
                        {{ store.getUser.name.charAt(0).toUpperCase() }}
                    </div>
                </div>
            </div>
        </div>

        <div v-if="hamMenuOpen" class="mr-1 text-sm text-neutral-800 sm:hidden">
            <div
                class="z-20 w-56 rounded-lg bg-white py-2 shadow-xl absolute -mt-3 ml-14 flex items-center justify-center">
                <div class="mx-1  p-1 w-44">
                    <input type="text" class=" mx-1 outline-none" placeholder="Search Trek"
                        @input="$emit('search', $event)" />
                </div>
                <svg class="text-white" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#000"
                    viewBox="0 0 16 16">
                    <path
                        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
            </div>
        </div>

        <div v-if="isMenuOpen" class="mr-12 flex flex-row-reverse text-sm text-neutral-800 select-none">
            <div class="z-20 w-44 rounded-lg bg-white py-2 shadow-xl absolute -mt-3">
                <RouterLink to="/profile">
                    <a class="block cursor-pointer rounded-t-lg px-4 py-2 hover:bg-neutral-200/75">Your Profile</a>
                </RouterLink>
                <a class="block cursor-pointer px-4 py-2 hover:bg-neutral-200/75">My Bookings</a>
                <a class="block cursor-pointer rounded-b-lg px-4 py-2 hover:bg-neutral-200/75"
                    @click="logout">Logout</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        showSearchTreks: {
            default: true,
            type: Boolean
        }
    },
    data() {
        return {
            isMenuOpen: false,
            hamMenuOpen: false,
            showAlert: false,
            alert: {
                status: '',
                message: ''
            }
        }
    },
    methods: {
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen;
        },
        toggleHamMenu() {
            this.hamMenuOpen = !this.hamMenuOpen;
        },
        logout() {
            const store = useAuthStore();
            store.logout()
                .then((result) => {
                    if (result) {
                        const notificationStore = useNotificationStore();
                        const notificationObj = {
                            target: 'Login',
                            status: 'success',
                            message: 'Logged out successfully!'
                        }
                        notificationStore.setNotifications(notificationObj);
                        this.$router.push({ name: "Login" });
                    }
                })
        }
    }

}
</script>