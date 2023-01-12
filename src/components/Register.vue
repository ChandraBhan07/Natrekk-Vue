<script setup>
import LogoCenter from './LogoCenter.vue';
import InputElement from './InputElement.vue';
import SubmitButton from './SubmitButton.vue';
import Validation from '../utils/validations.js';
import { useAuthStore } from '../stores/authStore';
import { useNotificationStore } from '../stores/notificationStore';
</script>

<template>
    <!-- main content -->
    <div class="flex justify-center rounded-md bg-neutral-50 px-4">
        <div class="mt-12 mb-10 rounded-lg bg-white p-8 shadow-2xl">
            <LogoCenter />
            <p class="theme-gradient-dark mt-4 bg-clip-text text-center text-3xl font-semibold 
                tracking-tight text-transparent">
                Create Your Account</p>

            <InputElement type="text" placeholder="Your Name" class="mt-8 minw-input"
                @input="e => user.name = e.target.value" :error="errors.name" />

            <InputElement type="email" placeholder="Your Email" class="mt-4 minw-input"
                @input="e => user.email = e.target.value" :error="errors.email" />

            <InputElement type="password" placeholder="Your Password" class="mt-4 minw-input"
                @input="e => user.password = e.target.value" :error="errors.password" />

            <InputElement type="password" placeholder="Confirm Password" class="mt-4 minw-input"
                @input="e => user.passwordConfirm = e.target.value" :error="errors.passwordConfirm" />

            <RouterLink to="/login">
                <p class="theme-gradient-dark mt-4 cursor-pointer bg-clip-text text-right
                     text-transparent hover:-translate-y-0.5 active:opacity-60">
                    Login Instead ?</p>
            </RouterLink>

            <SubmitButton title="Register" class="my-5 w-full py-2" @click="userRegister" :isProcessing="isProcessing"
                :disabled="isProcessing" />
        </div>
    </div>
</template>
<script>

export default {
    data() {
        return {
            user: {
                name: '',
                email: '',
                password: '',
                passwordConfirm: ''
            },
            errors: {
                name: '',
                email: '',
                password: '',
                passwordConfirm: ''
            },
            isProcessing: false
        }
    },

    methods: {
        async userRegister() {
            const isValid = this.isValid();
            if (isValid) {
                this.isProcessing = true;
                const store = useAuthStore();
                store.register(this.user)
                    .then((result) => {
                        if (result) {
                            const notificationStore = useNotificationStore();
                            const notificationObj = {
                                target: 'Home',
                                status: 'success',
                                message: 'Welcome to Natrekk!'
                            }
                            notificationStore.setNotifications(notificationObj);
                            this.$router.push({ name: "Home" });
                        }
                    })
                    .catch(err => this.handleErrors(err.response.data.message))
            }
        },


        handleErrors(err) {
            if (typeof (err) == 'string') {
                this.errors.message = err;
            }
            else this.errors = err;
            this.isProcessing = false;
        },

        isValid() {
            let errors = (new Validation()
                .name(this.user.name, true)
                .email(this.user.email)
                .password(this.user.password, true))
                .password(this.user.passwordConfirm, false, 'passwordConfirm', 'Confirm Password')
                .matchPassword(this.user.password, this.user.passwordConfirm, 'passwordConfirm', 'Confirm Password')
                .errors;
            if (Object.keys(errors).length > 0) {
                this.errors = errors;
                return false;
            }
            return true;
        }
    },
}
</script>