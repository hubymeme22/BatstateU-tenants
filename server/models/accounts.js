import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
    "name": {
        "firstname": {
            type: String,
            required: true,
            unique: true
        },

        "middlename": {
            type: String,
            required: true,
            unique: true
        },

        "lastname": {
            type: String,
            required: true,
            unique: true
        }
    },

    // this one can be set as sr-code
    "username": {
        type: String,
        required: true,
        unique: true
    },

    "email": {
        type: String,
        required: true,
        unique: true
    },

    "password": {
        type: String,
        required: true
    },

    "access": {
        type: String,
        required: true,
        enum: ["admin", "student"]
    }
});

const pendingSchema = new mongoose.Schema({
    "name": {
        "firstname": {
            type: String,
            required: true,
            unique: true
        },

        "middlename": {
            type: String,
            required: true,
            unique: true
        },

        "lastname": {
            type: String,
            required: true,
            unique: true
        }
    },

    "username": {
        type: String,
        required: true,
        unique: true
    },

    "email": {
        type: String,
        required: true,
        unique: true
    },

    "password": {
        type: String,
        required: true
    },
});

export const Account = mongoose.model('accounts', accountSchema);
export const Pending = mongoose.model('pending', pendingSchema);