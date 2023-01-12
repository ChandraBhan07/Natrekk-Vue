import { defineStore } from 'pinia';
export const useNotificationStore = defineStore('notification', {
    state: () => ({
        notifications: []
    }),

    // {
    // target - > if target is successfull then redirected route will show that notification 
    // target: 'Login',
    // status: success or error
    // message: 'msg'
    // }

    getters: {
        getNotifications: (state) => state.notifications
    },
    actions: {
        setNotifications(notificationObj) {
            if (Array.isArray(notificationObj)) {
                this.notifications = notificationObj;
            }
            else this.notifications.push(notificationObj);
        }
    }
});