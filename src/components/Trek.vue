<script setup>
import { useAuthStore } from '../stores/authStore';
import { useTrekStore } from '../stores/trekStore';
import SubmitButton from './SubmitButton.vue';
import TrekMap from './TrekMap.vue';
import Preloader from './Preloader.vue';
const appUrl = import.meta.env.VITE_APP_URL;

</script>

<template>
    <div>
        <div class="py-52 relative" v-if="!docLoaded">
            <Preloader />
        </div>
        <div class="select-none" v-if="trek && docLoaded">
            <div class="relative">
                <div class="treks-img-overlay absolute z-10 h-full w-full opacity-60"></div>
                <div class="flex justify-center">
                    <div class="z-50 w-60 sm:w-96 text-center absolute trek-name-top leading-[4rem]">
                        <span v-if="trek.name"
                            class="theme-gradient box-decoration-clone px-10 sm:px-12 text-5xl sm:text-7xl text-white leading-10">
                            {{ trek.name.toUpperCase() }} TREK</span>
                    </div>
                </div>

                <img :src="`${appUrl}img/treks/${trek.imageCover}`" class="w-full h-full opacity-50"
                    crossorigin="anonymous" style="max-height: 768px; min-height: 320px;">

            </div>
            <!-- Trek Name -->


            <!-- Trek Description -->
            <div class="flex justify-center gap-y-6 bg-neutral-50 max-md:flex-col">
                <div
                    class="grid basis-1/2 justify-items-center bg-neutral-100 pt-14 pb-8 text-neutral-600/75 max-md:gap-y-12 lg:gap-y-10">
                    <div class="space-y-5">
                        <p class="theme-gradient-dark mb-8 bg-clip-text text-2xl font-semibold text-transparent">Quick
                            Facts
                        </p>
                        <div class="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="16" fill="#55c57a"
                                viewBox="0 0 16 16">
                                <path
                                    d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-3.5-7h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z">
                                </path>
                            </svg>

                            <p class="ml-3 mr-5 font-semibold">NEXT DATE</p>
                            <span v-if="trek.startDates.length">
                                {{ getFormatedDate(trek.startDates[0]) }}
                            </span>
                        </div>

                        <div class="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="25" viewBox="0 0 32 32">
                                <path
                                    d="M20,8v2h6.5859L18,18.5859,13.707,14.293a.9994.9994,0,0,0-1.414,0L2,24.5859,3.4141,26,13,16.4141l4.293,4.2929a.9994.9994,0,0,0,1.414,0L28,11.4141V18h2V8Z"
                                    stroke-width="2" stroke="#55c57a"></path>
                            </svg>
                            <strong class="ml-3 mr-5 font-semibold">DIFFICULTY</strong>
                            <span v-if="trek.difficulty">
                                {{ capsFirstChar(trek.difficulty) }}
                            </span>
                        </div>

                        <div class="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="22" fill="#55c57a"
                                viewBox="0 0 16 16">
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z">
                                </path>
                            </svg>
                            <strong class="ml-3 mr-5 font-semibold">PARTICIPANTS</strong>
                            {{ trek.maxGroupSize }} People
                        </div>
                        <div class="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" fill="#55c57a"
                                viewBox="0 0 16 16">
                                <path
                                    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z">
                                </path>
                            </svg>
                            <strong class="ml-3 mr-5 font-semibold">RATING</strong>
                            {{ trek.ratingsAverage }} /5
                        </div>
                    </div>
                    <div class="space-y-5">
                        <p v-if="trek.guides"
                            class="theme-gradient-dark mb-6 bg-clip-text text-2xl font-semibold text-transparent">
                            Your Trek
                            Guides</p>

                        <div class="flex items-center" v-for="guide in trek.guides">
                            <div class="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full">

                                <img crossorigin="anonymous" class="w-full h-full" v-if="guide.profileImg"
                                    :src="`${appUrl}img/users/${guide.profileImg}`">
                                <div v-else
                                    class="text-xs theme-gradient-dark text-white justify-center items-center flex h-8 w-8 rounded-full">
                                    {{ guide.name.charAt(0).toUpperCase() }}
                                </div>
                            </div>
                            <strong class="ml-3 mr-5 font-semibold">{{ formatGuidesRole(guide.role) }}</strong>
                            {{ guide.name }}
                        </div>

                    </div>
                </div>

                <div class="flex basis-1/2 justify-center p-14 text-neutral-600">
                    <div class="max-w-lg space-y-6">
                        <p class="theme-gradient-dark bg-clip-text text-center text-2xl font-semibold text-transparent">
                            ABOUT THE TREK</p>
                        <p class="text-lg font-thin max-sm:tracking-tighter" v-if="trek.description">
                            {{ splitTrekDescription(trek.description)[0] }}.
                        </p>
                        <p class="text-lg font-thin max-sm:tracking-tighter" v-if="trek.description">
                            {{ splitTrekDescription(trek.description)[1] }}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Trek Content -->
            <div class="-my-14 bg-neutral-50 px-6 min-[480px]:px-16 min-[580px]:px-20 sm:p-0">
                <!-- images section -->
                <div class="sm:trek-img-clip-path z-10 mt-14 flex flex-col sm:flex-row">
                    <img crossorigin="anonymous" v-if="trek.images"
                        class="max-sm:trek-img-clip-path h-80 max-sm:-mb-12 sm:w-1/3"
                        :src="`${appUrl}/img/treks/${trek.images[0]}`">
                    <img crossorigin="anonymous" v-if="trek.images" class="max-sm:trek-img-clip-path h-80 sm:w-1/3"
                        :src="`${appUrl}/img/treks/${trek.images[1]}`">
                    <img crossorigin="anonymous" v-if="trek.images"
                        class="max-sm:trek-img-clip-path h-80 max-sm:-mt-12 sm:w-1/3"
                        :src="`${appUrl}/img/treks/${trek.images[2]}`">
                </div>

                <!-- map section -->
                <div class="trek-map-clip-path z-10 -mt-12 h-128 w-full sm:-mt-14">
                    <TrekMap v-if="trek.locations" :locations="trek.locations" />
                </div>

                <!-- reviews section-->
                <div v-if="trek.reviews"
                    class="trek-review-clip-path theme-gradient-dark -mt-14 flex w-full items-center justify-center sm:-mt-16 px-16">
                    <div class="my-32 overflow-x-auto">
                        <div class="my-10 flex">
                            <div class="trek-min-max-w mr-8 rounded-md bg-white p-10 select-none"
                                v-for="review in trek.reviews">
                                <div class="mb-5 flex items-center gap-4">
                                    <div class="flex h-8 w-8 flex-shrink-0 overflow-hidden rounded-full">
                                        <img crossorigin="anonymous" v-if="review.user.profileImg"
                                            :src="`${appUrl}img/users/${review.user.profileImg}`">
                                        <div v-else
                                            class="text-xs theme-gradient-dark text-white justify-center items-center flex h-8 w-8 rounded-full">
                                            {{ review.user.name.charAt(0).toUpperCase() }}
                                        </div>

                                    </div>
                                    <p class="text-neutral-600 tracking-wide font-medium">{{ review.user.name }}</p>
                                </div>
                                <p class="tracking-tight">{{ review.review }}</p>

                                <!-- review stars -->
                                <div class="flex justify-center mt-5">
                                    <div class="review-ratings relative inline-flex">
                                        <div class="review-ratings-inner absolute overflow-hidden"
                                            :style="{ width: calcReviewPercentage(review.rating) + '%' }">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- book trek section-->
                <div class="sm:px-10">
                    <div class="mt-20 grid w-full grid-cols-1 sm:grid-cols-4 shadow-2xl rounded-lg py-10 px-8">
                        <div class="hidden sm:block">
                            <div class="-ml-8 flex overflow-hidden">
                                <div
                                    class="theme-gradient-dark z-30 -ml-12 flex h-32 w-32 flex-shrink-0 items-center justify-center rounded-full md:h-36 md:w-36 lg:h-40 lg:w-40">
                                    <svg class="h-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080"
                                        shape-rendering="geometricPrecision" text-rendering="geometricPrecision">
                                        <path
                                            d="M231.522468,325.896982l1223.84714,539.734702h-952.686085L231.522468,325.896982Z"
                                            fill="none" stroke="#fff" stroke-width="40"></path>
                                        <path
                                            d="M231.522468,325.896982l1223.84714,539.734702h-952.686085L231.522468,325.896982Z"
                                            transform="matrix(-1 0 0 1 1957.839264 0)" fill="none" stroke="#fff"
                                            stroke-width="40"></path>
                                        <path d="M502.683523,865.631684L982.954219,325.896982l472.201522,539.734702"
                                            fill="none" stroke="#fff" stroke-width="50"></path>
                                    </svg>
                                </div>
                                <div
                                    class="z-20 -ml-24 md:-ml-28 flex h-32 w-32 flex-shrink-0 overflow-hidden rounded-full md:h-36 md:w-36 lg:h-40 lg:w-40">
                                    <img crossorigin="anonymous" v-if="trek.images" class="h-full w-full"
                                        :src="`${appUrl}/img/treks/${trek.images[0]}`" />
                                </div>
                                <div
                                    class="z-10 -ml-24 md:-ml-28 flex h-32 w-32 flex-shrink-0 overflow-hidden rounded-full md:h-36 md:w-36 lg:h-40 lg:w-40">
                                    <img crossorigin="anonymous" v-if="trek.images" class="h-full w-full"
                                        :src="`${appUrl}/img/treks/${trek.images[1]}`" />
                                </div>
                            </div>
                        </div>
                        <div class="w-full sm:col-span-3">
                            <div class="flex flex-col items-center">
                                <p
                                    class="theme-gradient bg-clip-text text-2xl font-bold text-transparent sm:text-xl md:text-2xl lg:text-3xl">
                                    WHAT ARE YOU WAITING FOR?</p>
                                <div class="mt-4 px-4 font-medium text-neutral-600  text-sm lg:text-base">
                                    {{ trek.duration }}
                                    days. 1
                                    adventure.
                                    Infinite
                                    memories.
                                    Make it yours today!</div>

                                <div class="mt-5 md:mt-7 flex">
                                    <div class="flex sm:hidden mr-6 overflow-hidden">

                                        <div class="z-10 flex h-9 w-9 flex-shrink-0 overflow-hidden rounded-full -mr-6">
                                            <img crossorigin="anonymous" v-if="trek.images" class="h-full w-full"
                                                :src="`${appUrl}/img/treks/${trek.images[0]}`" />
                                        </div>
                                        <div class="z-20 flex h-9 w-9 flex-shrink-0 overflow-hidden rounded-full -mr-6">
                                            <img crossorigin="anonymous" v-if="trek.images" class="h-full w-full"
                                                :src="`${appUrl}/img/treks/${trek.images[1]}`" />
                                        </div>
                                        <div
                                            class="theme-gradient-dark z-30 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full">
                                            <svg class="h-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080"
                                                shape-rendering="geometricPrecision"
                                                text-rendering="geometricPrecision">
                                                <path
                                                    d="M231.522468,325.896982l1223.84714,539.734702h-952.686085L231.522468,325.896982Z"
                                                    fill="none" stroke="#fff" stroke-width="40"></path>
                                                <path
                                                    d="M231.522468,325.896982l1223.84714,539.734702h-952.686085L231.522468,325.896982Z"
                                                    transform="matrix(-1 0 0 1 1957.839264 0)" fill="none" stroke="#fff"
                                                    stroke-width="40"></path>
                                                <path
                                                    d="M502.683523,865.631684L982.954219,325.896982l472.201522,539.734702"
                                                    fill="none" stroke="#fff" stroke-width="50"></path>
                                            </svg>
                                        </div>

                                    </div>

                                    <SubmitButton title="Book Trek Now" class="p-2 px-6" @click="bookTrek"
                                        disabled="isProcessing" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    </div>
</template>

<style scoped>
.trek-name-top {
    top: calc(50% - 8em);
}
</style>

<script>
export default {
    async mounted() {
        const store = useAuthStore();
        const trekStore = useTrekStore();
        if (store.userAuthenticated)
            this.isAuthenticated = true;
        if (!trekStore.getTreks.length) {
            console.log("refresh");
            await trekStore.fetchTreks();
        }
        this.trekId = trekStore.getIdFromSlug(this.$route.params.slug)[0]._id;
        this.trek = await trekStore.fetchTrek(this.trekId);


        if (this.trek) this.docLoaded = true;

    },
    methods: {
        capsFirstChar(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        },
        // date -> Jul 2022
        getFormatedDate(date) {
            return (new Date(date)).toLocaleString("default", {
                month: "short",
                year: "numeric"
            });
        },
        calcReviewPercentage(rating) {
            const ratingMax = 5;
            const normRatingRatio = (rating / ratingMax) * 100;
            return Math.round(normRatingRatio / 10) * 10;
        },
        formatGuidesRole(role) {
            return role === "lead-guide" ? "Lead Guide" : "Guide";
        },
        splitTrekDescription(text) {
            return [text.split('.').slice(0, -3).join('.'), text.split('.').slice(-3).join('.')];
        },
        async bookTrek() {
            if (!this.isAuthenticated)
                this.$router.push({ name: "Login" });
            else {
                // const stripe = Stripe("pk_test_51MCjbASIXWc7sDe4h0TIPfM5eAI76PfFFEgPuIXBDhgBPaxNdS622el7kcUbPHBAZN3g8u1FxJdupid5zBSqOkQX00EE98UQrk");
                // this.isProcessing = true;
                // try {
                //     console.log(this.trekId);
                //     const session = await this.$axios(`bookings/checkout-session/${this.trekId}`, {
                //         headers: {
                //             "Accept": "application/json",
                //             "Content-Type": "application/json",
                //             "Cross-Origin-Resource-Policy": "cross-origin",
                //             "Access-Control-Allow-Origin": "*"
                //         }
                //     });
                //     await stripe.redirectToCheckout({
                //         sessionId: session.data.session.id
                //     });
                // }
                // catch (err) {
                //     console.log("book trek err", err);
                // }
                // finally {
                //     this.isProcessing = false;
                // }
            }
        }
    },
    created: () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    },
    data() {
        return {
            trekId: "",
            trek: {},
            isAuthenticated: false,
            isProcessing: false,
            docLoaded: false
        };
    },
    components: { SubmitButton }
}
</script>