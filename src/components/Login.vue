<script setup>
import LogoCenter from './LogoCenter.vue';
import InputElement from './InputElement.vue';
import SubmitButton from './SubmitButton.vue';
import Validation from '../utils/validations.js';
import Alert from './Alert.vue';
import { useAuthStore } from '../stores/authStore';
import { useNotificationStore } from '../stores/notificationStore';
</script>

<template>
    <div>
        <Alert :alert="alert" :showAlert="showAlert" />

        <div class="flex justify-center rounded-md bg-neutral-50 px-4">
            <div class="mt-12 mb-10 rounded-lg bg-white p-8 shadow-2xl">
                <LogoCenter />
                <p class="theme-gradient-dark mt-4 pb-1 bg-clip-text text-center text-3xl font-semibold 
                tracking-tight text-transparent">
                    Log Into Your Account</p>

                <div v-if="errors.message"
                    class="mt-8 flex justify-center rounded-md bg-red-200/75 border-l-4 border-red-500 p-2 text-red-500 font-medium shadow-md transition-transform delay-1000 ease-in">
                    <p class="my-1">{{ errors.message }}</p>
                </div>

                <InputElement type="email" placeholder="contact@example.com" class="mt-8 minw-input"
                    @input="(e) => user.email = e.target.value" :error="errors.email" />

                <InputElement type="password" placeholder="••••••••" class="mt-4 minw-input"
                    @input="(e) => user.password = e.target.value" :error="errors.password" />

                <p class="theme-gradient-dark mt-4 cursor-pointer bg-clip-text text-right text-transparent 
                hover:-translate-y-0.5 active:opacity-60">
                    Forgot Your Password ?</p>

                <SubmitButton title="Login" class="my-5 w-full py-2" @click="userLogin" :isProcessing="isProcessing"
                    :disabled="isProcessing" />
            </div>
        </div>
    </div>

</template>

<script>
export default {

    data() {
        return {
            user: {
                email: '',
                password: ''
            },
            errors: {
                email: '',
                password: '',
                message: ''
            },
            isProcessing: false,
            showAlert: false,
            alert: {
                status: '',
                message: ''
            }
        }
    },

    methods: {
        userLogin() {
            const isValid = this.isValid();
            if (isValid) {
                this.isProcessing = true;
                const store = useAuthStore();
                store.login(this.user)
                    .then((result) => {
                        if (result) {
                            const notificationStore = useNotificationStore();
                            const notificationObj = {
                                target: 'Home',
                                status: 'success',
                                message: 'Logged in successfully!'
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
            let errors = (new Validation().email(this.user.email).password(this.user.password)).errors;
            if (Object.keys(errors).length > 0) {
                this.errors = errors;
                return false;
            }
            return true;
        }
    },
    mounted() {
        const store = useNotificationStore();
        if (store.getNotifications.length) {
            let notificationArr = [...store.getNotifications];
            notificationArr.forEach((element, i) => {
                if (element && (element.target = "Login")) {
                    this.alert.status = element.status;
                    this.alert.message = element.message;
                    this.showAlert = true;
                    delete notificationArr[i]
                }
            });
            store.setNotifications(notificationArr);
        }
    }
}
</script>