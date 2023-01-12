<template>
    <div
        class="grid grid-cols-1 items-center justify-items-center gap-y-3 rounded-b-md bg-neutral-100 py-10 px-12 sm:grid-flow-col sm:justify-items-start select-none">
        <!-- logo -->
        <div class="flex items-center">
            <svg class="h-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080"
                shape-rendering="geometricPrecision" text-rendering="geometricPrecision">
                <path d="M231.522468,325.896982l1223.84714,539.734702h-952.686085L231.522468,325.896982Z" fill="none"
                    stroke="#5cd484" stroke-width="50" />
                <path d="M231.522468,325.896982l1223.84714,539.734702h-952.686085L231.522468,325.896982Z"
                    transform="matrix(-1 0 0 1 1957.839264 0)" fill="none" stroke="#5cd484" stroke-width="50" />
                <path d="M502.683523,865.631684L982.954219,325.896982l472.201522,539.734702" fill="none"
                    stroke="#5cd484" stroke-width="50" />
            </svg>
            <div class="text-3xl font-medium" style="color: #5cd484">Natrekk</div>
        </div>



        <!-- details -->
        <div class="text-md mr-2 space-y-2 text-neutral-600 sm:text-sm">
            <div class="grid grid-cols-1 justify-items-center gap-y-1 min-[560px]:grid-cols-4 sm:flex sm:space-x-4">
                <RouterLink to="/about">
                    <p class="cursor-pointer active:font-medium active:underline"
                        :class="this.$route.path == '/about' ? 'text-black font-medium underline' : ''">
                        About us
                    </p>
                </RouterLink>
                <p>Become a guide</p>
                <p>Careers</p>
                <p :class="contactBoxOpen ? 'text-black font-medium underline' : ''" class="cursor-pointer"
                    @click="contactBoxOpen = !contactBoxOpen">Contact</p>
            </div>
            <div v-if="contactBoxOpen" class="mr-1 text-sm text-neutral-800">
                <div
                    class="z-20 w-64 p-4 -mt-40 rounded-lg bg-white shadow-xl absolute mr-28 flex items-center justify-center">
                    Email : chanduparihar1729@gmail.com
                    Mobile : <br> 7665715389
                </div>
            </div>

            <div class="text-center text-sm opacity-80 sm:text-right">© Chandrabhan. All rights reserved.</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            contactBoxOpen: false
        }
    }
}
</script>