export default class Validation {
    constructor() {
        this.errors = {}
    }

    capitalFirstChar(param) {
        return param.charAt(0).toUpperCase() + param.slice(1);
    }

    required(param, customFieldName = '') {
        this.errors[param] = `${customFieldName ? customFieldName : this.capitalFirstChar(param)} is required`;
    }

    minMaxLength(min, max, fieldName, fieldValue) {
        if (fieldValue < min) {
            this.errors[fieldName] = `${this.capitalFirstChar(fieldName)} must have atleast of ${min} characters.`;
        }
        else if (fieldValue > max) {
            this.errors[fieldName] = `${this.capitalFirstChar(fieldName)} must have maximum of ${max} characters.`;
        }

    }

    name(name, checklen = false, minlen = 5, maxlen = 50) {
        if (!name) {
            this.required('name');
        }
        else if (checklen) {
            this.minMaxLength(minlen, maxlen, 'name', name.length);
        }
        return this;
    }

    email(email) {
        if (!email) {
            this.required('email')
        } else {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!re.test(email)) {
                this.errors.email = 'Please enter valid email'
            }
        }
        return this;
    }

    password(password, checklen = false, fieldName = 'password', customFieldName = '', minlen = 6, maxlen = 16) {
        if (!password) {
            this.required(fieldName, customFieldName);
        }
        else if (checklen) {
            this.minMaxLength(minlen, maxlen, fieldName, password.length);
        }
        return this;
    }

    matchPassword(password, confirm, fieldConfirm, customFieldName = '') {
        if (confirm && password !== confirm) {
            this.errors[fieldConfirm] = `Password and ${customFieldName ? customFieldName : this.capitalFirstChar(fieldConfirm)} must match.`
        }
        return this;
    }
}