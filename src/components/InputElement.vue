<script>
export default {
    props: {
        type: {
            type: String,
            required: true
        },
        class: {
            type: String,
            required: true
        },
        placeholder: {
            type: String
        },
        value: {
            type: String
        },
        error: {
            type: String
        }
    },
    data() {
        return {
            inp: this.value ? this.value : ''
        }
    }
}
</script>

<template>
    <div>
        <input :type="type"
            class="appearance-none rounded-md border border-gray-300 py-2 px-3 text-neutral-500 placeholder-gray-400 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-400"
            :class="[this.class, error ? 'border-red-500 focus:border-red-500 ring-red-400 ring-1  focus:ring-red-400' : '']"
            :placeholder="placeholder" v-model="inp" :value="inp" @input="$emit('input', $event)" />
        <p class="text-sm text-red-500 px-1 pt-1">
            {{ error }}
        </p>

    </div>

</template>




