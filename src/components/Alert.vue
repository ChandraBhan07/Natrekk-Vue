<script>
export default {
    props: {
        alert: {
            type: Object,
            required: true
        },
        showAlert: {
            type: Boolean,
            required: true
        }
    },

    data() {
        return {
            show: false
        }
    },

    watch: {
        showAlert(newAlert, oldAlert) {
            if (newAlert) {
                this.show = true;
                setTimeout(() => this.show = false, 3000);
            }
        }
    },
}
</script>
<template>
    <div v-if="show" class="flex justify-center z-50">
        <div :style="[{ background: alert.status == 'success' ? '#55c57a' : '#ff2400' }, { 'min-width': '28rem' }]"
            class="fixed flex h-10 items-center justify-center rounded-b-lg px-10 text-white top-0">
            {{ alert.message }}
        </div>
    </div>
</template>