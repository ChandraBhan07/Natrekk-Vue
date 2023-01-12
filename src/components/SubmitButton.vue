<script>
export default {
    props: {
        title: {
            type: String,
            required: true,
            defualt: 'Submit'
        },
        class: {
            type: String
        },
        isProcessing: {
            defualt: false,
            type: Boolean
        },
        disabled: {
            default: false,
            type: Boolean
        }
    }
}
</script>

<template>
    <button
        class="theme-gradient flex items-center justify-center rounded-md text-white enabled:hover:bg-green-600 enabled:active:opacity-75 shadow-md disabled:opacity-75 disabled:cursor-default"
        :class="this.class" :disabled="disabled">
        <svg v-if="isProcessing" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
        </svg>
        {{ title }}
    </button>

</template>