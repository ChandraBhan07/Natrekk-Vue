<script setup>
import Preloader from './Preloader.vue';
import Alert from './Alert.vue';
import { useNotificationStore } from '../stores/notificationStore';
const appUrl = import.meta.env.VITE_APP_URL;
</script>

<template>
    <div>
        <div class="py-52 relative" v-if="!docLoaded">
            <Preloader />
        </div>
        <Alert :alert="alert" :showAlert="showAlert" />
        <div v-if="treks.length && docLoaded" class="grid grid-cols-1 justify-items-center gap-y-5 bg-neutral-100 p-6 py-20
         md:px-12 sm:grid-cols-2 sm:gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-8 select-none">
            <div v-for="trek in filterTreks">
                <div
                    class="flex max-w-sm flex-col items-center rounded-md justify-center bg-white shadow-xl sm:w-full md:treks-mw">
                    <div class="relative flex h-56 w-full justify-end overflow-hidden rounded-t-md">
                        <div class="treks-clip-path z-10 flex-1">
                            <img crossorigin="anonymous" class="h-full w-full"
                                :src="`${appUrl}img/treks/${trek.imageCover}`">
                        </div>
                        <div class="treks-clip-path treks-img-overlay absolute z-10 h-full w-full opacity-60"></div>

                        <div class="absolute z-10 ml-20 max-w-xs self-end text-right">
                            <span
                                class="treks-text-grad box-decoration-clone py-1 px-4 text-4xl leading-tight text-white">
                                {{ trek.name }} Trek </span>
                        </div>
                    </div>

                    <!-- information -->
                    <div class="mb-2 px-10 py-4 sm:px-6 md:px-10">
                        <p class="font-semibold">
                            {{ trek.difficulty.toUpperCase() }} {{ trek.duration }} DAY TREK
                        </p>
                        <p class="mt-2 mb-6 font-thin italic">
                            {{ trek.summary }}
                        </p>
                        <div class="grid grid-cols-2 gap-2 text-sm">
                            <div class="italic">
                                {{ trek.startLocation.description }}
                            </div>
                            <div class="text-right">
                                {{ formatStartDate(trek.startDates[0]) }}
                            </div>
                            <div>{{ trek.locations.length }} stops</div>
                            <div class="text-right">{{ trek.maxGroupSize }} People</div>
                        </div>
                    </div>

                    <!-- details -->
                    <div class="w-full rounded-b-md bg-gray-200 px-10 py-5 sm:px-6 md:px-10">
                        <div
                            class="flex items-center justify-between text-center max-[400px]:grid max-[400px]:grid-cols-1 max-[400px]:gap-y-2 sm:text-sm">
                            <div>
                                <p class="py-1"><strong>${{ trek.price }}</strong> / person</p>
                                <p class="py-1">
                                    <strong>{{ trek.ratingsAverage }}</strong> rating ({{ trek.ratingsQuantity }})
                                </p>
                            </div>
                            <div class="mt-1">
                                <router-link :to="'/trek/' + trek.slug">
                                    <button class="rounded-xl theme-gradient p-2 px-6 text-white hover:-translate-y-0.5 hover:bg-green-600 
                                hover:shadow-lg active:opacity-75 sm:p-2 sm:px-7 sm:py-3">Details</button>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useTrekStore } from '../stores/trekStore';
import AlertVue from './Alert.vue';

export default {
    data() {
        return {
            treks: [],
            docLoaded: false,
            showAlert: false,
            alert: {
                status: '',
                message: ''
            }
        }
    },
    props: {
        search: {
            type: String
        }
    },
    async mounted() {
        const store = useTrekStore()
        if (!store.treks.length) {
            await this.fetchTreksData();
        }
        else this.treks = store.treks;
        if (this.treks) this.docLoaded = true;

        const notificationStore = useNotificationStore();
        if (notificationStore.getNotifications.length) {
            let notificationArr = [...notificationStore.getNotifications];
            notificationArr.forEach((element, i) => {
                if (element && (element.target = "Home")) {
                    this.alert.status = element.status;
                    this.alert.message = element.message;
                    this.showAlert = true;
                    delete notificationArr[i]
                }
            });
            notificationStore.setNotifications(notificationArr);
        }

    },
    methods: {
        async fetchTreksData() {
            const store = useTrekStore()
            await store.fetchTreks();
            this.treks = store.getTreks;
        },
        sendProp(id) {
            return id;
        },
        formatStartDate(date) {
            return new Date(date).toLocaleString('default', {
                month: 'short',
                year: 'numeric'
            })
        }
    },
    computed: {
        filterTreks() {
            return this.treks.filter(trek => trek.name.toLowerCase().includes(this.search.toLowerCase()))
        }
    }
}

</script>