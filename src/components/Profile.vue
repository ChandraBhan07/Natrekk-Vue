<script setup>
import InputElement from './InputElement.vue';
import SubmitButton from './SubmitButton.vue';
import Validation from '../utils/validations.js';
import { useAuthStore } from './../stores/authStore';
import { useNotificationStore } from './../stores/notificationStore';
const store = useAuthStore();
const appUrl = import.meta.env.VITE_APP_URL;
</script>

<template>
    <div class="p-8 bg-neutral-50 select-none">
        <div v-if="showAlert" class="flex justify-center">
            <div :style="[{ background: alert.status == 'success' ? '#55c57a' : '#ff2400' }, { 'min-width': '28rem' }]"
                class="fixed flex h-10 items-center justify-center rounded-b-lg px-10 text-white top-0">
                {{ alert.message }}
            </div>
        </div>

        <div class="grid gap-2 p-6 sm:grid-cols-3 sm:gap-12">
            <div class="max-sm:p-4">
                <div class="text-xl font-semibold">Profile Information</div>
                <p class="sm:mt-3">Update your account's profile information and email address.</p>
            </div>

            <div class="col-span-2 rounded-lg bg-white p-6 shadow-md sm:p-8">
                <div v-if="errors.profilemsg"
                    class="mt-2 mb-6 flex justify-center rounded-md bg-red-200/75 border-l-4 border-red-500 p-2 text-red-500 font-medium shadow-md transition-transform delay-1000 ease-in">
                    <p class="my-1">{{ errors.profilemsg }}</p>
                </div>
                <div class="w-full text-neutral-600">
                    <label class="mb-2 block">Name</label>
                    <InputElement type="text" :value="curProfile.name" class="w-full"
                        @input="(e) => profile.name = e.target.value" :error="errors.name" />


                    <label class="mt-4 mb-2 block">Email</label>
                    <InputElement type="email" :value="curProfile.email" class="w-full"
                        @input="(e) => profile.email = e.target.value" :error="errors.email" />

                    <div class="mt-6">
                        <label class="mt-4 mb-2 block">Profile Picture</label>
                        <div class="flex gap-x-4">
                            <div class="h-16 w-16 border">
                                <img class="w-full h-full"
                                    :src="previewProfileImg ? previewProfileImg : (store.getUser.profileImg ? appUrl + 'img/users/' + store.getUser.profileImg : `${appUrl}/img/users/default.jpg`)"
                                    crossorigin="anonymous">
                            </div>
                            <label for="profile-pict"
                                class="theme-gradient flex h-8 w-20 cursor-pointer items-center justify-center rounded-md border text-xs text-white hover:bg-green-600 active:opacity-75">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="mr-1" viewBox="0 0 16 16">
                                    <path
                                        d="M8.5 11.5a.5.5 0 0 1-1 0V7.707L6.354 8.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 7.707V11.5z" />
                                    <path
                                        d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                                </svg>
                                Choose
                            </label>
                            <input type="file" id="profile-pict" class="hidden" accept="image/*"
                                @change="profilePicChange" />
                        </div>
                    </div>

                    <SubmitButton title="Update" class="mt-6 w-full py-2" @click="updateProfile"
                        :isProcessing="isProcessing" :disabled="trackChanges" />

                </div>
            </div>

        </div>

        <div class="grid gap-2 p-6 sm:grid-cols-3 sm:gap-12">
            <div class="max-sm:p-4">
                <div class="text-xl font-semibold">Update Password</div>
                <p class="sm:mt-3">Ensure your account is using a long, random password to stay secure.</p>
            </div>

            <div class="col-span-2 rounded-lg bg-white p-6 shadow-md sm:p-8">
                <div v-if="errors.passwordmsg"
                    class="mt-2 mb-6 flex justify-center rounded-md bg-red-200/75 border-l-4 border-red-500 p-2 text-red-500 font-medium shadow-md transition-transform delay-1000 ease-in">
                    <p class="my-1">{{ errors.passwordmsg }}</p>
                </div>

                <div class="w-full text-neutral-600">
                    <label class="mb-2 block">Current Password</label>
                    <InputElement type="password" class="w-full"
                        @input="(e) => password.passwordCurrent = e.target.value" :error="errors.passwordCurrent" />

                    <label class="mt-4 mb-2 block">New Password</label>
                    <InputElement type="password" class="w-full" @input="(e) => password.password = e.target.value"
                        :error="errors.password" />

                    <label class="mt-4 mb-2 block">Confirm Password</label>
                    <InputElement type="password" class="w-full"
                        @input="(e) => password.passwordConfirm = e.target.value" :error="errors.passwordConfirm" />

                    <SubmitButton title="Update" class="mt-6 w-full py-2" @click="updatePassword()"
                        :isProcessing="isPassProcessing" :disabled="isPassProcessing" />
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            profile: {
                name: '',
                email: '',
                profileImage: {}
            },
            curProfile: {},
            errors: {
                name: '',
                email: '',
                passwordCurrent: '',
                password: '',
                passwordConfirm: '',
                profilemsg: '',
                passwordmsg: ''
            },
            previewProfileImg: '',

            password: {
                passwordCurrent: '',
                password: '',
                passwordConfirm: ''
            },
            isProcessing: false,
            isPassProcessing: false,
            showAlert: false,
            alert: {
                status: '',
                message: ''
            }
        }
    },

    created() {
        const store = useAuthStore();
        this.curProfile = {
            name: store.getUser.name,
            email: store.getUser.email
        };
        this.profile = {
            name: store.getUser.name,
            email: store.getUser.email
        };
    },


    methods: {
        profilePicChange(event) {
            const fileObj = event.target.files[0];
            this.profile.profileImage = fileObj;

            const reader = new FileReader();
            reader.readAsDataURL(fileObj);

            reader.onload = (event) => {
                this.previewProfileImg = event.target.result;
            }
        },

        updateProfile() {
            const isValid = this.isProfileValid();
            if (isValid) {
                this.isProcessing = true;
                const store = useAuthStore();
                const form = new FormData();
                form.append('name', this.profile.name)
                form.append('email', this.profile.email)
                if (this.profile.profileImage) form.append('profileImg', this.profile.profileImage);
                store.profile(form)
                    .then((result) => {
                        if (result) {
                            this.curProfile.name = this.profile.name;
                            this.curProfile.email = this.profile.email;
                            this.handleAlert('success', 'Profile Updated Successfully!')
                            this.$router.push({ name: "Profile" });
                            this.isProcessing = false;
                            this.errors.profilemsg = false;
                        }
                    })
                    .catch(err => this.handleErrors(err.response.data.message, 'profilemsg'))

            }
        },

        updatePassword() {
            const isValid = this.isPasswordValid();
            if (isValid) {
                this.isPassProcessing = true;
                const store = useAuthStore();
                store.password(this.password)
                    .then((result) => {
                        if (result) {
                            store.logout()
                                .then(() => {
                                    const notificationStore = useNotificationStore();
                                    const notificationObj = {
                                        target: 'Login',
                                        status: 'success',
                                        message: 'Please login with your new password!'
                                    }
                                    notificationStore.setNotifications(notificationObj);
                                    this.$router.push({ name: "Login" });
                                    this.isPassProcessing = false;
                                })
                        }
                    })
                    .catch(err => this.handleErrors(err.response.data.message, 'passwordmsg'));
            }
        },

        isProfileValid() {
            let errors = (new Validation().name(this.profile.name, true).email(this.profile.email)).errors;
            if (Object.keys(errors).length > 0) {
                this.errors = errors;
                return false;
            }
            return true;
        },

        isPasswordValid() {
            let obj = this.password;
            let errors = (new Validation()
                .password(obj.passwordCurrent, false, 'passwordCurrent', 'Current Password')
                .password(obj.password, true, 'password', 'New Password')
                .password(obj.passwordConfirm, false, 'passwordConfirm', 'Confirm Password')
                .matchPassword(obj.password, obj.passwordConfirm, 'passwordConfirm', 'Confirm Password'))
                .errors;

            if (Object.keys(errors).length > 0) {
                this.errors = errors;
                return false;
            }
            return true;
        },

        handleAlert(status, message, timeout = 3000) {
            this.alert.status = status;
            this.alert.message = message;
            this.showAlert = true;
            setTimeout(() => {
                this.showAlert = false;
            }, 3000)
        },

        handleErrors(err, errormsg) {
            if (typeof (err) == 'string') {
                this.errors[errormsg] = err;
            }
            else this.errors = err;
            this.isProcessing = false;
            this.isPassProcessing = false;
        },

    },
    computed: {
        trackChanges() {
            if (this.isProcessing) return true;
            if (this.previewProfileImg) return false;

            if (this.profile.name || this.profile.email) {
                if (this.profile.name === this.curProfile.name && this.profile.email === this.curProfile.email) return true;
                else return false;
            }

            return true;
        }
    }
}
</script>